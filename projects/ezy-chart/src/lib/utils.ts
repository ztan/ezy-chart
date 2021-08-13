import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import moment from 'moment';

/**
 * @internal
 */
export function cloneDeep(item: any) {
	if (!item) {
		return item;
	} // null, undefined values check

	const types: any[] = [Number, String, Boolean];
	let result: any;

	// normalizing primitives if someone did new String('aaa'), or new Number('444');
	types.forEach((type) => {
		if (item instanceof type) {
			result = type(item);
		}
	});

	if (typeof result === 'undefined') {
		if (Object.prototype.toString.call(item) === '[object Array]') {
			result = [];
			item.forEach((child, index, array) => {
				result[index] = cloneDeep(child);
			});
		} else if (typeof item === 'object') {
			// testing that this is DOM
			if (item.nodeType && typeof item.cloneNode === 'function') {
				result = item.cloneNode(true);
			} else if (!item.prototype) {
				// check that this is a literal
				if (item instanceof Date) {
					result = new Date(item);
				} else {
					// it is an object literal
					result = {};
					// tslint:disable-next-line: forin
					for (const i in item) {
						result[i] = cloneDeep(item[i]);
					}
				}
			} else {
				// depending what you would like here,
				// just keep the reference, or create new object
				if (false && item.constructor) {
					// would not advice to do that, reason? Read below
					result = new item.constructor();
				} else {
					result = item;
				}
			}
		} else {
			result = item;
		}
	}

	return result;
}

/**
 * @internal
 */
export function isEqual(...args: any[]): boolean {
	let i: number;
	let l: number;
	let leftChain: Array<any>;
	let rightChain: Array<any>;

	function compare2Objects(x: any, y: any) {
		let p: any;

		// remember that NaN === NaN returns false
		// and isNaN(undefined) returns true
		if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
			return true;
		}

		// Compare primitives and functions.
		// Check if both arguments link to the same object.
		// Especially useful on the step where we compare prototypes
		if (x === y) {
			return true;
		}

		// Works in case when functions are created in constructor.
		// Comparing dates is a common scenario. Another built-ins?
		// We can even handle functions passed across iframes
		if (
			(typeof x === 'function' && typeof y === 'function') ||
			(x instanceof Date && y instanceof Date) ||
			(x instanceof RegExp && y instanceof RegExp) ||
			(x instanceof String && y instanceof String) ||
			(x instanceof Number && y instanceof Number)
		) {
			return x.toString() === y.toString();
		}

		// At last checking prototypes as good as we can
		if (!(x instanceof Object && y instanceof Object)) {
			return false;
		}

		if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
			return false;
		}

		if (x.constructor !== y.constructor) {
			return false;
		}

		if (x.prototype !== y.prototype) {
			return false;
		}

		// Check for infinitive linking loops
		if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
			return false;
		}

		// Quick checking of one object being a subset of another.
		// todo: cache the structure of arguments[0] for performance
		for (p in y) {
			if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
				return false;
			} else if (typeof y[p] !== typeof x[p]) {
				return false;
			}
		}

		// tslint:disable-next-line: forin
		for (p in x) {
			if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
				return false;
			} else if (typeof y[p] !== typeof x[p]) {
				return false;
			}

			switch (typeof x[p]) {
				case 'object':
				case 'function':
					leftChain.push(x);
					rightChain.push(y);

					if (!compare2Objects(x[p], y[p])) {
						return false;
					}

					leftChain.pop();
					rightChain.pop();
					break;

				default:
					if (x[p] !== y[p]) {
						return false;
					}
					break;
			}
		}

		return true;
	}

	if (args.length < 1) {
		return true; // Die silently? Don't know how to handle such case, please help...
	}

	for (i = 1, l = args.length; i < l; i++) {
		leftChain = []; // Todo: this can be cached
		rightChain = [];

		if (!compare2Objects(arguments[0], arguments[i])) {
			return false;
		}
	}

	return true;
}

/**
 * @internal
 *
 * @param n number to format
 * @param digitsInfo digits info
 * @param lessThanHint inaccuracy indicator
 * @param formatter the formatter
 * @returns formatted string
 */
function formatNumber(
	n: number,
	digitsInfo: string,
	lessThanHint: string,
	formatter: (v: number) => string,
	isPercentPipe?: boolean,
	unroundedPercent?: number
) {
	if (lessThanHint && digitsInfo) {
		const decimalPlaces = Number(digitsInfo.match(/\.[0-9]+\-([0-9]+)/)[1]);
		const minAmountDisplay = 1 / Math.pow(10, decimalPlaces);
		if (isPercentPipe && unroundedPercent < minAmountDisplay) {
			return lessThanHint + formatter(n);
		}
		const accuracy = 1 / Math.pow(10, (isPercentPipe ? 2 : 0) + decimalPlaces);
		if (n < accuracy) {
			return lessThanHint + formatter(accuracy);
		}
	}
	return formatter(n);
}

/**
 * @internal
 */
export function formatPercentage(
	p: number,
	digitsInfo: string,
	lessThanHint?: string,
	unroundedPercent?: number
): string {
	const pipe = new PercentPipe(moment.locale());
	return formatNumber(p, digitsInfo, lessThanHint, (n) => pipe.transform(n, digitsInfo), true, unroundedPercent);
}

/**
 * @internal
 */
export function formatScale(val: any, currency: string) {
	let n = Number(val);
	if (n === 0) {
		return '0';
	}
	let base = '';
	if (n >= 1000) {
		n = n / 1000;
		base = 'K';
	}
	if (n >= 1000) {
		n = n / 1000;
		base = 'M';
	}
	return (formatMoney(n, currency, undefined) || '').replace(/\.0+?$/, '') + base;
}

/**
 * @internal
 */
export function formatMoney(val: any, currency: string, digitInfo?: string, lessThanHint?: string) {
	if (val && currency) {
		const pipe = new CurrencyPipe(moment.locale());
		return formatNumber(val, digitInfo, lessThanHint, (n) =>
			pipe.transform(n, currency, 'symbol-narrow', digitInfo)
		);
	}
}

/**
 * @internal
 */
export function formatDecimal(p: number, digitsInfo: string, lessThanHint?: string): string {
	const pipe = new DecimalPipe(moment.locale());
	return formatNumber(p, digitsInfo, lessThanHint, (n) => pipe.transform(n, digitsInfo));
}

/**
 * @internal
 */
function round(n: number, precision: number) {
	precision = precision == null ? 0 : precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292);
	if (precision) {
		// Shift with exponential notation to avoid floating-point issues.
		// See [MDN](https://mdn.io/round#Examples) for more details.
		let pair = `${n}e`.split('e');
		const value = Math.round(Number(`${pair[0]}e${+pair[1] + precision}`));

		pair = `${value}e`.split('e');
		return +`${pair[0]}e${+pair[1] - precision}`;
	}
	return Math.round(n);
}

/**
 * @internal
 * Calculate a percentage where all splits must total to 100%.
 */
export function calculatePercent(
	splitIndex: number,
	splits: number[],
	precision: number
): { rounded: number; raw: number } {
	const amount = splits[splitIndex];
	if (!amount) {
		return { raw: 0, rounded: 0 };
	}
	const totalAmount = splits.filter(Number).reduce((p, d) => p + d, 0);
	if (!totalAmount) {
		return { raw: 0, rounded: 0 };
	}
	const values = splits.map((n) => (n * 100) / totalAmount);
	const accuracy = 1 / Math.pow(10, precision);
	let largest = 0;
	let sum = 0;
	const adjusted = values.map((n, i) => {
		if (values[largest] < n) {
			largest = i;
		}
		let r = round(n, precision);
		if (n > 0 && r < accuracy) {
			r = accuracy;
			sum += n || 0;
		} else {
			sum += r || 0;
		}
		return r;
	});

	const raw = values[splitIndex];
	let rounded = adjusted[splitIndex];

	if (splitIndex === largest) {
		if (sum !== 100) {
			rounded = round(values[splitIndex] - sum + 100, precision);
		}
	}
	return { raw, rounded };
}
