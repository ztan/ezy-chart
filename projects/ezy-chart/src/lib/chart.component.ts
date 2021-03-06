import { Component, ChangeDetectionStrategy, Input, ElementRef, ViewChild, NgZone } from '@angular/core';
import { generateColorsBySeries, generateColorsByDataPoints } from './color.helpers';
import { calculatePercent, cloneDeep, formatDecimal, formatMoney, formatPercentage, formatScale } from './utils';
import moment from 'moment';
import { BaseChart, ShowPercentageType, ColorsForType } from './base.chart';

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
): Chart.ChartTooltipCallback['label'] | Chart.ChartTooltipCallback['afterLabel'] {
	return (tooltipItem, data) => {
		const labels: any[] = [];
		const ds = data.datasets as Chart.ChartDataSets[];
		const label = ds.length > 1 ? ds[tooltipItem.datasetIndex || 0].label || '' : '';
		if (label && type === 'both') {
			labels.push(label);
		}
		if (type === 'label') {
			return label;
		}
		const dsData: (number | number[])[] | Chart.ChartPoint[] = ds[tooltipItem.datasetIndex || 0].data || [];
		const point = dsData[tooltipItem.index || 0];
		const value = typeof point === 'number' ? point : Array.isArray(point) ? point[0] : point.y;

		if (percentage !== 'only') {
			if (currency) {
				labels.push(formatMoney(value, currency, digitInfo, lessThanHint));
			} else if (digitInfo && typeof value === 'number') {
				labels.push(formatDecimal(value, digitInfo, lessThanHint));
			} else {
				labels.push(tooltipItem.yLabel || value);
			}
		}

		if (percentage) {
			const splits = (dsData as any[]).map((e) => (typeof e === 'number' ? e : (e.y as number)));
			const digitsFormat = percentDigitInfo || digitInfo || '1.0-2';
			const decimalPlaces = Number(digitsFormat.match(/\.[0-9]+\-([0-9]+)/)[1]);
			let perc = calculatePercent(tooltipItem.index, splits, decimalPlaces);
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
export function getTooltipTitleCallBack(horizontal?: boolean): Chart.ChartTooltipCallback['title'] {
	return (tooltipItems, data) => {
		// Pick first xLabel for now
		let title = '';
		const labels = data.labels || [];
		const labelCount = labels.length;

		if (tooltipItems.length > 0) {
			const item = tooltipItems[0];

			if (item.xLabel || (horizontal && item.yLabel)) {
				title = ((horizontal ? item.yLabel : item.xLabel) as string) || '';
			} else if ((labelCount > 0 && item.index) || 0 < labelCount) {
				title = labels[item.index || 0] as string;
			}
		}

		return splitWords(title, 15);
	};
}

declare const Chart: any;
if (typeof Chart !== 'undefined') {
	Chart.pluginService.register({
		afterEvent: (chartInstance: Chart, chartEvent: MouseEvent) => {
			const legend = (chartInstance as any).legend;
			const canvas = chartInstance.canvas;
			const x = chartEvent.x;
			const y = chartEvent.y;
			let cursorStyle = 'default';
			if (x <= legend.right && x >= legend.left && y <= legend.bottom && y >= legend.top) {
				for (const box of legend.legendHitBoxes) {
					if (x <= box.left + box.width && x >= box.left && y <= box.top + box.height && y >= box.top) {
						cursorStyle = 'pointer';
						break;
					}
				}
			}
			if (canvas) {
				canvas.style.cursor = cursorStyle;
			}
		},
	});
}

@Component({
	selector: 'ezy-chart',
	template: ` <div #chartContainer></div> `,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent extends BaseChart {
	@Input()
	plugins: any[];

	private _config: Chart.ChartConfiguration = {};
	private _prevConfig: Chart.ChartConfiguration = {};

	private _chart: Chart;

	@ViewChild('chartContainer', { read: ElementRef, static: true })
	private _chartContainer: ElementRef;

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
			this._applyColors(this.colors || [], this.colorsFor || 'auto', (cfg.data || {}).datasets || []);
			this._createNewChart(cfg);
		} else {
			this._chart.config.data = cloneDeep(this._config.data || {});
			this._applyColors(this.colors || [], this.colorsFor || 'auto', this._chart.config.data.datasets || []);
			this._chart.update();
		}
	}

	private _createNewChart(cfg: Chart.ChartConfiguration) {
		this._zone.runOutsideAngular(() => {
			const container: HTMLElement = this._chartContainer.nativeElement;
			const nodes = container.getElementsByTagName('canvas');
			if (nodes.length) {
				container.removeChild(nodes.item(0));
			}
			const canvas = document.createElement('canvas');
			container.appendChild(canvas);
			(cfg as any).plugins = this.plugins;
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
		const legendOpt = (cfg.options || {}).legend || {};
		if ((this.legend || 'auto') === 'auto') {
			if ((width < 140 || height < 140) && legendOpt.display) {
				this._chart.destroy();
				legendOpt.display = false;
				this._createNewChart(cfg);
			} else if (
				width > 150 &&
				height > 150 &&
				!legendOpt.display &&
				this._config.options.legend &&
				this._config.options.legend.display
			) {
				this._refresh(true);
			}
		}
	}

	private _applyConfig() {
		const multiType: boolean = MULTI_SERIES_BY_DEFAULT.indexOf(this.type || 'bar') >= 0;

		this._config.type = this.type || 'bar';
		this._config.options = this._config.options || {};
		this._config.options.legend = this._config.options.legend || {};
		this._config.data = this._config.data || {};
		const ds: Chart.ChartDataSets[] = (this._config.data.datasets = cloneDeep(this.datasets || []));

		if (!ds.some((d) => (d.label ? true : false))) {
			if (multiType) {
				this._config.options.legend.display = false;
			}
		}
		const labels = (this._config.data.labels = cloneDeep(this.labels || []));

		((this._config.options || {}) as any).aspectRatio = this.ratio || 2;

		const legend = this.legend === false ? false : this.legend || 'auto';
		if (typeof legend === 'string' && ['top', 'right', 'bottom', 'left'].indexOf(legend) >= 0) {
			this._config.options.legend.position = legend as Chart.PositionType;
		} else if (typeof legend === 'boolean') {
			this._config.options.legend.display = legend;
		} else if (typeof legend === 'object') {
			this._config.options.legend = cloneDeep(legend) as Chart.ChartLegendOptions;
		} else if (legend === 'auto') {
			const multiPoints: boolean = ds.every((d) => (d.data || []).length > 1);
			this._config.options.legend.display = (multiType && ds.length > 1) || (multiPoints && !multiType);
			this._config.options.legend.position = multiType && this.type !== 'radar' ? 'top' : 'right';
		}

		this._config.options.scales = {};
		if (this.currency) {
			const curr = this.currency;
			if (multiType) {
				const axes: Chart.CommonAxe = {
					ticks: { callback: (val) => formatScale(val, curr) },
				};
				if (
					ds.every((d) =>
						this._isYAxisAllNumbers(
							Array.isArray(d.data) ? d.data : typeof d.data === 'number' ? [d.data] : []
						)
					)
				) {
					if (this.type !== 'horizontalBar') {
						this._config.options.scales.yAxes = [axes];
					} else {
						this._config.options.scales.xAxes = [axes];
					}
				}
			}
		}

		let timeScaleConfigured = false;

		this._config.options.tooltips = this._config.options.tooltips || {};

		if (this.type === 'line') {
			const isTimeScale = ds.every((d) =>
				((d.data as Chart.ChartPoint[]) || []).every((item) => (item.x ? moment(item.x).isValid() : false))
			);
			if (isTimeScale) {
				this._config.options.scales = this._config.options.scales || {};
				let minTime: moment.Moment;
				ds.reduce((p, c) => [...p, ...(c.data as Chart.ChartPoint[])], [])
					.map((p) => moment(p.x))
					.forEach((m) => {
						if (!minTime || minTime.isAfter(m)) {
							minTime = m;
						}
					});
				ds.every((d) =>
					((d.data as Chart.ChartPoint[]) || []).every((item) => (item.x ? moment(item.x).isValid() : false))
				);
				this._config.options.scales.xAxes = [
					{
						type: 'time',
						time: {
							tooltipFormat: this.timeFormat || 'L',
							min: minTime ? minTime.toISOString() : undefined,
						},
					},
				];
				timeScaleConfigured = true;
			}
			this._config.options.tooltips.mode = 'index';
			this._config.options.tooltips.intersect = false;
		} else {
			this._config.options.tooltips.mode = 'nearest';
			this._config.options.tooltips.intersect = true;
		}

		if (ds.length === 0 || (ds[0].data || []).length === 0) {
		} else if ((ds[0].data || []).length > labels.length && !timeScaleConfigured) {
			console.warn('ezy-chart: wrong number of labels. ');
		}

		if (!this._config.options.scales || Object.keys(this._config.options.scales).length === 0) {
			const opt: any = {};
			Object.keys(this._config.options || {})
				.filter((k) => k !== 'scales')
				.forEach((k) => (opt[k] = this._config.options[k]));
			this._config.options = opt;
		}

		const splitLabel: boolean = (this.type === 'pie' || this.type === 'doughnut') && ds.length > 1;
		this._config.options.tooltips.callbacks = this._config.options.tooltips.callbacks || {};
		this._config.options.tooltips.callbacks.label = getTooltipLabelCallBack(
			this.currency,
			this.percentage || false,
			this.digits,
			this.percentDigits,
			this.lessThanHint,
			splitLabel ? 'label' : 'both'
		);
		if (splitLabel) {
			this._config.options.tooltips.callbacks.afterLabel = getTooltipLabelCallBack(
				this.currency,
				this.percentage || false,
				this.digits,
				this.percentDigits,
				this.lessThanHint,
				'afterLabel'
			);
		} else {
			this._config.options.tooltips.callbacks.afterLabel = () => '';
		}
		this._config.options.tooltips.callbacks.title = getTooltipTitleCallBack(this.type === 'horizontalBar');

		if (this.options) {
			Object.keys(this.options).forEach((k) => {
				if (this.options[k] || this.options[k] === 0) {
					this._config.options[k] = this.options[k];
				}
			});
		}
	}

	private _isYAxisAllNumbers(data: Array<Chart.ChartPoint | number | number[]>): boolean {
		return data.every((d) => !d || typeof d === 'number' || (!Array.isArray(d) && typeof d.y === 'number'));
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
