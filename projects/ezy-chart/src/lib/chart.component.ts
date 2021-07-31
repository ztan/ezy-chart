import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, ViewChild } from '@angular/core';
import {
	CategoryScaleOptions,
	Chart,
	ChartConfiguration,
	ChartDataset,
	ChartType,
	LayoutPosition,
	LegendOptions,
	ScatterDataPoint,
	TimeScaleOptions,
	TooltipCallbacks,
} from 'chart.js';
import moment from 'moment';
import { BaseChart, ColorsForType, ShowPercentageType } from './base.chart';
import { generateColorsByDataPoints, generateColorsBySeries } from './color.helpers';
import {
	calculatePercent,
	cloneDeep,
	formatDecimal,
	formatMoney,
	formatPercentage,
	formatScale,
	getOrDefault,
} from './utils';

/**
 * @internal
 */
const MULTI_SERIES_BY_DEFAULT = ['line', 'bar', 'horizontalBar', 'radar'];

/**
 * @internal
 */
function getTooltipLabelCallBack(
	currency: string | undefined,
	percentage: ShowPercentageType,
	digitInfo: string | undefined,
	percentDigitInfo: string | undefined,
	lessThanHint: string,
	type: 'label' | 'afterLabel' | 'both'
): TooltipCallbacks<any>['label'] | TooltipCallbacks<any>['afterLabel'] {
	return function (this, tooltipItem) {
		const labels: any[] = [];
		const label = tooltipItem.dataset?.label || tooltipItem.label;
		if (label && type === 'both') {
			labels.push(label);
		}
		if (type === 'label') {
			return label;
		}
		const dsData: (number | ScatterDataPoint)[] = tooltipItem.dataset.data;
		const point = dsData[tooltipItem.dataIndex || 0];
		const value = typeof point === 'number' ? point : Array.isArray(point) ? point[0] : point.y;

		if (percentage !== 'only') {
			if (currency) {
				labels.push(formatMoney(value, currency, digitInfo, lessThanHint));
			} else if (digitInfo && typeof value === 'number') {
				labels.push(formatDecimal(value, digitInfo, lessThanHint));
			} else {
				labels.push(tooltipItem.formattedValue || value);
			}
		}

		if (percentage) {
			const splits = (dsData as any[]).map((e) => (typeof e === 'number' ? e : (e.y as number)));
			const digitsFormat = percentDigitInfo || digitInfo || '1.0-2';
			const decimalPlaces = Number(digitsFormat.match(/\.[0-9]+\-([0-9]+)/)[1]);
			let perc = calculatePercent(tooltipItem.dataIndex, splits, decimalPlaces);
			labels.push(formatPercentage(perc.rounded / 100, digitsFormat, lessThanHint, perc.raw));
		}
		return labels.join(' : ');
	};
}

function splitWords(text: string, maxLength: number) {
	const words: string[] = [];
	let word = '';
	text.split(' ').forEach((w) => {
		word = [word, w].join(' ');
		if (word.length > maxLength) {
			words.push(word);
			word = '';
		}
	});
	if (word) {
		words.push(word);
	}
	return words;
}

/**
 * @internal
 */
export function getTooltipTitleCallBack(): TooltipCallbacks<any>['title'] {
	return function (this, tooltipItems) {
		// Pick first xLabel for now
		let title = '';
		const labels = this.dataPoints.map((dp) => dp.label);
		const labelCount = labels.length;

		if (tooltipItems.length > 0) {
			const item = tooltipItems[0];

			if (item.label) {
				title = item.label;
			} else if ((labelCount > 0 && item.dataIndex) || 0 < labelCount) {
				title = labels[item.dataIndex || 0] as string;
			}
		}

		return splitWords(title, 15);
	};
}

@Component({
	selector: 'ezy-chart',
	template: ` <div #chartContainer></div> `,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent extends BaseChart {
	@Input()
	plugins: any[];

	private _config: ChartConfiguration = {} as ChartConfiguration;
	private _prevConfig: ChartConfiguration = {} as ChartConfiguration;

	private _chart: Chart;

	@ViewChild('chartContainer', { read: ElementRef, static: true })
	private _chartContainer: ElementRef;

	private _currencyScaleFormatter = (val) => formatScale(val, this.currency);

	constructor(zone: NgZone) {
		super(zone);
	}

	protected _onDestroy() {
		if (this._chart) {
			this._chart.destroy();
		}
	}

	protected _checkUpdate(resized: boolean) {
		let dataOrParamsChanged = false;
		if (this.paramsChanged) {
			this._applyConfig();
			dataOrParamsChanged = true;
		}

		dataOrParamsChanged =
			dataOrParamsChanged || JSON.stringify(this._config.data) !== JSON.stringify(this._prevConfig.data);
		let configChanged: boolean =
			JSON.stringify(this._config.options) !== JSON.stringify(this._prevConfig.options) ||
			this._config.type !== this._prevConfig.type;

		configChanged = configChanged || this.isParamChanged('colorsFor');

		configChanged = configChanged || this.isParamChanged('colors');
		configChanged = configChanged || this.isParamChanged('percentage');
		configChanged = configChanged || this.isParamChanged('currency');
		configChanged = configChanged || this.isParamChanged('timeFormat');

		if (dataOrParamsChanged || configChanged) {
			this._refresh(configChanged);
			this._checkSize();
		} else if (resized) {
			this._checkSize();
		}
	}

	private _refresh(configChanged: boolean) {
		this._prevConfig = cloneDeep(this._config);
		this.resetParamsChangeState();

		if (configChanged || !this._chart) {
			if (this._chart) {
				this._chart.destroy();
			}
			const cfg = cloneDeep(this._prevConfig);
			this._applyColors(this.colors || [], this.colorsFor || 'auto', cfg.data?.datasets || []);
			this._createNewChart(cfg);
		} else {
			this._chart.config.data = cloneDeep(this._config.data || { datasets: [] });
			this._applyColors(this.colors || [], this.colorsFor || 'auto', this._chart.config.data.datasets || []);
			this._chart.update();
		}
	}

	private _createNewChart(cfg: ChartConfiguration) {
		this._zone.runOutsideAngular(() => {
			const container: HTMLElement = this._chartContainer.nativeElement;
			const nodes = container.getElementsByTagName('canvas');
			if (nodes.length) {
				container.removeChild(nodes.item(0));
			}
			const canvas = document.createElement('canvas');
			container.appendChild(canvas);
			cfg.plugins = this.plugins;
			Object.keys(this.plugins || []).forEach((k) => (cfg.plugins[k] = this.plugins[k]));
			this._chart = new Chart(canvas, cfg);
		});
	}

	private _checkSize() {
		if (!this._chart) {
			return;
		}
		const cfg = this._chart.config;
		const width = this._chart.chartArea.right - this._chart.chartArea.left;
		const height = this._chart.chartArea.bottom - this._chart.chartArea.top;
		const plugins = getOrDefault(cfg.options, 'plugins', {});
		const legendOpt = getOrDefault(plugins, 'legend', {});
		if ((this.legend || 'auto') === 'auto') {
			if ((width < 140 || height < 140) && legendOpt.display) {
				legendOpt.display = false;
				this._chart.update('resize');
			} else if (width > 150 && height > 150 && !legendOpt.display) {
				this._applyLegend(legendOpt);
				this._chart.update('resize');
			}
		}
	}

	private _applyLegend(legend: any) {
		const ds: ChartDataset[] = (this.datasets as any) || [];
		const multiType: boolean = MULTI_SERIES_BY_DEFAULT.indexOf(this.type || 'bar') >= 0;
		if (!ds.some((d) => (d.label ? true : false))) {
			if (multiType) {
				legend.display = false;
			}
		}
		const legendType = this.legend === false ? false : this.legend || 'auto';
		if (typeof legendType === 'string' && ['top', 'right', 'bottom', 'left'].indexOf(legendType) >= 0) {
			legend.position = legendType as LayoutPosition;
		} else if (typeof legendType === 'boolean') {
			legend.display = legendType;
		} else if (typeof legendType === 'object') {
			const l = cloneDeep(legendType) as LegendOptions;
			Object.keys(legend).forEach((k) => (legend[k] = l[k]));
		} else if (legendType === 'auto') {
			const multiPoints: boolean = ds.every((d) => (d.data || []).length > 1);
			legend.display = (multiType && ds.length > 1) || (multiPoints && !multiType);
			legend.position = multiType && this.type !== 'radar' ? 'top' : 'right';
		}
	}

	private _applyConfig() {
		const multiType: boolean = MULTI_SERIES_BY_DEFAULT.indexOf(this.type || 'bar') >= 0;

		this._config.type = (this.type || 'bar') as ChartType;
		const options = getOrDefault(this._config, 'options', {});
		const plugins = getOrDefault(options, 'plugins', {});
		const legend = getOrDefault(plugins, 'legend', {});
		const data = getOrDefault(this._config, 'data', { datasets: [] });
		const ds: ChartDataset[] = (data.datasets = cloneDeep(this.datasets || []) as any);
		if (this.type === 'horizontalBar') {
			this._config.type = 'bar';
			options.indexAxis = 'y';
		} else {
			options.indexAxis = 'x';
		}

		data.labels = cloneDeep(this.labels || []);

		options.aspectRatio = this.ratio || 2;
		this._applyLegend(legend);

		const scales = getOrDefault(options, 'scales', {});
		const isNumericScale = ds.every((d) =>
			this._isYAxisAllNumbers(Array.isArray(d.data) ? d.data : typeof d.data === 'number' ? [d.data] : [])
		);

		const tooltip = getOrDefault(plugins, 'tooltip', {});

		if (this.type === 'line' || this.type === 'bar' || this.type === 'horizontalBar') {
			const x = getOrDefault(scales, 'x', {}) as CategoryScaleOptions;
			const xTicks = getOrDefault(x, 'ticks', {} as CategoryScaleOptions['ticks']);
			const y = getOrDefault(scales, 'y', {}) as CategoryScaleOptions;
			const yTicks = getOrDefault(y, 'ticks', {} as CategoryScaleOptions['ticks']);
			const ticks = this.type === 'horizontalBar' ? xTicks : yTicks;
			if (this.currency && multiType && isNumericScale) {
				ticks.callback = this._currencyScaleFormatter;
			} else {
				delete ticks.callback;
			}

			const isTimeScale = ds.every((d) =>
				((d.data as ScatterDataPoint[]) || []).every((item) => (item.x ? moment(item.x).isValid() : false))
			);
			if (isTimeScale) {
				const timeScale = getOrDefault(scales, 'x', {}) as any;
				timeScale.type = 'time';
				const time = getOrDefault(timeScale, 'time', {} as TimeScaleOptions['time']);
				time.tooltipFormat = this.timeFormat || 'L';
			}
			tooltip.mode = 'index';
			tooltip.intersect = false;
		} else {
			tooltip.mode = 'nearest';
			tooltip.intersect = true;
			delete options.scales;
		}

		if (Object.keys(scales).length === 0) {
			delete options.scales;
		}

		const splitLabel: boolean = (this.type === 'pie' || this.type === 'doughnut') && ds.length > 1;
		const callbacks = getOrDefault(tooltip, 'callbacks', {});
		callbacks.label = getTooltipLabelCallBack(
			this.currency,
			this.percentage || false,
			this.digits,
			this.percentDigits,
			this.lessThanHint,
			splitLabel ? 'label' : 'both'
		);
		if (splitLabel) {
			callbacks.afterLabel = getTooltipLabelCallBack(
				this.currency,
				this.percentage || false,
				this.digits,
				this.percentDigits,
				this.lessThanHint,
				'afterLabel'
			);
		} else {
			callbacks.afterLabel = () => '';
		}
		callbacks.title = getTooltipTitleCallBack();

		if (this.options) {
			Object.keys(this.options).forEach((k) => {
				if (this.options[k] || this.options[k] === 0) {
					options[k] = this.options[k];
				}
			});
		}
	}

	private _isYAxisAllNumbers(data: Array<ScatterDataPoint | number | number[]>): boolean {
		return data.every((d) => !d || typeof d === 'number' || (!Array.isArray(d) && typeof d.y === 'number'));
	}

	private _applyColors(colors: string[], colorsFor: ColorsForType, datasets: ChartConfiguration['data']['datasets']) {
		if (colorsFor === 'auto') {
			if (MULTI_SERIES_BY_DEFAULT.indexOf(this.type || 'bar') >= 0) {
				colorsFor = 'series';
			} else {
				colorsFor = 'data';
			}
		}

		if (colorsFor === 'series') {
			const colorGroups = generateColorsBySeries(colors, datasets.length, this.type || 'bar');
			datasets.forEach((ds, i) => {
				Object.keys(colorGroups[i]).forEach((k) => (ds[k] = colorGroups[i][k]));
			});
		} else if (colorsFor === 'data') {
			for (const ds of datasets) {
				const colorGroup = generateColorsByDataPoints(colors, (ds.data || []).length, this.type || 'bar');
				Object.keys(colorGroup).forEach((k) => (ds[k] = colorGroup[k]));
			}
		}
	}
}
