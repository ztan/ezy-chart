import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional } from '@angular/core';
import { CHART_DEFAULT_COLORS, replaceDefaultColors } from 'ezy-chart';
import { EChartComponent } from './echart.component';

@NgModule({
	declarations: [EChartComponent],
	imports: [CommonModule],
	exports: [EChartComponent],
})
export class EChartsModule {
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

export { EChartComponent };
