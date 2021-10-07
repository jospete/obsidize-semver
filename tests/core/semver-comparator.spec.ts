import { SemverComparator } from '../../src';

describe('SemverComparator', () => {

	it('does not explode when given bad input', () => {
		const comparator = new SemverComparator(() => { throw new Error('should not get here'); });
		expect(comparator.compare('test1', 'test2')).toBe(comparator.compareFailureResult);
	});
});