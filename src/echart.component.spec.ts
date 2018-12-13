import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect, should } from 'chai';
import { ChartsModule, EChartComponent } from '../src';
import { timer } from 'rxjs';
import { Component, ViewChild } from '@angular/core';

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
	@ViewChild(EChartComponent) chartComponent: EChartComponent;
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

		should().exist(rootElem, 'root element');
		expect(rootElem.tagName).equals('DIV', 'root element');

		const canvasElem = rootElem.firstElementChild.firstElementChild as HTMLCanvasElement;

		should().exist(canvasElem, 'canvas');
		expect(canvasElem.tagName).equals('CANVAS', 'canvas');

		expect(comp['_chart'])
			.to.be.an('Object')
			.that.has.ownProperty('_dom');
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
		expect(series)
			.to.be.an('array')
			.of.length(1, '1 dataset only');
		expect(series[0].data.map(d => d.value)).to.deep.equal([0, 1, 2]);
		expect(comp['_chart']['_model'].option.xAxis[0].data).to.deep.equal(['a', 'b', 'c']);

		fixture.componentInstance.datasets = [{ data: [3, 4, 5, 6] }, { data: [0, 3, 4, 5] }];
		fixture.detectChanges();
		await changeDetectionDelay();
		await fixture.whenStable();
		expect(comp['_chart']['_model'].option.series)
			.to.be.an('array')
			.of.length(2, '2 datasets');
		expect(comp['_chart']['_model'].option.series[0].data.map(d => d.value)).to.deep.equal([3, 4, 5, 6]);
	});
});
