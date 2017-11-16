import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { ChartsModule, ChartComponent } from '../src';

describe('ezy-chart component', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ChartsModule]
		});
	});

	it('should render a chart', () => {
		const fixture: ComponentFixture<ChartComponent> = TestBed.createComponent(ChartComponent);
		fixture.detectChanges();
	});
});
