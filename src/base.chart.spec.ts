import { BaseChart } from './base.chart';
import { expect, should } from 'chai';

describe('BaseChart class', () => {
	it('should reflect changes from colors input to the internal parameter', () => {
		const bc = new BaseChart();
		expect(bc.colors).to.be.undefined;
		expect(bc.isParamChanged('colors')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
		bc.colors = [];

		expect(bc.colors).to.be.an('Array');
		expect(bc.isParamChanged('colors')).to.be.true;
		expect(bc.paramsChanged).to.be.true;

		bc.resetParamsChangeState();

		expect(bc.isParamChanged('colors')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
	});

	it('should reflect changes from colorsFor input to the internal parameter', () => {
		const bc = new BaseChart();
		expect(bc.colorsFor).to.be.undefined;
		expect(bc.isParamChanged('colorsFor')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
		bc.colorsFor = 'data';

		expect(bc.colorsFor).to.equal('data');
		expect(bc.isParamChanged('colorsFor')).to.be.true;
		expect(bc.paramsChanged).to.be.true;

		bc.resetParamsChangeState();

		expect(bc.isParamChanged('colorsFor')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
	});

	it('should reflect changes from currency input to the internal parameter', () => {
		const bc = new BaseChart();
		expect(bc.currency).to.be.undefined;
		expect(bc.isParamChanged('currency')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
		bc.currency = 'AUD';

		expect(bc.currency).to.equal('AUD');
		expect(bc.isParamChanged('currency')).to.be.true;
		expect(bc.paramsChanged).to.be.true;

		bc.resetParamsChangeState();

		expect(bc.isParamChanged('currency')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
	});

	it('should reflect changes from datasets input to the internal parameter', () => {
		const bc = new BaseChart();
		expect(bc.datasets).to.be.undefined;
		expect(bc.isParamChanged('datasets')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
		bc.datasets = [];

		expect(bc.datasets).to.be.an('Array');
		expect(bc.isParamChanged('datasets')).to.be.true;
		expect(bc.paramsChanged).to.be.true;

		bc.resetParamsChangeState();

		expect(bc.isParamChanged('datasets')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
	});

	it('should reflect changes from digits input to the internal parameter', () => {
		const bc = new BaseChart();
		expect(bc.digits).to.be.undefined;
		expect(bc.isParamChanged('digits')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
		bc.digits = '3';

		expect(bc.digits).to.equal('3');
		expect(bc.isParamChanged('digits')).to.be.true;
		expect(bc.paramsChanged).to.be.true;

		bc.resetParamsChangeState();

		expect(bc.isParamChanged('digits')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
	});

	it('should reflect changes from labels input to the internal parameter', () => {
		const bc = new BaseChart();
		expect(bc.labels).to.be.undefined;
		expect(bc.isParamChanged('labels')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
		bc.labels = [];

		expect(bc.labels).to.be.an('Array');
		expect(bc.isParamChanged('labels')).to.be.true;
		expect(bc.paramsChanged).to.be.true;

		bc.resetParamsChangeState();

		expect(bc.isParamChanged('labels')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
	});

	it('should reflect changes from legend input to the internal parameter', () => {
		const bc = new BaseChart();
		expect(bc.legend).to.be.undefined;
		expect(bc.isParamChanged('legend')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
		bc.legend = 'auto';

		expect(bc.legend).to.equal('auto');
		expect(bc.isParamChanged('legend')).to.be.true;
		expect(bc.paramsChanged).to.be.true;

		bc.resetParamsChangeState();

		expect(bc.isParamChanged('legend')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
	});

	it('should reflect changes from percentage input to the internal parameter', () => {
		const bc = new BaseChart();
		expect(bc.percentage).to.be.undefined;
		expect(bc.isParamChanged('percentage')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
		bc.percentage = 'only';

		expect(bc.percentage).to.equal('only');
		expect(bc.isParamChanged('percentage')).to.be.true;
		expect(bc.paramsChanged).to.be.true;

		bc.resetParamsChangeState();

		expect(bc.isParamChanged('percentage')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
	});

	it('should reflect changes from ratio input to the internal parameter', () => {
		const bc = new BaseChart();
		expect(bc.ratio).to.be.undefined;
		expect(bc.isParamChanged('ratio')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
		bc.ratio = 2;

		expect(bc.ratio).to.equal(2);
		expect(bc.isParamChanged('ratio')).to.be.true;
		expect(bc.paramsChanged).to.be.true;

		bc.resetParamsChangeState();

		expect(bc.isParamChanged('ratio')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
	});

	it('should reflect changes from options input to the internal parameter', () => {
		const bc = new BaseChart();
		expect(bc.options).to.be.undefined;
		expect(bc.isParamChanged('options')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
		bc.options = {};

		expect(bc.options).to.not.be.undefined;
		expect(bc.isParamChanged('options')).to.be.true;
		expect(bc.paramsChanged).to.be.true;

		bc.resetParamsChangeState();

		expect(bc.isParamChanged('options')).to.be.false;
		expect(bc.paramsChanged).to.be.false;
	});
});
