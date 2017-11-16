import {
	Component,
	ChangeDetectionStrategy,
	Input,
	ElementRef,
	ViewChild,
	OnDestroy,
	DoCheck,
	NgZone,
	ContentChild,
	TemplateRef,
	ViewRef,
	ViewContainerRef
} from '@angular/core';
import { generateColorsBySeries, generateColorsByDataPoints } from './color.helpers';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';
import * as Chart from 'chart.js';
import * as _ from 'lodash';
import * as moment from 'moment';

const MULTI_SERIES_BY_DEFAULT = ['line', 'bar', 'horizontalBar'];

export type ColorsForType = 'auto' | 'series' | 'data' | 'none';
export type LegendType = Chart.ChartLegendOptions | 'auto' | boolean | Chart.PositionType;
export type ShowPercentageType = boolean | 'only';

export function getTooltipLabelCallBack(
	currency?: string,
	percentage?: ShowPercentageType
): Chart.ChartTooltipCallback['label'] {
	return (tooltipItem, data) => {
		const ds = data.datasets || [];
		let label = ds.length > 1 ? ds[tooltipItem.datasetIndex || 0].label || '' : '';
		const dsData: Array<number | Chart.ChartPoint> = ds[tooltipItem.datasetIndex || 0].data || [];
		const point = dsData[tooltipItem.index || 0];
		const value = _.isNumber(point) ? point : point.y;

		if (label) {
			label += ' 	\r\n';
		}
		if (percentage !== 'only') {
			if (currency) {
				label += formatMoney(value, currency);
			} else {
				label += tooltipItem.yLabel || value;
			}
		}

		if (percentage) {
			const total = _.sumBy(dsData, d => (_.isNumber(d) ? d : (d.y as number)));
			label += ` 	\r\n${value && total ? (value * 100 / total).toFixed(2) : 0}%`;
		}
		return label;
	};
}

export function getTooltipTitleCallBack(horizontal?: boolean): Chart.ChartTooltipCallback['title'] {
	return (tooltipItems, data) => {
		// Pick first xLabel for now
		let title = '';
		const labels = data.labels || [];
		const labelCount = labels.length;

		if (tooltipItems.length > 0) {
			const item = tooltipItems[0];

			if (item.xLabel || (horizontal && item.yLabel)) {
				title = (horizontal ? item.yLabel : item.xLabel) || '';
			} else if ((labelCount > 0 && item.index) || 0 < labelCount) {
				title = labels[item.index || 0] as string;
			}
		}

		return title;
	};
}

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
	return (formatMoney(n, currency) || '').replace(/\.0+?$/, '') + base;
}

export function formatMoney(val: any, currency: string) {
	if (val && currency) {
		const pipe = new CurrencyPipe(moment.locale());
		return pipe.transform(val, currency, 'symbol-narrow');
	}
}

interface ChartParameters {
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
}

@Component({
	selector: 'ezy-chart',
	templateUrl: './chart.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnDestroy, DoCheck {
	private _config: Chart.ChartConfiguration = {};
	private _prevConfig: Chart.ChartConfiguration = {};

	private _params: ChartParameters = {};
	private _prevParams: ChartParameters = {};

	private _chart: Chart;
	private _debounceTimer: any;
	private _wndEvSubs: Subscription;
	private _resized: boolean;

	@ViewChild('chartContainer', { read: ElementRef })
	private _chartContainer: ElementRef;

	constructor(private _zone: NgZone) {
		this._wndEvSubs = fromEvent(window, 'resize')
			.pipe(debounceTime(100))
			.subscribe(() => {
				this._resized = true;
			});
	}

	@Input()
	set labels(l: string[]) {
		this._params.labels = l;
	}

	@Input()
	set type(t: string) {
		this._params.type = t;
	}

	@Input()
	set datasets(ds: Chart.ChartDataSets[]) {
		this._params.datasets = ds;
	}

	@Input()
	set colors(c: string[]) {
		this._params.colors = c;
	}

	@Input()
	set colorsFor(cf: ColorsForType) {
		this._params.colorsFor = cf;
	}

	@Input()
	set ratio(r: number) {
		this._params.ratio = r;
	}

	@Input()
	set legend(l: LegendType) {
		this._params.legend = l;
	}

	@Input()
	set currency(curr: string) {
		this._params.currency = curr;
	}

	@Input()
	set options(opt: Chart.ChartOptions) {
		this._params.options = opt;
	}

	@Input()
	set timeFormat(tf: string) {
		this._params.timeFormat = tf;
	}

	@Input()
	set percentage(p: ShowPercentageType) {
		this._params.percentage = p;
	}

	ngDoCheck(): void {
		if (this._debounceTimer) {
			clearTimeout(this._debounceTimer as any);
		}
		this._zone.runOutsideAngular(() => {
			this._debounceTimer = setTimeout(() => this._checkUpdate(), 100);
		});
	}

	ngOnDestroy(): void {
		if (this._chart) {
			this._chart.destroy();
		}
		this._wndEvSubs.unsubscribe();
	}

	private _checkUpdate() {
		let dataOrParamsChanged: boolean = false;
		if (!_.isEqual(this._params, this._prevParams) || this._resized) {
			this._applyConfig();
			dataOrParamsChanged = true;
		}

		dataOrParamsChanged = dataOrParamsChanged || !_.isEqual(this._config.data, this._prevConfig.data);
		let configChanged: boolean =
			!_.isEqual(JSON.stringify(this._config.options), JSON.stringify(this._prevConfig.options)) ||
			this._config.type !== this._prevConfig.type;

		configChanged = configChanged || this._params.colorsFor !== this._prevParams.colorsFor;

		configChanged = configChanged || !_.isEqual(this._params.colors, this._prevParams.colors);

		if (dataOrParamsChanged || configChanged || this._resized) {
			this._refresh(configChanged || this._resized);
		}
		this._resized = false;
	}

	private _refresh(configChanged: boolean) {
		this._prevConfig = _.cloneDeep(this._config);
		this._prevParams = _.cloneDeep(this._params);

		if (configChanged || !this._chart) {
			if (this._chart) {
				this._chart.destroy();
			}
			const cfg = _.cloneDeep(this._prevConfig);
			this._applyColors(this._params.colors || [], this._params.colorsFor || 'auto', (cfg.data || {}).datasets || []);
			this._createNewChart(cfg);
		} else {
			this._chart.config.data = _.cloneDeep(this._config.data || {});
			this._applyColors(
				this._params.colors || [],
				this._params.colorsFor || 'auto',
				this._chart.config.data.datasets || []
			);
			this._chart.update();
		}
	}

	private _createNewChart(cfg: Chart.ChartConfiguration, retryIfTooSmall: boolean = true) {
		this._zone.runOutsideAngular(() => {
			const container: HTMLElement = this._chartContainer.nativeElement;
			const nodes = container.getElementsByTagName('canvas');
			if (nodes.length) {
				container.removeChild(nodes.item(0));
			}
			const canvas = document.createElement('canvas');
			container.appendChild(canvas);
			this._chart = new Chart(canvas, cfg);
			const width = this._chart.chartArea.right - this._chart.chartArea.left;
			const height = this._chart.chartArea.bottom - this._chart.chartArea.top;
			if ((width < 100 || height < 100) && retryIfTooSmall) {
				this._chart.destroy();
				((cfg.options || {}).legend || {}).display = false;
				this._createNewChart(cfg, false);
			}
		});
	}

	private _applyConfig() {
		const multiType: boolean = MULTI_SERIES_BY_DEFAULT.indexOf(this._params.type || '') >= 0;

		this._config.type = this._params.type || 'bar';
		this._config.options = this._config.options || {};
		this._config.options.legend = this._config.options.legend || {};
		this._config.data = this._config.data || {};
		const ds = (this._config.data.datasets = _.cloneDeep(this._params.datasets || []));

		if (!(this._config.data.datasets || []).some(d => (d.label ? true : false))) {
			if (multiType) {
				this._config.options.legend.display = false;
			}
		}
		const labels = (this._config.data.labels = _.cloneDeep(this._params.labels || []));

		if (ds.length === 0 || (ds[0].data || []).length === 0) {
			console.warn('ezy-chart: empty datasets. ');
		} else if ((ds[0].data || []).length > labels.length) {
			console.warn('ezy-chart: wrong number of labels. ');
		}

		_.set(this._config.options || {}, 'aspectRatio', this._params.ratio || 2);

		const legend = this._params.legend || 'auto';
		if (_.isString(legend) && ['top', 'right', 'bottom', 'left'].indexOf(legend) >= 0) {
			this._config.options.legend.position = legend as Chart.PositionType;
		} else if (_.isBoolean(legend)) {
			this._config.options.legend.display = legend;
		} else if (_.isObject(legend)) {
			this._config.options.legend = _.cloneDeep(legend) as Chart.ChartLegendOptions;
		} else if (legend === 'auto') {
			const multiPoints: boolean = ds.every(d => (d.data || []).length > 1);
			const maxPoints: number = _.max(ds.map(d => (d.data || []).length)) || 0;
			this._config.options.legend.display = (multiType && ds.length > 1) || (multiPoints && !multiType);
			this._config.options.legend.position = multiType ? 'top' : 'right';
		}

		this._config.options.scales = {};
		if (this._params.currency) {
			const curr = this._params.currency;
			if (multiType) {
				const axes: Chart.CommonAxe = {
					ticks: { callback: val => formatScale(val, curr) }
				};
				if (ds.every(d => this._isYAxisAllNumbers(d.data || []))) {
					if (this._params.type !== 'horizontalBar') {
						this._config.options.scales.yAxes = [axes];
					} else {
						this._config.options.scales.xAxes = [axes];
					}
				}
			}
		}

		if (this._params.type === 'line') {
			const isTimeScale = ds.every(d =>
				((d.data as Chart.ChartPoint[]) || []).every(item => (item.x ? moment(item.x).isValid() : false))
			);
			if (isTimeScale) {
				this._config.options.scales = this._config.options.scales || {};
				const minTime = _.min(_.flatMap(ds, d => d.data as Chart.ChartPoint[]).map(p => moment(p.x))) as moment.Moment;
				ds.every(d =>
					((d.data as Chart.ChartPoint[]) || []).every(item => (item.x ? moment(item.x).isValid() : false))
				);
				this._config.options.scales.xAxes = [
					{ type: 'time', time: { tooltipFormat: this._params.timeFormat || 'L', min: minTime.format('L') } }
				];
			}
		}

		if (_.isEmpty(this._config.options.scales)) {
			this._config.options = _.pickBy(this._config.options, (val, key) => key !== 'scales');
		}

		this._config.options.tooltips = this._config.options.tooltips || {};
		this._config.options.tooltips.callbacks = this._config.options.tooltips.callbacks || {};
		this._config.options.tooltips.callbacks.label = getTooltipLabelCallBack(
			this._params.currency,
			this._params.percentage || false
		);
		this._config.options.tooltips.callbacks.title = getTooltipTitleCallBack(this._params.type === 'horizontalBar');

		if (this._params.options) {
			_.merge(this._config.options, this._params.options);
		}
	}

	private _isYAxisAllNumbers(data: Array<Chart.ChartPoint | number>): boolean {
		return data.every(d => _.isNumber(d) || _.isNumber(d.y));
	}

	private _applyColors(colors: string[], colorsFor: ColorsForType, datasets: Chart.ChartDataSets[]) {
		if (colorsFor === 'auto') {
			if (MULTI_SERIES_BY_DEFAULT.indexOf(this._params.type || '') >= 0) {
				colorsFor = 'series';
			} else {
				colorsFor = 'data';
			}
		}

		if (colorsFor === 'series') {
			const colorGroups = generateColorsBySeries(colors, datasets.length, this._params.type || 'bar');
			_.merge(datasets, colorGroups);
		} else if (colorsFor === 'data') {
			for (const ds of datasets) {
				const colorGroup = generateColorsByDataPoints(colors, (ds.data || []).length, this._params.type || 'bar');
				_.merge(ds, colorGroup);
			}
		}
	}
}
