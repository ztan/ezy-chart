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
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Chart } from 'chart.js';
import * as _ from 'lodash';
import * as moment from 'moment';
import { BaseChart, ShowPercentageType, ColorsForType } from './base.chart';

/**
 * @internal
 */
const MULTI_SERIES_BY_DEFAULT = ['line', 'bar', 'horizontalBar'];

/**
 * @internal
 */
export function getTooltipLabelCallBack(
	currency?: string,
	percentage?: ShowPercentageType,
	digitInfo?: string
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
				label += formatMoney(value, currency, digitInfo);
			} else if (digitInfo && _.isNumber(value)) {
				label += new DecimalPipe(moment.locale()).transform(value, digitInfo);
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

/**
 * @internal
 */
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

@Component({
	selector: 'ezy-chart',
	template: `<div #chartContainer></div>`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent extends BaseChart implements OnDestroy, DoCheck {
	private _config: Chart.ChartConfiguration = {};
	private _prevConfig: Chart.ChartConfiguration = {};

	private _chart: Chart;
	private _debounceTimer: any;
	private _wndEvSubs: Subscription;
	private _resized: boolean;

	@ViewChild('chartContainer', { read: ElementRef })
	private _chartContainer: ElementRef;

	constructor(private _zone: NgZone) {
		super();
		this._wndEvSubs = fromEvent(window, 'resize').subscribe(() => {
			this._resized = true;
		});
	}

	ngDoCheck(): void {
		if (this._debounceTimer) {
			clearTimeout(this._debounceTimer as any);
		}
		this._zone.runOutsideAngular(() => {
			this._debounceTimer = setTimeout(() => this._checkUpdate(), 50);
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
		if (this.paramsChanged || this._resized) {
			this._applyConfig();
			dataOrParamsChanged = true;
		}

		dataOrParamsChanged = dataOrParamsChanged || !_.isEqual(this._config.data, this._prevConfig.data);
		let configChanged: boolean =
			!_.isEqual(JSON.stringify(this._config.options), JSON.stringify(this._prevConfig.options)) ||
			this._config.type !== this._prevConfig.type;

		configChanged = configChanged || this.isParamChanged('colorsFor');

		configChanged = configChanged || this.isParamChanged('colors');
		configChanged = configChanged || this.isParamChanged('percentage');
		configChanged = configChanged || this.isParamChanged('currency');
		configChanged = configChanged || this.isParamChanged('timeFormat');

		if (dataOrParamsChanged || configChanged || this._resized) {
			this._refresh(configChanged || (this._resized && (this.legend || 'auto') === 'auto'));
		}
		this._resized = false;
	}

	private _refresh(configChanged: boolean) {
		this._prevConfig = _.cloneDeep(this._config);
		this.resetParamsChangeState();

		if (configChanged || !this._chart) {
			if (this._chart) {
				this._chart.destroy();
			}
			const cfg = _.cloneDeep(this._prevConfig);
			this._applyColors(this.colors || [], this.colorsFor || 'auto', (cfg.data || {}).datasets || []);
			this._createNewChart(cfg);
		} else {
			this._chart.config.data = _.cloneDeep(this._config.data || {});
			this._applyColors(this.colors || [], this.colorsFor || 'auto', this._chart.config.data.datasets || []);
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
			if ((width < 120 || height < 120) && retryIfTooSmall) {
				this._chart.destroy();
				((cfg.options || {}).legend || {}).display = false;
				this._createNewChart(cfg, false);
			}
		});
	}

	private _applyConfig() {
		const multiType: boolean = MULTI_SERIES_BY_DEFAULT.indexOf(this.type || 'bar') >= 0;

		this._config.type = this.type || 'bar';
		this._config.options = this._config.options || {};
		this._config.options.legend = this._config.options.legend || {};
		this._config.data = this._config.data || {};
		const ds = (this._config.data.datasets = _.cloneDeep(this.datasets || []));

		if (!(this._config.data.datasets || []).some(d => (d.label ? true : false))) {
			if (multiType) {
				this._config.options.legend.display = false;
			}
		}
		const labels = (this._config.data.labels = _.cloneDeep(this.labels || []));

		_.set(this._config.options || {}, 'aspectRatio', this.ratio || 2);

		const legend = this.legend || 'auto';
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
		if (this.currency) {
			const curr = this.currency;
			if (multiType) {
				const axes: Chart.CommonAxe = {
					ticks: { callback: val => formatScale(val, curr) }
				};
				if (ds.every(d => this._isYAxisAllNumbers(d.data || []))) {
					if (this.type !== 'horizontalBar') {
						this._config.options.scales.yAxes = [axes];
					} else {
						this._config.options.scales.xAxes = [axes];
					}
				}
			}
		}

		let timeScaleConfigured: boolean = false;

		if (this.type === 'line') {
			const isTimeScale = ds.every(d =>
				((d.data as Chart.ChartPoint[]) || []).every(item => (item.x ? moment(item.x).isValid() : false))
			);
			if (isTimeScale) {
				this._config.options.scales = this._config.options.scales || {};
				const minTime = _.min(_.flatMap(ds, d => d.data as Chart.ChartPoint[]).map(p => moment(p.x)));
				ds.every(d =>
					((d.data as Chart.ChartPoint[]) || []).every(item => (item.x ? moment(item.x).isValid() : false))
				);
				this._config.options.scales.xAxes = [
					{
						type: 'time',
						time: {
							tooltipFormat: this.timeFormat || 'L',
							min: minTime ? minTime.toISOString() : undefined
						}
					}
				];
				timeScaleConfigured = true;
			}
		}

		if (ds.length === 0 || (ds[0].data || []).length === 0) {
			console.warn('ezy-chart: empty datasets. ');
		} else if ((ds[0].data || []).length > labels.length && !timeScaleConfigured) {
			console.warn('ezy-chart: wrong number of labels. ');
		}

		if (_.isEmpty(this._config.options.scales)) {
			this._config.options = _.pickBy(this._config.options, (val, key) => key !== 'scales');
		}

		this._config.options.tooltips = this._config.options.tooltips || {};
		this._config.options.tooltips.callbacks = this._config.options.tooltips.callbacks || {};
		this._config.options.tooltips.callbacks.label = getTooltipLabelCallBack(
			this.currency,
			this.percentage || false,
			this.digits
		);
		this._config.options.tooltips.callbacks.title = getTooltipTitleCallBack(this.type === 'horizontalBar');

		if (this.options) {
			_.merge(this._config.options, this.options);
		}
	}

	private _isYAxisAllNumbers(data: Array<Chart.ChartPoint | number>): boolean {
		return data.every(d => !d || _.isNumber(d) || _.isNumber(d.y));
	}

	private _applyColors(colors: string[], colorsFor: ColorsForType, datasets: Chart.ChartDataSets[]) {
		if (colorsFor === 'auto') {
			if (MULTI_SERIES_BY_DEFAULT.indexOf(this.type || 'bar') >= 0) {
				colorsFor = 'series';
			} else {
				colorsFor = 'data';
			}
		}

		if (colorsFor === 'series') {
			const colorGroups = generateColorsBySeries(colors, datasets.length, this.type || 'bar');
			_.merge(datasets, colorGroups);
		} else if (colorsFor === 'data') {
			for (const ds of datasets) {
				const colorGroup = generateColorsByDataPoints(colors, (ds.data || []).length, this.type || 'bar');
				_.merge(ds, colorGroup);
			}
		}
	}
}
