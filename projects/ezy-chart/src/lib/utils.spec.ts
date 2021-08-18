import { calculatePercent, formatMoney, formatPercentage } from './utils';

describe('utils', () => {
	it('should format percentage based on digit info', () => {
		expect(formatPercentage(0.13821, '1.0-2')).toEqual('13.82%');
		expect(formatPercentage(0.13821, '1.0-1')).toEqual('13.8%');
		expect(formatPercentage(0.13821, '1.0-0')).toEqual('14%');

		expect(formatPercentage(0.00003123, '1.0-2')).toEqual('0%');
		expect(formatPercentage(0.00003123, '1.0-2', '<')).toEqual('<0.01%');
		expect(formatPercentage(0.0003123, '1.0-2', '<')).toEqual('0.03%');

		expect(formatPercentage(0.0003123, '1.0-1')).toEqual('0%');
		expect(formatPercentage(0.0003123, '1.0-1', '<')).toEqual('<0.1%');
		expect(formatPercentage(0.003123, '1.0-1', '<')).toEqual('0.3%');

		expect(formatPercentage(0.003123, '1.0-0')).toEqual('0%');
		expect(formatPercentage(0.003123, '1.0-0', '<')).toEqual('<1%');
		expect(formatPercentage(0.03123, '1.0-0', '<')).toEqual('3%');

		expect(formatPercentage(0.003723, '1.0-0', '<')).toEqual('<1%');
		expect(formatPercentage(0.03723, '1.0-0', '<')).toEqual('4%');

		expect(formatPercentage(0.9999981, '1.0-0', '<')).toEqual('99%');
	});

	it('should format currency based on digit info', () => {
		expect(formatMoney(12.43, 'AUD', '1.0-2')).toEqual('$12.43');
		expect(formatMoney(12.43, 'AUD', '1.0-1')).toEqual('$12.4');
		expect(formatMoney(12.46, 'AUD', '1.0-1')).toEqual('$12.5');
		expect(formatMoney(12.43, 'AUD', '1.0-0')).toEqual('$12');

		expect(formatMoney(0.004243, 'AUD', '1.0-2')).toEqual('$0');
		expect(formatMoney(0.004243, 'AUD', '1.0-2', '<')).toEqual('<$0.01');
		expect(formatMoney(0.04243, 'AUD', '1.0-2', '<')).toEqual('$0.04');

		expect(formatMoney(0.04243, 'AUD', '1.0-1')).toEqual('$0');
		expect(formatMoney(0.04243, 'AUD', '1.0-1', '<')).toEqual('<$0.1');
		expect(formatMoney(0.06243, 'AUD', '1.0-1', '<')).toEqual('<$0.1');
		expect(formatMoney(0.4243, 'AUD', '1.0-1', '<')).toEqual('$0.4');

		expect(formatMoney(0.4243, 'AUD', '1.0-0')).toEqual('$0');
		expect(formatMoney(0.4243, 'AUD', '1.0-0', '<')).toEqual('<$1');
		expect(formatMoney(4.243, 'AUD', '1.0-0', '<')).toEqual('$4');
	});

	it('should round percentages without exceeding 100%', () => {
		{
			const splits = [55.5, 44.5];
			const decimalPlaces = 0;
			expect(calculatePercent(0, splits, decimalPlaces).rounded).toEqual(55);
			expect(calculatePercent(1, splits, decimalPlaces).rounded).toEqual(45);
		}
		{
			const splits = [99.6, 0.4];
			const decimalPlaces = 0;
			expect(calculatePercent(0, splits, decimalPlaces).rounded).toEqual(99);
			expect(calculatePercent(1, splits, decimalPlaces).rounded).toEqual(1);
		}
		{
			const splits = [99.5, 0.5];
			const decimalPlaces = 0;
			expect(calculatePercent(0, splits, decimalPlaces).rounded).toEqual(99);
			expect(calculatePercent(1, splits, decimalPlaces).rounded).toEqual(1);
		}
		{
			const splits = [33.3, 33.3, 33.4];
			const decimalPlaces = 0;
			expect(calculatePercent(0, splits, decimalPlaces).rounded).toEqual(33);
			expect(calculatePercent(1, splits, decimalPlaces).rounded).toEqual(33);
			expect(calculatePercent(2, splits, decimalPlaces).rounded).toEqual(34);
		}
		{
			const splits = [100, 100, 100];
			const decimalPlaces = 2;
			expect(calculatePercent(0, splits, decimalPlaces).rounded).toEqual(33.34);
			expect(calculatePercent(1, splits, decimalPlaces).rounded).toEqual(33.33);
			expect(calculatePercent(2, splits, decimalPlaces).rounded).toEqual(33.33);
		}
		{
			const splits = [null, 0, undefined, 100];
			const decimalPlaces = 2;
			expect(calculatePercent(0, splits, decimalPlaces).rounded).toEqual(0);
			expect(calculatePercent(1, splits, decimalPlaces).rounded).toEqual(0);
			expect(calculatePercent(2, splits, decimalPlaces).rounded).toEqual(0);
			expect(calculatePercent(3, splits, decimalPlaces).rounded).toEqual(100);
		}
		{
			const splits = [100, 100, 0];
			const decimalPlaces = 0;
			expect(calculatePercent(0, splits, decimalPlaces).rounded).toEqual(50);
			expect(calculatePercent(1, splits, decimalPlaces).rounded).toEqual(50);
			expect(calculatePercent(2, splits, decimalPlaces).rounded).toEqual(0);
		}
		{
			const splits = [0.47, 0.35, 34.13, 65.06];
			const decimalPlaces = 0;
			expect(calculatePercent(0, splits, decimalPlaces).rounded).toEqual(1);
			expect(calculatePercent(1, splits, decimalPlaces).rounded).toEqual(1);
			expect(calculatePercent(2, splits, decimalPlaces).rounded).toEqual(34);
			expect(calculatePercent(3, splits, decimalPlaces).rounded).toEqual(65);
		}
		{
			const splits = [0.47, 0.35, 0.33, 0.42, 0.23, 23.2, 75];
			const decimalPlaces = 0;
			expect(calculatePercent(0, splits, decimalPlaces).rounded).toEqual(1);
			expect(calculatePercent(1, splits, decimalPlaces).rounded).toEqual(1);
			expect(calculatePercent(2, splits, decimalPlaces).rounded).toEqual(1);
			expect(calculatePercent(3, splits, decimalPlaces).rounded).toEqual(1);
			expect(calculatePercent(4, splits, decimalPlaces).rounded).toEqual(1);
			expect(calculatePercent(5, splits, decimalPlaces).rounded).toEqual(23);
			expect(calculatePercent(6, splits, decimalPlaces).rounded).toEqual(75);
		}
	});
});
