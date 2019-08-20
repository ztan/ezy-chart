import { BaseChart } from './base.chart';
import { async as ngAsync, inject } from '@angular/core/testing';
import { NgZone } from '@angular/core';

class MockBaseChart extends BaseChart {
	constructor(zone: NgZone) {
		super(zone);
	}
	protected _checkUpdate(resized: boolean) {}
	protected _onDestroy() {}
}
describe('MockBaseChart class', () => {
	let bc: MockBaseChart;

	beforeEach(
		ngAsync(
			inject([NgZone], (zone: NgZone) => {
				bc = new MockBaseChart(zone);
			})
		)
	);

	afterEach(
		ngAsync(() => {
			bc.ngOnDestroy();
		})
	);

	it(
		'should reflect changes from colors input to the internal parameter',
		ngAsync(() => {
			expect(bc.colors).toBeUndefined();
			expect(bc.isParamChanged('colors')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
			bc.colors = [];

			expect(bc.colors).toEqual(jasmine.any(Array));
			expect(bc.isParamChanged('colors')).toBeTruthy();
			expect(bc.paramsChanged).toBeTruthy();

			bc.resetParamsChangeState();

			expect(bc.isParamChanged('colors')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
		})
	);

	it(
		'should reflect changes from colorsFor input to the internal parameter',
		ngAsync(() => {
			expect(bc.colorsFor).toBeUndefined();
			expect(bc.isParamChanged('colorsFor')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
			bc.colorsFor = 'data';

			expect(bc.colorsFor).toEqual('data');
			expect(bc.isParamChanged('colorsFor')).toBeTruthy();
			expect(bc.paramsChanged).toBeTruthy();

			bc.resetParamsChangeState();

			expect(bc.isParamChanged('colorsFor')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
		})
	);

	it(
		'should reflect changes from currency input to the internal parameter',
		ngAsync(() => {
			expect(bc.currency).toBeUndefined();
			expect(bc.isParamChanged('currency')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
			bc.currency = 'AUD';

			expect(bc.currency).toEqual('AUD');
			expect(bc.isParamChanged('currency')).toBeTruthy();
			expect(bc.paramsChanged).toBeTruthy();

			bc.resetParamsChangeState();

			expect(bc.isParamChanged('currency')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
		})
	);

	it(
		'should reflect changes from datasets input to the internal parameter',
		ngAsync(() => {
			expect(bc.datasets).toBeUndefined();
			expect(bc.isParamChanged('datasets')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
			bc.datasets = [];

			expect(bc.datasets).toEqual(jasmine.any(Array));
			expect(bc.isParamChanged('datasets')).toBeTruthy();
			expect(bc.paramsChanged).toBeTruthy();

			bc.resetParamsChangeState();

			expect(bc.isParamChanged('datasets')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
		})
	);

	it(
		'should reflect changes from digits input to the internal parameter',
		ngAsync(() => {
			expect(bc.digits).toBeUndefined();
			expect(bc.isParamChanged('digits')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
			bc.digits = '3';

			expect(bc.digits).toEqual('3');
			expect(bc.isParamChanged('digits')).toBeTruthy();
			expect(bc.paramsChanged).toBeTruthy();

			bc.resetParamsChangeState();

			expect(bc.isParamChanged('digits')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
		})
	);

	it(
		'should reflect changes from labels input to the internal parameter',
		ngAsync(() => {
			expect(bc.labels).toBeUndefined();
			expect(bc.isParamChanged('labels')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
			bc.labels = [];

			expect(bc.labels).toEqual(jasmine.any(Array));
			expect(bc.isParamChanged('labels')).toBeTruthy();
			expect(bc.paramsChanged).toBeTruthy();

			bc.resetParamsChangeState();

			expect(bc.isParamChanged('labels')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
		})
	);

	it(
		'should reflect changes from legend input to the internal parameter',
		ngAsync(() => {
			expect(bc.legend).toBeUndefined();
			expect(bc.isParamChanged('legend')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
			bc.legend = 'auto';

			expect(bc.legend).toEqual('auto');
			expect(bc.isParamChanged('legend')).toBeTruthy();
			expect(bc.paramsChanged).toBeTruthy();

			bc.resetParamsChangeState();

			expect(bc.isParamChanged('legend')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
		})
	);

	it(
		'should reflect changes from percentage input to the internal parameter',
		ngAsync(() => {
			expect(bc.percentage).toBeUndefined();
			expect(bc.isParamChanged('percentage')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
			bc.percentage = 'only';

			expect(bc.percentage).toEqual('only');
			expect(bc.isParamChanged('percentage')).toBeTruthy();
			expect(bc.paramsChanged).toBeTruthy();

			bc.resetParamsChangeState();

			expect(bc.isParamChanged('percentage')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
		})
	);

	it(
		'should reflect changes from ratio input to the internal parameter',
		ngAsync(() => {
			expect(bc.ratio).toBeUndefined();
			expect(bc.isParamChanged('ratio')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
			bc.ratio = 2;

			expect(bc.ratio).toEqual(2);
			expect(bc.isParamChanged('ratio')).toBeTruthy();
			expect(bc.paramsChanged).toBeTruthy();

			bc.resetParamsChangeState();

			expect(bc.isParamChanged('ratio')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
		})
	);

	it(
		'should reflect changes from options input to the internal parameter',
		ngAsync(() => {
			expect(bc.options).toBeUndefined();
			expect(bc.isParamChanged('options')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
			bc.options = {};

			expect(bc.options).toBeDefined();
			expect(bc.isParamChanged('options')).toBeTruthy();
			expect(bc.paramsChanged).toBeTruthy();

			bc.resetParamsChangeState();

			expect(bc.isParamChanged('options')).toBeFalsy();
			expect(bc.paramsChanged).toBeFalsy();
		})
	);
});
