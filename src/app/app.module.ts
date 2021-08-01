import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartJsModule } from 'ezy-chart/chartjs';
import { EChartsModule } from 'ezy-chart/echarts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, CommonModule, FormsModule, ChartJsModule, EChartsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
