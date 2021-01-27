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
					for (const i in item) {
						if (item[i]) {
							result[i] = cloneDeep(item[i]);
						}
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
export function isEqual(v1: any, v2: any): boolean {
	if (v1 === v2) {
		return true;
	}

	if (v1) {
		if (!v2) {
			return false;
		}

		return JSON.stringify(v1) === JSON.stringify(v2);
	} else {
		return !v2;
	}
}
