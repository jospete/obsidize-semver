import { SemverComparator, SemverContext } from '../../src';

describe('SemverContext', () => {

	it('does not explode when given bad input', () => {
		const context = new SemverContext(() => { throw new Error('should not get here'); });
		expect(context.compare('test1')).toBe(context.comparator.compareFailureResult);
	});

	it('can accept a custom comparator', () => {
		const context = new SemverContext(() => '1.2.3', new SemverComparator(() => 1));
		expect(context.compare('test1')).toBe(1);
	});

	describe('lessThanOrEqual', () => {

		it('behaves as expected', () => {
			const context = new SemverContext(() => '1.2.3');
			expect(context.lessThanOrEqualTo('1.2.3')).toBe(true);
			expect(context.lessThanOrEqualTo('1.2.4')).toBe(true);
			expect(context.lessThanOrEqualTo('1.2.2')).toBe(false);
		});

		it('uses the default value when one is given', () => {
			const context = new SemverContext(() => '1.2.3');
			expect(context.lessThanOrEqualTo(null)).toBe(false);
			expect(context.lessThanOrEqualTo(null, true)).toBe(true);
		});
	});

	describe('alias methods', () => {

		it('is shortcuts for the extended method names', () => {
			const context = new SemverContext(() => '1.2.3');
			expect(context.equals('1')).toEqual(context.eq('1'));
			expect(context.greaterThan('1')).toEqual(context.gt('1'));
			expect(context.lessThan('1')).toEqual(context.lt('1'));
			expect(context.greaterThanOrEqualTo('1')).toEqual(context.gte('1'));
			expect(context.lessThanOrEqualTo('1')).toEqual(context.lte('1'));
		});
	});
});