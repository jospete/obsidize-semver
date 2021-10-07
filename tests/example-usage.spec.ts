import { Semver, SemverContext, SemverUtility } from '../src';

describe('General Usage', () => {

	it('works as advertised', () => {
		expect(Semver.lessThan('1.0.0', '1.0.1')).toBe(true);
		expect(Semver.greaterThan('1.0.0', '0.999.9999')).toBe(true);
		expect(Semver.lessThanOrEqual('1.0.0', '0.999.9999', true)).toBe(false);
		expect(Semver.lessThanOrEqual('1.0.0', null, true)).toBe(true);
		expect(Semver.compare(null, null)).toBe(SemverUtility.COMPARE_FAILURE_DEFAULT);
	});

	it('can create context instances to make repetitive comparisons more simple', () => {
		const version = new SemverContext(() => '1.2.3');
		expect(version.greaterThan('1.0.0')).toBe(true);
		expect(version.greaterThanOrEqual('1.2.3')).toBe(true);
		expect(version.greaterThan('1.2.0')).toBe(true);
		expect(version.greaterThan(null)).toBe(false);
		expect(version.greaterThan(null, true)).toBe(true);
	});
});