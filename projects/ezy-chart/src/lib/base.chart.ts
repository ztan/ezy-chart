import { Input, NgZone, OnDestroy, DoCheck, Directive } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import * as moment from 'moment';
import { cloneDeep, isEqual } from './utils';

export type ColorsForType = 'auto' | 'series' | 'data' | 'none';

export type LegendType = Chart.ChartLegendOptions | 'auto' | boolean | Chart.PositionType;

export type ShowPercentageType = boolean | 'only';

/**
 * @internal
 */
export interface ChartParameters {
	type?: string;
	labels?: string[];
	datasets?: Chart.ChartDataSets[];
	colors?: string[];
	colorsFor?: ColorsForType;
	ratio?: number;
	legend?: LegendType;
	options?: Chart.ChartOptions;
	currency?: string;
	timeFormat?: string;
	percentage?: ShowPercentageType;
	digits?: string;
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
export function formatMoney(val: any, currency: string, digitInfo?: string) {
	if (val && currency) {
		const pipe = new CurrencyPipe(moment.locale());
		return pipe.transform(val, currency, 'symbol-narrow', digitInfo);
	}
}

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class BaseChart implements OnDestroy, DoCheck {
	private _params: ChartParameters = {};
	private _prevParams: ChartParameters = {};

	private _debounceTimer: any;
	private _wndEvSubs: Subscription;
	private _resized: boolean;

	/**
	 * An array of strings, corresponding to Chart.ChartConfiguration.data.labels
	 * @property
	 */
	@Input()
	set labels(l: string[] | undefined) {
		this._params.labels = l;
	}

	get labels(): string[] | undefined {
		return this._params.labels;
	}

	/**
	 * The chart type, corresponding to Chart.ChartConfiguration.type
	 * @default 'bar'
	 * @property
	 */
	@Input()
	set type(t: string | undefined) {
		this._params.type = t;
	}

	get type(): string | undefined {
		return this._params.type;
	}

	/**
	 * An array of Chart.ChartDataSets, corresponding to Chart.ChartConfiguration.data.datasets
	 * @property
	 */
	@Input()
	set datasets(ds: Chart.ChartDataSets[] | any) {
		this._params.datasets = ds;
	}

	get datasets(): Chart.ChartDataSets[] | any {
		return this._params.datasets;
	}

	/**
	 * An array of strings in hex, rgb, or rgba format, to define the base colors of datasets, or the data points of each dataset. If this
	 * property is absent, or the colors defined are less than the number of datasets (or the data points of each dataset), the missing
	 * colors will be assigned from the default palette
	 * @property
	 */
	@Input()
	set colors(c: string[] | undefined) {
		this._params.colors = c;
	}

	get colors(): string[] | undefined {
		return this._params.colors;
	}

	/**
	 * Specify what the colors (either defined or generated) are for.
	 *  * 'series' - each color corresponds to a dataset
	 *  * 'data' - each color corresponds to a data point of each dataset
	 *  * 'auto' - use 'series' for chart types 'bar', 'horizontalBar' and 'line'; and use 'data' for other chart types
	 *  * 'none' - turn off the color generator. Use this value if colors are specified via #options
	 * @default 'auto'
	 * @property
	 */
	@Input()
	set colorsFor(cf: ColorsForType | undefined) {
		this._params.colorsFor = cf;
	}

	get colorsFor(): ColorsForType | undefined {
		return this._params.colorsFor;
	}

	/**
	 * The aspect ratio of the chart
	 * @default 2
	 * @property
	 */
	@Input()
	set ratio(r: number | undefined) {
		this._params.ratio = r;
	}

	get ratio(): number | undefined {
		return this._params.ratio;
	}

	/**
	 * Specifiy how to display the legend
	 *  * if the value is a boolean, it corresponds to Chart.ChartConfiguration.options.legend.display
	 *  * if the value is 'auto', the legend will be arranged automatically. For example, the legend will be hidden if the chart area is
	 *    too small
	 *  * if the value is of type Chart.ChartLegendOptions, it corresponds to Chart.ChartConfiguration.options.legend.position
	 *  * if the value is of type Chart.ChartLegendOptions, it corresponds to Chart.ChartConfiguration.options.legend
	 * @default 'auto'
	 * @property
	 */
	@Input()
	set legend(l: LegendType | undefined) {
		this._params.legend = l;
	}

	get legend(): LegendType | undefined {
		return this._params.legend;
	}

	/**
	 * An ISO 4217 currency code. If specified, it will be used to format the scales of the main axis, as well as the values in the tooltips.
	 * @property
	 */
	@Input()
	set currency(curr: string | undefined) {
		this._params.currency = curr;
	}

	get currency(): string | undefined {
		return this._params.currency;
	}

	/**
	 * The digit info of the output template, used to format numbers in scales. Please refer to https://angular.io/api/common/DecimalPipe
	 * for its usage.
	 * @property
	 */
	@Input()
	set digits(d: string | undefined) {
		this._params.digits = d;
	}

	get digits(): string | undefined {
		return this._params.digits;
	}

	/**
	 * Corresponds to Chart.ChartConfiguration.options. This overrides any other settings.
	 * @property
	 */
	@Input()
	set options(opt: Chart.ChartOptions | undefined) {
		this._params.options = opt;
	}

	get options(): Chart.ChartOptions | undefined {
		return this._params.options;
	}

	/**
	 * A moment.js format string. When specified, the X axis will be configured with time scales, and this value will be used to format the
	 * tooltips.
	 * @property
	 */
	@Input()
	set timeFormat(tf: string | undefined) {
		this._params.timeFormat = tf;
	}

	get timeFormat(): string | undefined {
		return this._params.timeFormat;
	}

	/**
	 * Specify whether to show the overall percentage values in the popover tooltips.
	 * @property
	 */
	@Input()
	set percentage(p: ShowPercentageType | undefined) {
		this._params.percentage = p;
	}

	get percentage(): ShowPercentageType | undefined {
		return this._params.percentage;
	}

	get paramsChanged(): boolean {
		return !isEqual(this._params, this._prevParams);
	}

	isParamChanged(property: keyof ChartParameters) {
		return !isEqual(this._params[property], this._prevParams[property]);
	}

	resetParamsChangeState() {
		this._prevParams = cloneDeep(this._params);
	}

	constructor(protected _zone: NgZone) {
		this._wndEvSubs = fromEvent(window, 'resize').subscribe(() => {
			this._resized = true;
			this._doCheck(500);
		});
	}

	ngDoCheck(): void {
		if (!this._resized) {
			this._doCheck(50);
		}
	}

	ngOnDestroy(): void {
		this._wndEvSubs.unsubscribe();
		this._onDestroy();
	}

	protected abstract _checkUpdate(resized: boolean);
	protected abstract _onDestroy();

	private _doCheck(deferred: number): void {
		if (this._debounceTimer) {
			clearTimeout(this._debounceTimer as any);
			this._debounceTimer = null;
		}
		this._zone.runOutsideAngular(() => {
			this._debounceTimer = setTimeout(() => {
				this._checkUpdate(this._resized);
				this._resized = false;
			}, deferred);
		});
	}
}
