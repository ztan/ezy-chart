import { BaseChart, formatScale, formatMoney, ShowPercentageType } from './base.chart';

import * as echarts from 'echarts';
import { Component, ChangeDetectionStrategy, NgZone, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import _ = require('lodash');
import { generateColorsAsStrings } from './color.helpers';
import { DecimalPipe } from '@angular/common';
import * as moment from 'moment';

@Component({
	selector: 'ezy-echart',
	template: `<div #chartContainer></div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	styles: [
		`.ezy-echart-series-indicator {
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
		`
	]
})
export class EChartComponent extends BaseChart {
	@ViewChild('chartContainer', { read: ElementRef })
	private _chartContainer: ElementRef;

	private _chart: echarts.ECharts;
	private _echartsOptions: echarts.EChartOption = {};

	private _typeMap = {
		bar: 'bar',
		horizontalBar: 'bar',
		doughnut: 'pie',
		pie: 'pie',
		line: 'line'
	};

	constructor(zone: NgZone) {
		super(zone);
	}

	protected _checkUpdate(resized: boolean) {
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
						opt.legend = _.cloneDeep(this._echartsOptions.legend);
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
		const series: any[] = ds.map(v => ({
			name: v.name || _.isString(v.label) ? v.label : '',
			type: this._typeMap[v.type || mainType] || v.type || mainType,
			data: (v.data || ([] as any[])).map(d => this._mapDataItem(d, this.timeFormat))
		}));
		const isTime = series.some(s => s.data.some(d => d.name && moment(d.name).isValid()));
		const labels = this.labels || [];
		const timeAxis = [
			{
				type: 'time'
			}
		];
		const catAxis = [{ data: labels, type: 'category' }];
		const valAxis: any[] = [{ type: 'value' }];
		const tooltip: any = {
			axisPointer: {
				type: 'shadow'
			}
		};
		tooltip.formatter = this._formatTooltip.bind(this, this.currency, this.percentage, this.digits);
		if (this.currency) {
			valAxis[0].axisLabel = { formatter: value => formatScale(value, this.currency) };
		}
		this._echartsOptions = {
			series,
			tooltip
		};

		if (mainType === 'horizontalBar') {
			this._echartsOptions.yAxis = catAxis;
			this._echartsOptions.xAxis = valAxis;
			this._echartsOptions.tooltip['trigger'] = 'axis';
		} else if (mainType === 'line' || mainType === 'bar') {
			this._echartsOptions.xAxis = isTime ? timeAxis : catAxis;
			this._echartsOptions.yAxis = valAxis;
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

		let opt = _.cloneDeep(this._echartsOptions);
		opt = _.merge(opt, this.options);

		this._chart.setOption(opt, true);
	}

	private _mapDataItem(item: any, timeFormat: string): any {
		if (_.isNumber(item)) {
			return { value: item };
		}
		if (!item) {
			return undefined;
		}
		if (item.x && moment(item.x).isValid() && _.isNumber(item.y)) {
			const m = moment(item.x);
			return {
				name: moment(item.x).format(timeFormat || 'L'),
				value: [`${m.get('year')}-${m.get('month')}-${m.get('day')}`, item.y]
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
		series.forEach(s => {
			s.data.forEach((d, i) => (d.name = labels[i]));
			s.radius = [`${r}%`, `${r + step - 1}%`];
			r = r + step;
			s.label = {
				normal: {
					show: false,
					position: 'center'
				},
				emphasis: {
					show: makeDoughnut ? true : false,
					textShadowColor: 'grey',
					textShadowOffsetY: 1
				}
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
			series.forEach(s => {
				const colors = generateColorsAsStrings(this.colors || [], s.data.length);
				s.data.forEach((d, i) => (d.itemStyle = { color: colors[i] }));
			});
		}
	}

	private _formatTooltip(currencyCode: string, percent: ShowPercentageType, digitInfo: string, param: any) {
		const formatParam = p => {
			let l = `<div class="ezy-echart-tooltip-item"><span class="ezy-echart-series-indicator" style="background-color: ${
				p.color
			}"></span>
			 ${p.seriesName}: `;
			const percentOnly: boolean = percent === 'only' && p.percent;
			const showPercent: boolean = percent && p.percent;
			const v = _.isArray(p.data.value) ? p.data.value[1] : p.data.value;

			if (!percentOnly) {
				if (currencyCode) {
					l += formatMoney(v, currencyCode, digitInfo);
				} else {
					l += new DecimalPipe(moment.locale()).transform(v, digitInfo);
				}
			}

			if (showPercent) {
				l += `<span> ${p.percent}%</span>`;
			}
			l += '</div>';
			return l;
		};

		let str = '<div style="max-width: 35vw; white-space:normal">';
		if (_.isArray(param)) {
			str += `<strong>${param[0].name}</strong><br/>`;
			str += `${param.map(p => formatParam(p)).join('')}`;
		} else {
			str += `<strong>${param.name}</strong><br/>`;
			str += `${formatParam(param)}`;
		}
		return str + '</div>';
	}

	private _generateLegendOptions(multiSeries: boolean, pieLike: boolean): any {
		const l = this.legend || 'auto';
		if ((l === 'auto' && (multiSeries || pieLike)) || _.isString(this.legend)) {
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
		} else if (_.isObject(this.legend)) {
			return this.legend;
		}
	}
}
