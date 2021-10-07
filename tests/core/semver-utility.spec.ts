import { SemverUtility, SemverComparisonType } from '../../src';

describe('SemverUtility', () => {

	it('Has an option to get an equality delegate by comparison type', () => {
		const equalityTest = SemverUtility.getEqualityDelegateByType(SemverComparisonType.EQUAL);
		expect(equalityTest(5, 5)).toBe(true);
		expect(equalityTest(5, -5)).toBe(false);
		expect(equalityTest(5, 5.01)).toBe(false);
	});
});