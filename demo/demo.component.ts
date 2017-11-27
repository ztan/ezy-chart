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

			this.datasets.push({ data, label: `series ${this.datasets.length + 1}` });
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

	private _getRandomDataItem(dsIndex: number): number | Chart.ChartPoint {
		const n = Number((Math.random() * 20).toFixed(1));

		if (this.timeScale) {
			return { y: n, x: moment().add(-dsIndex, 'year') as any };
		} else {
			return n;
		}
	}
}
