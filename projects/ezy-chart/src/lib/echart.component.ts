import { BaseChart, formatScale, formatMoney, ShowPercentageType } from './base.chart';

import { Component, ChangeDetectionStrategy, NgZone, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { generateColorsAsStrings } from './color.helpers';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { cloneDeep } from './utils';
import moment from 'moment';

@Component({
	selector: 'ezy-echart',
	template: ` <div #chartContainer></div> `,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	styles: [
		`
			.ezy-echart-series-indicator {
				display: inline-block;
				border-radius: 10px;
				border-width: 1px;
				border-style: solid;
				border-color: white;
				width: 10px;
				height: 10px;
			}
			.ezy-echart-tooltip-item {
				text-indent: -13px;
				padding-left: 13px;
			}
		`,
	],
})
export class EChartComponent extends BaseChart {
	@ViewChild('chartContainer', { read: ElementRef, static: true })
	private _chartContainer: ElementRef;

	private _chart: echarts.ECharts;
	private _echartsOptions: echarts.EChartOption = {};

	private _typeMap = {
		bar: 'bar',
		horizontalBar: 'bar',
		doughnut: 'pie',
		pie: 'pie',
		line: 'line',
	};

	constructor(zone: NgZone) {
		super(zone);
	}

	protected async _checkUpdate(resized: boolean) {
		if (this._chartContainer && !this._chart) {
			this._createChart();
		} else if (resized && !this.paramsChanged) {
			this._recalculateSize();
		}

		if (this.paramsChanged) {
			this._applyOptions();
			this.resetParamsChangeState();
			this._recalculateSize();
		}
	}

	protected _onDestroy() {
		if (this._chart && !this._chart.isDisposed()) {
			this._chart.dispose();
		}
	}

	private _recalculateSize() {
		if (this._chartContainer) {
			const div: HTMLDivElement = this._chartContainer.nativeElement;
			const height = Math.max(div.clientWidth / (this.ratio || 2), 240);
			div.style.height = `${height}px`;
			if (this._chart) {
				this._chart.resize();
				if (this._echartsOptions.legend) {
					const opt: any = this._chart.getOption();
					if (div.clientWidth <= 240 || div.clientHeight <= 240) {
						opt.legend = undefined;
					} else {
						opt.legend = cloneDeep(this._echartsOptions.legend);
					}
					this._chart.setOption(opt, true);
				}
			}
		}
	}

	private _createChart() {
		this._chart = echarts.init(this._chartContainer.nativeElement);
	}

	private _applyOptions() {
		const ds = this.datasets || [];
		this._echartsOptions = {};
		const mainType = this.type || 'bar';
		const series: any[] = ds.map((v) => ({
			name: v.name || typeof v.label === 'string' ? v.label : '',
			type: this._typeMap[v.type || mainType] || v.type || mainType,
			data: (v.data || ([] as any[])).map((d) => this._mapDataItem(d, this.timeFormat)),
		}));
		const isTime = series.some((s) => s.data.some((d) => d.name && moment(d.name).isValid()));
		const labels = this.labels || [];
		const timeAxis = [
			{
				type: 'time',
			},
		];
		const catAxis: Array<echarts.EChartOption.XAxis | echarts.EChartOption.YAxis> = [
			{ data: labels, type: 'category' },
		];
		const valAxis: Array<echarts.EChartOption.XAxis | echarts.EChartOption.YAxis> = [{ type: 'value' }];
		const tooltip: any = {
			axisPointer: {
				type: 'shadow',
			},
		};
		tooltip.formatter = this._formatTooltip.bind(
			this,
			this.currency,
			this.percentage,
			this.digits,
			this.percentDigits
		);
		if (this.currency) {
			valAxis[0].axisLabel = { formatter: (value) => formatScale(value, this.currency) };
		}
		this._echartsOptions = {
			series,
			tooltip,
		};

		if (mainType === 'horizontalBar') {
			this._echartsOptions.yAxis = catAxis as echarts.EChartOption.YAxis[];
			this._echartsOptions.xAxis = valAxis as echarts.EChartOption.XAxis[];
			this._echartsOptions.tooltip['trigger'] = 'axis';
		} else if (mainType === 'line' || mainType === 'bar') {
			this._echartsOptions.xAxis = (isTime ? timeAxis : catAxis) as echarts.EChartOption.XAxis[];
			this._echartsOptions.yAxis = valAxis as echarts.EChartOption.YAxis[];
			this._echartsOptions.tooltip['trigger'] = 'axis';
		} else if (this._typeMap[mainType] === 'pie') {
			this._definePieShape(series, labels, mainType === 'doughnut');
		}

		if (this.legend !== false) {
			this._echartsOptions.legend = this._generateLegendOptions(
				series.length > 1,
				this._typeMap[mainType] === 'pie'
			);
		}

		this._defineColors(series, this._typeMap[mainType] === 'pie');

		const opt = cloneDeep(this._echartsOptions || {});
		Object.keys(this.options || {}).forEach((k) => {
			if (this.options[k] || this.options[k] === 0) {
				opt[k] = this.options[k];
			}
		});

		this._chart.setOption(opt, true);
	}

	private _mapDataItem(item: any, timeFormat: string): any {
		if (typeof item === 'number') {
			return { value: item };
		}
		if (!item) {
			return undefined;
		}
		if (item.x && moment(item.x).isValid() && typeof item.y === 'number') {
			const m = moment(item.x);
			return {
				name: moment(item.x).format(timeFormat || 'L'),
				value: [`${m.get('year')}-${m.get('month')}-${m.get('day')}`, item.y],
			};
		}
		return item;
	}

	private _definePieShape(series: any[], labels: string[], makeDoughnut: boolean) {
		let r = 0;
		let step = 80;
		if (makeDoughnut) {
			r = 40;
		}
		step = (80 - r) / series.length;
		series.forEach((s) => {
			s.data.forEach((d, i) => (d.name = labels[i]));
			s.radius = [`${r}%`, `${r + step - 1}%`];
			r = r + step;
			s.label = {
				normal: {
					show: false,
					position: 'center',
				},
				emphasis: {
					show: makeDoughnut ? true : false,
					textShadowColor: 'grey',
					textShadowOffsetY: 1,
				},
			};
			s['avoidLabelOverlap'] = false;
		});
	}

	private _defineColors(series: any[], pieLike: boolean) {
		let cf = this.colorsFor || 'auto';
		if (cf === 'auto') {
			if (pieLike) {
				cf = 'data';
			} else {
				cf = 'series';
			}
		}
		if (cf === 'series') {
			const colors = generateColorsAsStrings(this.colors || [], series.length);
			series.forEach((s, i) => (s['color'] = colors[i]));
		} else if (cf === 'data') {
			series.forEach((s) => {
				const colors = generateColorsAsStrings(this.colors || [], s.data.length);
				s.data.forEach((d, i) => (d.itemStyle = { color: colors[i] }));
			});
		}
	}

	private _formatTooltip(
		currencyCode: string,
		percent: ShowPercentageType,
		digitInfo: string,
		percentDigitInfo: string,
		param: any
	) {
		const formatParam = (p) => {
			let l = `<div class="ezy-echart-tooltip-item"><span class="ezy-echart-series-indicator" style="background-color: ${p.color}"></span>
			 ${p.seriesName}: `;
			const percentOnly: boolean = percent === 'only' && p.percent;
			const showPercent: boolean = percent && p.percent;
			const v = Array.isArray(p.data.value) ? p.data.value[1] : p.data.value;

			if (!percentOnly) {
				if (currencyCode) {
					l += formatMoney(v, currencyCode, digitInfo);
				} else {
					l += new DecimalPipe(moment.locale()).transform(v, digitInfo);
				}
			}

			if (showPercent) {
				l += `<span> ${new PercentPipe(moment.locale()).transform(
					p.percent / 100,
					percentDigitInfo || digitInfo || '1.0-2'
				)}%</span>`;
			}
			l += '</div>';
			return l;
		};

		let str = '<div style="max-width: 35vw; white-space:normal">';
		if (Array.isArray(param)) {
			str += `<strong>${param[0].name}</strong><br/>`;
			str += `${param.map((p) => formatParam(p)).join('')}`;
		} else {
			str += `<strong>${param.name}</strong><br/>`;
			str += `${formatParam(param)}`;
		}
		return str + '</div>';
	}

	private _generateLegendOptions(multiSeries: boolean, pieLike: boolean): any {
		const l = this.legend || 'auto';
		if ((l === 'auto' && (multiSeries || pieLike)) || typeof this.legend === 'string') {
			const legend: any = {};
			if (l === 'auto' && pieLike) {
				legend.x = 'left';
			}
			if (['left', 'right', 'top', 'bottom'].indexOf(l as string) >= 0) {
				legend.x = l;
			}
			if (legend.x === 'left' || legend.x === 'right') {
				legend.orient = 'vertical';
			}
			return legend;
		} else if (typeof this.legend === 'object') {
			return this.legend;
		}
	}
}
