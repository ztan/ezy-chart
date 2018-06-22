import { Component } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
	selector: 'ezy-demo-app',
	templateUrl: './demo.component.html'
})
export class DemoComponent {
	datasets: Chart.ChartDataSets[] = [{ data: [12, 19, 3, 5, 2, 3], label: 'series 1' }];
	labels: string[] = ['sample 1', 'sample 2', 'sample 3', 'sample 4', 'sample 5', 'sample 6'];
	type: string = 'bar';
	colorsFor: string = 'auto';
	timeScale: boolean = false;
	currencyMode: boolean = false;
	showPercentage: string | boolean = false;
	engine: string = 'chartjs';

	addData() {
		this.labels.push(`sample ${this.labels.length + 1}`);
		this.datasets.forEach(ds => {
			const data = (ds.data as number[]) || [];
			data.push(this._getRandomDataItem(data.length) as number);
		});
	}

	addSeries() {
		if (this.datasets.length) {
			const data = new Array((this.datasets[0].data || []).length);
			for (let i = 0; i < data.length; i++) {
				data[i] = this._getRandomDataItem(i);
			}

			const ds: Chart.ChartDataSets = { data, label: `series ${this.datasets.length + 1}` };
			if (this.type === 'line' && this.engine === 'chartjs') {
				this._configLineSpecificProperties(ds);
			}
			this.datasets.push(ds);
		}
	}

	removeData() {
		if (this.labels.length > 1) {
			this.labels.pop();
			this.datasets
				.map(ds => ds.data as number[])
				.filter(d => d.length > 1)
				.forEach(d => d.pop());
		}
	}

	removeSeries() {
		if (this.datasets.length > 1) {
			this.datasets.pop();
		}
	}

	chartTypeChanged() {
		this.colorsFor = 'auto';
		this.timeScale = false;
		this.scaleChanged();
		if (this.type === 'line' && this.engine === 'chartjs') {
			this.datasets.forEach(ds => this._configLineSpecificProperties(ds));
		} else {
			this.datasets = this.datasets.map(ds => _.pick(ds, 'data', 'label'));
		}
	}

	scaleChanged() {
		let dataPoints: number = 0;
		this.datasets.forEach(ds => {
			const data = (ds.data as Array<number | Chart.ChartPoint>) || [];
			dataPoints = Math.max(dataPoints, data.length);
			data.forEach((d, i) => {
				if (_.isNumber(d) && this.timeScale) {
					data[i] = { y: d, x: moment().add(-i, 'year') as any };
				} else if (!this.timeScale && !_.isNumber(d)) {
					data[i] = d.y as number;
				}
			});
		});
		this.labels = [];

		if (!this.timeScale) {
			for (let i = 0; i < dataPoints; i++) {
				this.labels.push(`sample ${this.labels.length + 1}`);
			}
		}
	}

	get sampleTemplate(): string {
		const chartTag: string = this.engine === 'chartjs' ? 'ezy-chart' : 'ezy-echart';
		let templ = `<${chartTag} type="${this.type}" [datasets]="datasets"`;
		if (this.labels && this.labels.length) {
			templ += ' [labels]="labels"';
		}
		if (this.colorsFor !== 'auto') {
			templ += ` colorsFor="${this.colorsFor}"`;
		}
		if (this.currencyMode) {
			templ += ' currency="USD"';
		}
		if (this.showPercentage === 'only') {
			templ += ' percentage="only"';
		} else if (this.showPercentage) {
			templ += ' [percentage]="true"';
		}
		templ += `></${chartTag}>`;
		return templ;
	}

	private _configLineSpecificProperties(ds: Chart.ChartDataSets) {
		ds.fill = false;
		ds.pointRadius = 8;
		ds.pointHoverRadius = 10;
		ds.lineTension = 0.1;
	}

	private _getRandomDataItem(dsIndex: number): number | Chart.ChartPoint {
		const n = Number((Math.random() * 20).toFixed(1));

		if (this.timeScale) {
			return { y: n, x: moment().add(-dsIndex, 'year') as any };
		} else {
			return n;
		}
	}
}
