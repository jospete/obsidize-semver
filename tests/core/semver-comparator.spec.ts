import { SemverComparator, Semver } from '../../src';

describe('SemverComparator', () => {

	it('does not explode when given bad input', () => {
		const comparator = new SemverComparator(() => { throw new Error('should not get here'); });
		expect(comparator.compare('test1', 'test2')).toBe(comparator.compareFailureResult);
	});

	it('can be used as a sorting function', () => {
		const input = ['5', '4.9.3', '7.0.1', null, '1.0', '1', ''];
		const output = ['1.0', '1', '4.9.3', '5', '7.0.1', null, ''];
		expect(input.sort(Semver.sortable)).toEqual(output);
	});

	describe('lessThan', () => {

		it('uses the default value when one is given', () => {
			expect(Semver.lessThan(null, null)).toBe(false);
			expect(Semver.lessThan(null, null, true)).toBe(true);
		});
	});

	describe('lessThanOrEqual', () => {

		it('uses the default value when one is given', () => {
			expect(Semver.lessThanOrEqual(null, null)).toBe(false);
			expect(Semver.lessThanOrEqual(null, null, true)).toBe(true);
		});
	});

	describe('greaterThanOrEqual', () => {

		it('uses the default value when one is given', () => {
			expect(Semver.greaterThanOrEqual(null, null)).toBe(false);
			expect(Semver.greaterThanOrEqual(null, null, true)).toBe(true);
		});
	});

	describe('equals', () => {

		it('uses the default value when one is given', () => {
			expect(Semver.equals(null, null)).toBe(false);
			expect(Semver.equals(null, null, true)).toBe(true);
		});

		it('works as expected', () => {
			expect(Semver.equals('1.0.0', '1')).toBe(true);
			expect(Semver.equals('1.0.0', '1.0')).toBe(true);
			expect(Semver.equals('1.0.0', '1.0.0')).toBe(true);
			expect(Semver.equals('1.0.0', '1.0.0.1')).toBe(false);
		});
	});
});