import { formatMoney, formatPercentage } from './utils';

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

		expect(formatPercentage(0.9999981, '1.0-0', '<')).toEqual('<100%');
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
});
