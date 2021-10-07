import { Semver, SemverContext } from '../src';

describe('General Usage', () => {

	it('works as advertised', () => {
		const version = new SemverContext(() => '1.2.3');
		expect(version.greaterThan('1.0.0')).toBe(true);
		expect(version.greaterThanOrEqual('1.2.3')).toBe(true);
		expect(version.greaterThan('1.2.0')).toBe(true);
		expect(version.greaterThan(null)).toBe(false);
		expect(version.greaterThan(null, true)).toBe(true);
	});
});