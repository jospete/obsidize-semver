import { SemverContext } from '../../src';

describe('SemverContext', () => {

	it('does not explode when given bad input', () => {
		const context = new SemverContext(() => { throw new Error('should not get here'); });
		expect(context.compare('test1')).toBe(context.comparator.compareFailureResult);
	});
});