import { expect } from 'chai';
import { generateColorsBySeries, generateColorsByDataPoints } from './color.helpers';

describe('color helper', () => {
	it('should generate colors by data series', () => {
		const colors = generateColorsBySeries([], 40, 'bar');
		expect(colors).to.have.property('length', 40);
		colors.forEach(c => expect(c).to.be.an.instanceOf(Object));
	});

	it('should ignore colors that cannot be parsed', () => {
		const colors = generateColorsBySeries(['#33'], 2, 'bar');
		expect(colors).to.have.property('length', 2);
		colors.forEach(c => expect(c).to.be.an.instanceOf(Object));
	});

	it('should accept undefined parameters', () => {
		const colors = generateColorsBySeries(undefined, 2, undefined);
		expect(colors).to.have.property('length', 2);

		colors.forEach(c => expect(c).to.be.an.instanceOf(Object));
	});

	it('should generate line colors differently', () => {
		const colors = generateColorsByDataPoints(undefined, 2, 'line');
		expect(colors.borderColor).to.have.property('length', 2);

		(colors.borderColor as string[]).forEach(bc => expect(bc).to.not.equal('#fff'));
	});
});
