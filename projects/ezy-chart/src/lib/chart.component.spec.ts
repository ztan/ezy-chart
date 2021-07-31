import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsModule } from './charts.module';
import { ChartComponent } from './chart.component';
import { timer } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { TooltipItem, TooltipModel } from 'chart.js';

const changeDetectionDelay = () => timer(50).toPromise();

@Component({
	selector: 'ezy-test-component',
	template: `
		<div style="width:100px; height: 100px;">
			<ezy-chart
				[datasets]="[
					{ data: [132, 122, 66], label: 's1' },
					{ data: [12, 144, 33], label: 's2' }
				]"
				[labels]="['d1', 'd2', 'd3']"
			></ezy-chart>
		</div>
	`,
})
class TestSmallContainerComponent {
	@ViewChild(ChartComponent, { static: true })
	chartComponent: ChartComponent;
}

describe('ezy-chart component', () => {
	beforeEach(async (done) => {
		await TestBed.configureTestingModule({
			imports: [ChartsModule],
			declarations: [TestSmallContainerComponent],
		}).compileComponents();
		done();
	});

	it('should render a chart', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [] }];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		const element: HTMLElement = fixture.nativeElement;
		const rootElem: Element = element.firstElementChild;

		expect(rootElem).toBeTruthy();
		expect(rootElem.tagName).toEqual('DIV');

		const canvasElem = rootElem.firstElementChild as HTMLCanvasElement;

		expect(canvasElem).toBeTruthy();
		expect(canvasElem.tagName).toEqual('CANVAS');

		expect(comp['_chart']).toEqual(jasmine.objectContaining({ ctx: jasmine.any(Object) }));

		const ev = document.createEvent('Event');
		ev.initEvent('resize', true, true);
		window.dispatchEvent(ev);
		await changeDetectionDelay();
		await fixture.whenStable();

		done();
	});

	it('should apply data binding [datasets] dynamically', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [0, 1, 2] }];
		comp.labels = ['a', 'b', 'c'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].data.datasets).toEqual(jasmine.any(Array));
		expect(comp['_chart'].data.datasets.length).toEqual(1);
		expect(comp['_chart'].data.datasets[0].data).toEqual([0, 1, 2]);
		expect(comp['_chart'].data.labels).toEqual(['a', 'b', 'c']);

		fixture.componentInstance.datasets = [{ data: [3, 4, 5, 6] }, { data: [0, 3, 4, 5] }];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].data.datasets).toEqual(jasmine.any(Array));
		expect(comp['_chart'].data.datasets.length).toEqual(2);
		expect(comp['_chart'].data.datasets[0].data).toEqual([3, 4, 5, 6]);

		done();
	});

	it('should apply data binding [labels] dynamically', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [0, 1, 2] }];
		comp.labels = ['a1', 'b1', 'c1'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].data.labels).toEqual(['a1', 'b1', 'c1']);

		comp.labels = ['a3', 'b1', 'c6'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].data.labels).toEqual(['a3', 'b1', 'c6']);

		done();
	});

	it('should not recreate chart when only [datasets] and/or [labels] are changed', async (done) => {
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
		expect(oldChart).toEqual(comp['_chart']);

		done();
	});

	it('should apply data binding [type] dynamically', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		comp.datasets = [{ data: [0, 1, 2] }];
		comp.labels = ['a', 'b', 'c'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].config).toEqual(jasmine.any(Object));
		expect(comp['_chart'].config).toEqual(jasmine.objectContaining({ type: 'bar' }));
		comp.type = 'line';
		fixture.detectChanges();
		expect(comp['_chart'].config).toEqual(jasmine.objectContaining({ type: 'bar' }));
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].config).toEqual(jasmine.objectContaining({ type: 'line' }));

		for (const chartType of ['pie', 'horizontalBar', 'bar', 'line', 'doughnut']) {
			comp.type = chartType;
			fixture.detectChanges();
			await changeDetectionDelay();
			await fixture.whenStable();
			expect(comp['_chart'].config.type).toEqual(chartType);
		}

		done();
	});

	it('should apply data binding [colors] dynamically', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		comp.datasets = [{ data: [2, 5, 3] }];
		comp.labels = ['a', 'b', 'c'];
		comp.colors = ['#34f'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].data.datasets[0].backgroundColor).toEqual('rgba(51,68,255,1)');
		comp.colors = ['rgb(170,68,255)', '#cfa', '#800a01'];
		comp.type = 'pie';
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].data.datasets[0].backgroundColor).toEqual([
			'rgba(170,68,255,1)',
			'rgba(204,255,170,1)',
			'rgba(128,10,1,1)',
		]);

		done();
	});

	it('should change to timescale based on data inputs', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		comp.datasets = [
			{
				data: [
					{ y: 12, x: '2017-12-05T00:11:10.002Z' },
					{ y: 8, x: '2014-12-05T00:11:10.013Z' },
					{ y: 20, x: '2011-12-05T00:11:10.013Z' },
				],
			} as any,
		];
		comp.type = 'line';
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].config.options.scales.xAxes[0].type).toEqual('time');

		done();
	});

	it('should render y scales as monetary numbers when currency is set', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		comp.datasets = [{ data: [2000, 10000, 5000] }];
		comp.labels = ['a', 'b', 'c'];
		comp.currency = 'USD';
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].config.options.scales.yAxes[0].ticks.callback(10000, 0, [1000, 10000])).toEqual('$10K');
		expect(comp['_chart'].config.options.scales.yAxes[0].ticks.callback(0, 0, [0, 10000])).toEqual('0');
		expect(comp['_chart'].config.options.scales.yAxes[0].ticks.callback(1000000, 0, [1000000, 10000])).toEqual(
			'$1M'
		);

		done();
	});

	it('should render x scales as monetary numbers when currency is set (horizontal bar)', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		comp.datasets = [{ data: [2000, 10000, 5000] }];
		comp.labels = ['a', 'b', 'c'];
		comp.currency = 'USD';
		comp.type = 'horizontalBar';
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart'].config.options.scales.xAxes[0].ticks.callback(10000, 0, [1000, 10000])).toEqual('$10K');
		expect(comp['_chart'].config.options.scales.xAxes[0].ticks.callback(0, 0, [0, 10000])).toEqual('0');
		expect(comp['_chart'].config.options.scales.xAxes[0].ticks.callback(1000000, 0, [1000000, 10000])).toEqual(
			'$1M'
		);

		done();
	});

	it('should not change data binding inputs', async (done) => {
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
		expect(comp['_params']).toEqual({
			datasets: [{ data: [1, 2, 6, 7, 8], label: 'sample' }],
			labels: ['a', 'b', 'c', 'd', 'e'],
			colorsFor: 'series',
			type: 'line',
			currency: 'USD',
			legend: 'right',
			percentage: 'only',
			timeFormat: 'L',
			colors: ['#333'],
			ratio: 1,
		});

		done();
	});

	it('should generate a legend', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [1, 2, 6, 7, 8], label: 'sample' }];
		comp.labels = ['a', 'b', 'c', 'd', 'e'];
		comp.legend = true;

		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].config.options.plugins.legend.display).toEqual(true);

		done();
	});

	it('should not generate a legend', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [1, 2, 6, 7, 8], label: 'sample' }];
		comp.labels = ['a', 'b', 'c', 'd', 'e'];
		comp.legend = false;

		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].config.options.plugins.legend.display).toEqual(false);

		done();
	});

	it('should not render a legend when chart size is too small', async (done) => {
		const fixture: ComponentFixture<TestSmallContainerComponent> =
			TestBed.createComponent(TestSmallContainerComponent);
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		const comp = fixture.componentInstance.chartComponent;

		expect(comp['_chart'].config.options.plugins.legend.display).toEqual(false);

		done();
	});

	it('should render a legend if it is not set to auto even when chart size is too small', async (done) => {
		const fixture: ComponentFixture<TestSmallContainerComponent> =
			TestBed.createComponent(TestSmallContainerComponent);
		const comp = fixture.componentInstance.chartComponent;
		comp.legend = 'top';
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].config.options.plugins.legend.display).toEqual(true);

		done();
	});

	it('should treat options at higher priority', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [1, 2, 6, 7, 8], label: 'sample' }];
		comp.labels = ['a', 'b', 'c', 'd', 'e'];
		comp.legend = { display: true } as any;
		comp.options = { legend: { display: false }  as any };

		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].config.options.plugins.legend.display).toEqual(false);

		done();
	});

	it('should change mouse cursor when hovering on legend', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [
			{ data: [8, 7, 6, 7, 6], label: 'sample 1' },
			{ data: [1, 5, 3, 1, 3], label: 'sample 2' },
		];
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
		const rect = canvasElem.getBoundingClientRect();
		const x: number = box.left + 12 + rect.left;
		const y: number = box.top + 6 + rect.top;
		const ev = new MouseEvent('mousemove');
		ev.initMouseEvent('mousemove', true, false, window, 0, x, y, x, y, false, false, false, false, 0, canvasElem);
		canvasElem.dispatchEvent(ev);
		await changeDetectionDelay();
		expect(canvasElem.style.cursor).toEqual('pointer');

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
		expect(canvasElem.style.cursor).toEqual('default');

		done();
	});

	it('should apply specified ratio', async (done) => {
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
		expect(w1 / h1).toBeCloseTo(1, 0);

		comp.ratio = 4;

		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		const w2 = comp['_chart'].chartArea.right - comp['_chart'].chartArea.left;
		const h2 = comp['_chart'].chartArea.bottom - comp['_chart'].chartArea.top;
		expect(w2 / h2).toBeCloseTo(5, 0);

		done();
	});

	it('should deal with null values gracefully', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;
		comp.percentage = true;
		comp.currency = 'USD';
		comp.datasets = [{ data: [0, undefined, 10, 2] }];
		comp.labels = ['a', 'b', undefined, 'c'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		expect(comp['_chart'].data.datasets).toEqual(jasmine.any(Array));
		expect(comp['_chart'].data.datasets.length).toEqual(1);
		expect(comp['_chart'].data.datasets[0].data).toEqual([0, , 10, 2]);
		expect(comp['_chart'].data.labels).toEqual(['a', 'b', , 'c']);

		done();
	});

	it('should render tooltip titles', async (done) => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		const comp = fixture.componentInstance;

		const ds = [{ data: [2020.2343, 10000, 50.3235] }];
		comp.datasets = ds;
		comp.labels = ['a', 'b', 'c'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		const tooltipItem = {
			dataIndex: 1,
			datasetIndex: 0,
			label: 'TEST ----------- TEST ----------- TEST',
			formattedValue: 'TEST 2',
		} as TooltipItem<any>;
		const dataPoints: TooltipItem<any>[] = [ { dataset: {data: [2020.2343, 10000, 50.3235] }} as any];
		const title = comp['_chart'].config.options.plugins.tooltip.callbacks.title.bind({dataPoints })([tooltipItem]);
		expect(title).toEqual([' TEST -----------', ' TEST -----------', ' TEST']);

		const title1 = comp['_chart'].config.options.plugins.tooltip.callbacks.title.bind({dataPoints })([]);
		expect(title1).toEqual([' ']);

		tooltipItem.label = '';
		const title5 = comp['_chart'].config.options.plugins.tooltip.callbacks.title.bind({dataPoints})([tooltipItem]);
		expect(title5).toEqual([' bbb']);

		comp.type = 'horizontalBar';
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		const title2 = comp['_chart'].config.options.plugins.tooltip.callbacks.title.bind({dataPoints})([tooltipItem]);
		expect(title2).toEqual([' TEST 2']);

		tooltipItem.formattedValue = '';
		const title3 = comp['_chart'].config.options.plugins.tooltip.callbacks.title.bind({dataPoints})([tooltipItem]);
		expect(title3).toEqual([' ']);

		done();
	});

	it('should render tooltip labels', async (done) => {
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
			yLabel: '2000',
		};
		const label = comp['_chart'].config.options.plugins.tooltip.callbacks.label(tooltipItem, { datasets: ds });
		expect(label).toEqual('2000 : 16.74%');

		tooltipItem.datasetIndex = 1;
		tooltipItem.yLabel = '';
		const label2 = comp['_chart'].config.options.plugins.tooltip.callbacks.label(tooltipItem, { datasets: ds2 });
		expect(label2).toEqual('1 : 16.67%');

		done();
	});

	it('should render numbers with correct digit info', async (done) => {
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
			yLabel: '2000',
		};
		const label = comp['_chart'].config.options.plugins.tooltip.callbacks.label(tooltipItem, { datasets: ds });
		expect(label).toEqual('2,020.234');

		const label1 = comp['_chart'].config.options.plugins.tooltip.callbacks.label(tooltipItem, {
			datasets: [{ data: [{}, {}, {}] }],
		});
		expect(label1).toEqual('2000');

		comp.percentage = 'only';

		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		const label2 = comp['_chart'].config.options.plugins.tooltip.callbacks.label(tooltipItem, { datasets: ds });
		expect(label2).toContain('16.737%');

		const label3 = comp['_chart'].config.options.plugins.tooltip.callbacks.label(tooltipItem, {
			datasets: [{ data: [{ y: 3 }, { y: 4 }, { y: 5 }] }],
		});
		expect(label3).toContain('25.000%');

		const label4 = comp['_chart'].config.options.plugins.tooltip.callbacks.label(tooltipItem, {
			datasets: [{ data: [{}, {}, {}] }],
		});
		expect(label4).toContain('0%');

		done();
	});
});
