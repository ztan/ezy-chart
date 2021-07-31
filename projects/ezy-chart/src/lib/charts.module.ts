import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional } from '@angular/core';
import { CHART_DEFAULT_COLORS } from './base.chart';
import { ChartComponent } from './chart.component';
import { replaceDefaultColors } from './color.helpers';

@NgModule({
	declarations: [ChartComponent],
	imports: [CommonModule],
	exports: [ChartComponent],
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

export { ChartComponent };

