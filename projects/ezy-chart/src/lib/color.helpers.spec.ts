import { generateColorsBySeries, generateColorsByDataPoints } from './color.helpers';

describe('color helper', () => {
	it('should generate colors by data series', done => {
		const colors = generateColorsBySeries([], 40, 'bar');
		expect(colors).toEqual(jasmine.objectContaining({ length: 40 }));
		colors.forEach(c => expect(c).toEqual(jasmine.any(Object)));
		done();
	});

	it('should ignore colors that cannot be parsed', () => {
		const colors = generateColorsBySeries(['#33'], 2, 'bar');
		expect(colors).toEqual(jasmine.objectContaining({ length: 2 }));
		colors.forEach(c => expect(c).toEqual(jasmine.any(Object)));
	});

	it('should accept undefined parameters', () => {
		const colors = generateColorsBySeries(undefined, 2, undefined);
		expect(colors).toEqual(jasmine.objectContaining({ length: 2 }));

		colors.forEach(c => expect(c).toEqual(jasmine.any(Object)));
	});

	it('should generate line colors differently', () => {
		const colors = generateColorsByDataPoints(undefined, 2, 'line');
		expect(colors.borderColor).toEqual(jasmine.objectContaining({ length: 2 }));

		(colors.borderColor as string[]).forEach(bc => expect(bc).not.toEqual('#fff'));
	});
});
