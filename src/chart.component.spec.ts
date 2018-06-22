import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect, should } from 'chai';
import { ChartsModule, ChartComponent } from '../src';
import { timer } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { CHART_DEFAULT_COLORS } from './charts.module';

const changeDetectionDelay = () => timer(50).toPromise();

@Component({
	selector: 'ezy-test-component',
	template: `
		<div style="width:100px; height: 100px;">
			<ezy-chart [datasets]="[{data: [132, 122, 66], label: 's1'}, {data: [12, 144, 33], label: 's2'}]" [labels]="['d1', 'd2', 'd3']"></ezy-chart>
		</div>`
})
class TestSmallContainerComponent {
	@ViewChild(ChartComponent) chartComponent: ChartComponent;
}

describe('ezy-chart component', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ChartsModule],
			declarations: [TestSmallContainerComponent]
		});
	});

	it('should render a chart', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [] }];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		const element: HTMLElement = fixture.nativeElement;
		const rootElem: Element = element.firstElementChild;

		should().exist(rootElem, 'root element');
		expect(rootElem.tagName).equals('DIV', 'root element');

		const canvasElem = rootElem.firstElementChild as HTMLCanvasElement;

		should().exist(canvasElem, 'canvas');
		expect(canvasElem.tagName).equals('CANVAS', 'canvas');

		expect(comp['_chart'])
			.to.be.an('Object')
			.that.has.ownProperty('ctx');

		const ev = document.createEvent('Event');
		ev.initEvent('resize', true, true);
		window.dispatchEvent(ev);
		await changeDetectionDelay();
		await fixture.whenStable();
	});

	it('should apply data binding [datasets] dynamically', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [0, 1, 2] }];
		comp.labels = ['a', 'b', 'c'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].data.datasets)
			.to.be.an('array')
			.of.length(1, '1 dataset only');
		expect(comp['_chart'].data.datasets[0].data).to.deep.equal([0, 1, 2]);
		expect(comp['_chart'].data.labels).to.deep.equal(['a', 'b', 'c']);

		fixture.componentInstance.datasets = [{ data: [3, 4, 5, 6] }, { data: [0, 3, 4, 5] }];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].data.datasets)
			.to.be.an('array')
			.of.length(2, '2 datasets');
		expect(comp['_chart'].data.datasets[0].data).to.deep.equal([3, 4, 5, 6]);
	});

	it('should apply data binding [labels] dynamically', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [0, 1, 2] }];
		comp.labels = ['a1', 'b1', 'c1'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].data.labels).to.deep.equal(['a1', 'b1', 'c1']);

		comp.labels = ['a3', 'b1', 'c6'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].data.labels).to.deep.equal(['a3', 'b1', 'c6']);
	});

	it('should not recreate chart when only [datasets] and/or [labels] are changed', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [0, 1, 2] }];
		comp.labels = ['a1', 'b1', 'c1'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		const oldChart = comp['_chart'];

		comp.labels = ['a3', 'b1', 'c6'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(oldChart).to.equal(comp['_chart']);
	});

	it('should apply data binding [type] dynamically', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		comp.datasets = [{ data: [0, 1, 2] }];
		comp.labels = ['a', 'b', 'c'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].config)
			.to.be.an('Object')
			.that.has.property('type', 'bar', 'a bar chart');
		comp.type = 'line';
		fixture.detectChanges();
		expect(comp['_chart'].config).to.have.property(
			'type',
			'bar',
			'still a bar chart because of change detection delay'
		);
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].config.type).equals('line', 'changed to line chart');

		for (const chartType of ['pie', 'horizontalBar', 'bar', 'line', 'doughnut']) {
			comp.type = chartType;
			fixture.detectChanges();
			await changeDetectionDelay();
			await fixture.whenStable();
			expect(comp['_chart'].config.type).equals(chartType, `change to ${chartType} chart`);
		}
	});

	it('should apply data binding [colors] dynamically', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		comp.datasets = [{ data: [2, 5, 3] }];
		comp.labels = ['a', 'b', 'c'];
		comp.colors = ['#34f'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].data.datasets[0].backgroundColor).to.equal('rgba(51,68,255,0.6)');
		comp.colors = ['rgb(170,68,255)', '#cfa', '#800a01'];
		comp.type = 'pie';
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].data.datasets[0].backgroundColor).to.deep.equal([
			'rgba(170,68,255,0.6)',
			'rgba(204,255,170,0.6)',
			'rgba(128,10,1,0.6)'
		]);
	});

	it('should change to timescale based on data inputs', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		comp.datasets = [
			{
				data: [
					{ y: 12, x: '2017-12-05T00:11:10.002Z' },
					{ y: 8, x: '2014-12-05T00:11:10.013Z' },
					{ y: 20, x: '2011-12-05T00:11:10.013Z' }
				]
			}
		];
		comp.type = 'line';
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].config.options.scales.xAxes[0].type).equals('time');
	});

	it('should render y scales as monetary numbers when currency is set', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		comp.datasets = [{ data: [2000, 10000, 5000] }];
		comp.labels = ['a', 'b', 'c'];
		comp.currency = 'USD';
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].config.options.scales.yAxes[0].ticks.callback(10000, 0, [1000, 10000])).equals('$10K');
		expect(comp['_chart'].config.options.scales.yAxes[0].ticks.callback(0, 0, [0, 10000])).equals('0');
		expect(comp['_chart'].config.options.scales.yAxes[0].ticks.callback(1000000, 0, [1000000, 10000])).equals(
			'$1M'
		);
	});

	it('should render x scales as monetary numbers when currency is set (horizontal bar)', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		comp.datasets = [{ data: [2000, 10000, 5000] }];
		comp.labels = ['a', 'b', 'c'];
		comp.currency = 'USD';
		comp.type = 'horizontalBar';
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].config.options.scales.xAxes[0].ticks.callback(10000, 0, [1000, 10000])).equals('$10K');
		expect(comp['_chart'].config.options.scales.xAxes[0].ticks.callback(0, 0, [0, 10000])).equals('0');
		expect(comp['_chart'].config.options.scales.xAxes[0].ticks.callback(1000000, 0, [1000000, 10000])).equals(
			'$1M'
		);
	});

	it('should not change data binding inputs', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [1, 2, 6, 7, 8], label: 'sample' }];
		comp.labels = ['a', 'b', 'c', 'd', 'e'];
		comp.colorsFor = 'series';
		comp.type = 'line';
		comp.currency = 'USD';
		comp.legend = 'right';
		comp.percentage = 'only';
		comp.timeFormat = 'L';
		comp.colors = ['#333'];
		comp.ratio = 1;
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_params']).deep.equals({
			datasets: [{ data: [1, 2, 6, 7, 8], label: 'sample' }],
			labels: ['a', 'b', 'c', 'd', 'e'],
			colorsFor: 'series',
			type: 'line',
			currency: 'USD',
			legend: 'right',
			percentage: 'only',
			timeFormat: 'L',
			colors: ['#333'],
			ratio: 1
		});
	});

	it('should generate a legend', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [1, 2, 6, 7, 8], label: 'sample' }];
		comp.labels = ['a', 'b', 'c', 'd', 'e'];
		comp.legend = true;

		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].config.options.legend.display).equals(true);
	});

	it('should not generate a legend', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [1, 2, 6, 7, 8], label: 'sample' }];
		comp.labels = ['a', 'b', 'c', 'd', 'e'];
		comp.legend = false;

		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].config.options.legend.display).equals(false);
	});

	it('should not render a legend when chart size is too small', async () => {
		const fixture: ComponentFixture<TestSmallContainerComponent> = TestBed.createComponent(
			TestSmallContainerComponent
		);
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		const comp = fixture.componentInstance.chartComponent;

		expect(comp['_chart'].config.options.legend.display).equals(false);
	});

	it("should render a legend if it is not set to 'auto' even when chart size is too small", async () => {
		const fixture: ComponentFixture<TestSmallContainerComponent> = TestBed.createComponent(
			TestSmallContainerComponent
		);
		const comp = fixture.componentInstance.chartComponent;
		comp.legend = 'top';
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].config.options.legend.display).equals(true);
	});

	it("should treat 'options' at higher priority", async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [1, 2, 6, 7, 8], label: 'sample' }];
		comp.labels = ['a', 'b', 'c', 'd', 'e'];
		comp.legend = { display: true };
		comp.options = { legend: { display: false } };

		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].config.options.legend.display).equals(false);
	});

	it('should change mouse cursor when hovering on legend', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [8, 7, 6, 7, 6], label: 'sample 1' }, { data: [1, 5, 3, 1, 3], label: 'sample 2' }];
		comp.labels = ['a', 'b', 'c', 'd', 'e'];
		comp.legend = true;
		comp.percentage = true;
		comp.currency = 'USD';

		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		const element: HTMLElement = fixture.nativeElement;
		const rootElem: Element = element.firstElementChild;
		const canvasElem = rootElem.firstElementChild as HTMLCanvasElement;

		await changeDetectionDelay();
		const box = comp['_chart']['legend'].legendHitBoxes[0];
		const x: number = box.left + 12;
		const y: number = box.top + 12;
		const ev = new MouseEvent('mousemove');
		ev.initMouseEvent('mousemove', true, false, window, 0, x, y, x, y, false, false, false, false, 0, canvasElem);
		canvasElem.dispatchEvent(ev);
		await changeDetectionDelay();
		expect(canvasElem.style.cursor).equals('pointer');

		const ev1 = new MouseEvent('mousemove');
		ev1.initMouseEvent(
			'mousemove',
			true,
			false,
			window,
			0,
			55,
			252,
			55,
			252,
			false,
			false,
			false,
			false,
			0,
			canvasElem
		);
		canvasElem.dispatchEvent(ev1);
		expect(canvasElem.style.cursor).equals('default');
	});

	it('should apply specified ratio', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [1, 2, 6, 7, 8], label: 'sample' }];
		comp.labels = ['a', 'b', 'c', 'd', 'e'];
		comp.ratio = 1;

		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		const w1 = comp['_chart'].chartArea.right - comp['_chart'].chartArea.left;
		const h1 = comp['_chart'].chartArea.bottom - comp['_chart'].chartArea.top;
		expect(w1 / h1).closeTo(1, 0.3);

		comp.ratio = 4;

		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		const w2 = comp['_chart'].chartArea.right - comp['_chart'].chartArea.left;
		const h2 = comp['_chart'].chartArea.bottom - comp['_chart'].chartArea.top;
		expect(w2 / h2).closeTo(4, 1);
	});

	it('should deal with null values gracefully', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.percentage = true;
		comp.currency = 'USD';
		comp.datasets = [{ data: [0, undefined, 10, 2] }];
		comp.labels = ['a', 'b', undefined, 'c'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].data.datasets)
			.to.be.an('array')
			.of.length(1, '1 dataset only');
		expect(comp['_chart'].data.datasets[0].data).to.deep.equal([0, , 10, 2]);
		expect(comp['_chart'].data.labels).to.deep.equal(['a', 'b', , 'c']);
	});

	it('should render tooltip titles', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		const ds = [{ data: [2020.2343, 10000, 50.3235] }];
		comp.datasets = ds;
		comp.labels = ['a', 'b', 'c'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		const tooltipItem: Chart.ChartTooltipItem = {
			index: 1,
			datasetIndex: 0,
			xLabel: 'TEST ----------- TEST ----------- TEST',
			yLabel: 'TEST 2'
		};
		const title = comp['_chart'].config.options.tooltips.callbacks.title([tooltipItem], { datasets: ds });
		expect(title).to.deep.equal([' TEST -----------', ' TEST -----------', ' TEST']);

		const title1 = comp['_chart'].config.options.tooltips.callbacks.title([], { datasets: ds });
		expect(title1).to.deep.equal([' ']);

		tooltipItem.xLabel = '';
		const title5 = comp['_chart'].config.options.tooltips.callbacks.title([tooltipItem], {
			datasets: ds,
			labels: ['aaa', 'bbb', 'ccc']
		});
		expect(title5).to.deep.equal([' bbb']);

		comp.type = 'horizontalBar';
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		const title2 = comp['_chart'].config.options.tooltips.callbacks.title([tooltipItem], { datasets: ds });
		expect(title2).to.deep.equal([' TEST 2']);

		tooltipItem.yLabel = '';
		const title3 = comp['_chart'].config.options.tooltips.callbacks.title([tooltipItem], { datasets: ds });
		expect(title3).to.deep.equal([' ']);
	});

	it('should render tooltip labels', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		const ds = [{ data: [2020.2343, 10000, 50.3235] }];
		const ds2 = [{ data: [3, 2, 1] }, { data: [1, 2, 3] }];
		comp.datasets = ds;
		comp.labels = ['a', 'b', 'c'];
		comp.percentage = true;
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		const tooltipItem: Chart.ChartTooltipItem = {
			index: 0,
			datasetIndex: 0,
			xLabel: 'a',
			yLabel: '2000'
		};
		const label = comp['_chart'].config.options.tooltips.callbacks.label(tooltipItem, { datasets: ds });
		expect(label).to.deep.equal(['2000', '16.74%']);

		tooltipItem.datasetIndex = 1;
		tooltipItem.yLabel = '';
		const label2 = comp['_chart'].config.options.tooltips.callbacks.label(tooltipItem, { datasets: ds2 });
		expect(label2).to.deep.equal([1, '16.67%']);
	});

	it('should render numbers with correct digit info', async () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		const ds = [{ data: [2020.2343, 10000, 50.3235] }];
		comp.datasets = ds;
		comp.labels = ['a', 'b', 'c'];
		comp.digits = '0.3-3';
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		const tooltipItem: Chart.ChartTooltipItem = {
			index: 0,
			datasetIndex: 0,
			xLabel: 'a',
			yLabel: '2000'
		};
		const label = comp['_chart'].config.options.tooltips.callbacks.label(tooltipItem, { datasets: ds });
		expect(label).to.deep.equal(['2,020.234']);

		const label1 = comp['_chart'].config.options.tooltips.callbacks.label(tooltipItem, {
			datasets: [{ data: [{}, {}, {}] }]
		});
		expect(label1).to.deep.equal(['2000']);

		comp.percentage = 'only';

		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		const label2 = comp['_chart'].config.options.tooltips.callbacks.label(tooltipItem, { datasets: ds });
		expect(label2).to.contains('16.74%');

		const label3 = comp['_chart'].config.options.tooltips.callbacks.label(tooltipItem, {
			datasets: [{ data: [{ y: 3 }, { y: 4 }, { y: 5 }] }]
		});
		expect(label3).to.contains('25.00%');

		const label4 = comp['_chart'].config.options.tooltips.callbacks.label(tooltipItem, {
			datasets: [{ data: [{}, {}, {}] }]
		});
		expect(label4).to.contains('0%');
	});
});
