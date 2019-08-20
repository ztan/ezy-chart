import { NgModule, InjectionToken, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { replaceDefaultColors } from './color.helpers';
import { EChartComponent } from './echart.component';

export const CHART_DEFAULT_COLORS: InjectionToken<number[][]> = new InjectionToken<number[][]>(
	'ezy-chart-default-colours'
);

@NgModule({
	declarations: [ChartComponent, EChartComponent],
	imports: [CommonModule],
	exports: [ChartComponent, EChartComponent]
})
export class ChartsModule {
	constructor(
		@Optional()
		@Inject(CHART_DEFAULT_COLORS)
		defaultColors: number[][]
	) {
		if (defaultColors) {
			replaceDefaultColors(defaultColors);
		}
	}
}

export { ChartComponent, EChartComponent };
