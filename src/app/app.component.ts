import { Component, OnInit } from '@angular/core';
import {
	ArcElement,
	BarController,
	BarElement,
	CategoryScale,
	Chart,
	ChartDataset,
	Legend,
	LinearScale,
	LineController,
	LineElement,
	PieController,
	PointElement,
	PolarAreaController,
	RadarController,
	RadialLinearScale,
	ScatterDataPoint,
	TimeScale,
	Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';
import moment from 'moment';

Chart.register(
	BarController,
	CategoryScale,
	LinearScale,
	BarElement,
	PieController,
	ArcElement,
	LineController,
	LineElement,
	PointElement,
	TimeScale,
	RadarController,
	RadialLinearScale,
	PolarAreaController,
	Tooltip,
	Legend
);

@Component({
	selector: 'ezy-chart-app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	datasets: ChartDataset[] = [{ data: [3020.5, 129.32, 311.6, 1665.5, 202, 305.3], label: 'series 1' }];
	labels: string[] = ['sample 1', 'sample 2', 'sample 3', 'sample 4', 'sample 5', 'sample 6'];
	type = 'bar';
	colorsFor = 'auto';
	timeScale = false;
	currencyMode = false;
	showPercentage: string | boolean = false;
	engine = 'chartjs';

	ngOnInit(): void {
		const dataStr = sessionStorage.getItem('ezy-chart-app-data');
		if (dataStr) {
			try {
				const data = JSON.parse(dataStr);
				Object.keys(data).forEach((k) => (this[k] = data[k] || this[k]));
			} catch (_) {}
		}
	}

	saveToSession() {
		const data: any = {};
		Object.keys(this)
			.filter((k) => !k.startsWith('_'))
			.forEach((k) => (data[k] = this[k]));
		sessionStorage.setItem('ezy-chart-app-data', JSON.stringify(data));
	}

	addData() {
		this.labels.push(`sample ${this.labels.length + 1}`);
		this.datasets.forEach((ds) => {
			const data = (ds.data as number[]) || [];
			data.push(this._getRandomDataItem(data.length) as number);
		});
		this.saveToSession();
	}

	addSeries() {
		if (this.datasets.length) {
			const data = new Array((this.datasets[0].data || []).length);
			for (let i = 0; i < data.length; i++) {
				data[i] = this._getRandomDataItem(i);
			}

			const ds: ChartDataset = { data, label: `series ${this.datasets.length + 1}` };
			if (this.type === 'line' && this.engine === 'chartjs') {
				this._configLineSpecificProperties(ds);
			}
			this.datasets.push(ds);
		}
		this.saveToSession();
	}

	removeData() {
		if (this.labels.length > 1) {
			this.labels.pop();
			this.datasets
				.map((ds) => ds.data as number[])
				.filter((d) => d.length > 1)
				.forEach((d) => d.pop());
		}
		this.saveToSession();
	}

	removeSeries() {
		if (this.datasets.length > 1) {
			this.datasets.pop();
		}
		this.saveToSession();
	}

	chartTypeChanged() {
		this.colorsFor = 'auto';
		this.timeScale = false;
		this.scaleChanged();
		if (this.type === 'line' && this.engine === 'chartjs') {
			this.datasets.forEach((ds) => this._configLineSpecificProperties(ds));
		} else {
			this.datasets = this.datasets.map((ds) => ({ data: ds.data, label: ds.label }));
		}
		this.saveToSession();
	}

	scaleChanged() {
		let dataPoints = 0;
		this.datasets.forEach((ds) => {
			const data = (ds.data as Array<number | ScatterDataPoint>) || [];
			dataPoints = Math.max(dataPoints, data.length);
			data.forEach((d, i) => {
				if (typeof d === 'number' && this.timeScale) {
					data[i] = { y: d, x: moment().add(-i, 'year') as any };
				} else if (!this.timeScale && typeof d !== 'number') {
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
		this.saveToSession();
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

	private _configLineSpecificProperties(ds: ChartDataset) {}

	private _getRandomDataItem(dsIndex: number): number | ScatterDataPoint {
		const n = Number((Math.random() * 9000).toFixed(2));

		if (this.timeScale) {
			return { y: n, x: moment().add(-dsIndex, 'year') as any };
		} else {
			return n;
		}
	}
}
