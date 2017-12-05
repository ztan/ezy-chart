import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import * as Chart from 'chart.js';

@NgModule({
	declarations: [ChartComponent],
	imports: [CommonModule],
	exports: [ChartComponent]
})
export class ChartsModule {}

export { ChartComponent };

Chart.pluginService.register({
	afterEvent: (chartInstance: Chart, chartEvent: MouseEvent) => {
		const legend = (chartInstance as any).legend;
		const canvas = chartInstance.canvas;
		const x = chartEvent.x;
		const y = chartEvent.y;
		let cursorStyle = 'default';
		if (x <= legend.right && x >= legend.left && y <= legend.bottom && y >= legend.top) {
			for (const box of legend.legendHitBoxes) {
				if (x <= box.left + box.width && x >= box.left && y <= box.top + box.height && y >= box.top) {
					cursorStyle = 'pointer';
					break;
				}
			}
		}
		if (canvas) {
			canvas.style.cursor = cursorStyle;
		}
	}
});
