import { ComponentFixture, TestBed } from '@angular/core/testing';
import { timer } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { EChartComponent } from './echart.component';
import { ChartsModule } from './charts.module';

const changeDetectionDelay = () => timer(200).toPromise();

@Component({
	selector: 'ezy-test-component',
	template: `
		<div style="width:100px; height: 100px;">
			<ezy-chart
				[datasets]="[{ data: [132, 122, 66], label: 's1' }, { data: [12, 144, 33], label: 's2' }]"
				[labels]="['d1', 'd2', 'd3']"
			></ezy-chart>
		</div>
	`
})
class TestSmallContainerComponent {
	@ViewChild(EChartComponent, { static: true }) chartComponent: EChartComponent;
}

describe('ezy-echart component', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ChartsModule],
			declarations: [TestSmallContainerComponent]
		});
	});

	it('should render a chart', async () => {
		const fixture: ComponentFixture<EChartComponent> = TestBed.createComponent(EChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [] }];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		const element: HTMLElement = fixture.nativeElement;
		const rootElem: Element = element.firstElementChild;

		expect(rootElem).toBeDefined();
		expect(rootElem.tagName).toEqual('DIV');

		const canvasElem = rootElem.firstElementChild.firstElementChild as HTMLCanvasElement;

		expect(canvasElem).toBeDefined();
		expect(canvasElem.tagName).toEqual('CANVAS', 'canvas');

		expect(comp['_chart']).toEqual(jasmine.objectContaining({ _dom: jasmine.any(Object) }));
	});

	it('should apply data binding [datasets] dynamically', async () => {
		const fixture: ComponentFixture<EChartComponent> = TestBed.createComponent(EChartComponent);
		const comp = fixture.componentInstance;
		comp.datasets = [{ data: [0, 1, 2] }];
		comp.labels = ['a', 'b', 'c'];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();

		const series = comp['_chart']['_model'].option.series;
		expect(series).toEqual(jasmine.any(Array));
		expect(series.length).toEqual(1);
		expect(series[0].data.map(d => d.value)).toEqual([0, 1, 2]);
		expect(comp['_chart']['_model'].option.xAxis[0].data).toEqual(['a', 'b', 'c']);

		fixture.componentInstance.datasets = [{ data: [3, 4, 5, 6] }, { data: [0, 3, 4, 5] }];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart']['_model'].option.series).toEqual(jasmine.any(Array));
		expect(comp['_chart']['_model'].option.series.length).toEqual(2);
		expect(comp['_chart']['_model'].option.series[0].data.map(d => d.value)).toEqual([3, 4, 5, 6]);
	});
});
