import { SemverComparator } from './semver-comparator';
import { SemverUtility } from './semver-utility';
import { Semver } from './backends';

/**
 * Wrapper context for a given version delegate and comparator, in order to create more readable comparisons like
 * 
 * ```typescript
 * const version = new SemverContext(() => '1.2.3'); // or load dynamically from somewhere
 * console.log(version.greaterThan('1.0.0')); // true
 * console.log(version.greaterThanOrEqual('1.2.3')); // true
 * console.log(version.greaterThan('1.2.0')); // true
 * console.log(version.greaterThan(null)); // false
 * console.log(version.equals('not a version', true)); // true
 * ```
 */
export class SemverContext {

	constructor(
		public onGetVersion: () => string,
		public comparator: SemverComparator = Semver
	) {
	}

	public get version(): string {
		return SemverUtility.bombShield(this.onGetVersion, '');
	}

	compare(other: string, defaultValue?: number): number {
		return this.comparator.compare(this.version, other, defaultValue);
	}

	lessThan(other: string, defaultValue?: boolean): boolean {
		return this.comparator.lessThan(this.version, other, defaultValue);
	}

	lessThanOrEqual(other: string, defaultValue?: boolean): boolean {
		return this.comparator.lessThanOrEqual(this.version, other, defaultValue);
	}

	equals(other: string, defaultValue?: boolean): boolean {
		return this.comparator.equals(this.version, other, defaultValue);
	}

	greaterThanOrEqual(other: string, defaultValue?: boolean): boolean {
		return this.comparator.greaterThanOrEqual(this.version, other, defaultValue);
	}

	greaterThan(other: string, defaultValue?: boolean): boolean {
		return this.comparator.greaterThan(this.version, other, defaultValue);
	}
}