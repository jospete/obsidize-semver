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

	public compare(other: string, defaultValue?: number): number {
		return this.comparator.compare(this.version, other, defaultValue);
	}

	public lessThan(other: string, defaultValue?: boolean): boolean {
		return this.comparator.lessThan(this.version, other, defaultValue);
	}

	public lessThanOrEqualTo(other: string, defaultValue?: boolean): boolean {
		return this.comparator.lessThanOrEqualTo(this.version, other, defaultValue);
	}

	public equals(other: string, defaultValue?: boolean): boolean {
		return this.comparator.equals(this.version, other, defaultValue);
	}

	public greaterThanOrEqualTo(other: string, defaultValue?: boolean): boolean {
		return this.comparator.greaterThanOrEqualTo(this.version, other, defaultValue);
	}

	public greaterThan(other: string, defaultValue?: boolean): boolean {
		return this.comparator.greaterThan(this.version, other, defaultValue);
	}

	/**
	 * lessThan() alias
	 */
	public lt(other: string, defaultValue?: boolean): boolean {
		return this.lessThan(other, defaultValue);
	}

	/**
	 * lessThanOrEqualTo() alias
	 */
	public lte(other: string, defaultValue?: boolean): boolean {
		return this.lessThanOrEqualTo(other, defaultValue);
	}

	/**
	 * equals() alias
	 */
	public eq(other: string, defaultValue?: boolean): boolean {
		return this.equals(other, defaultValue);
	}

	/**
	 * greaterThanOrEqualTo() alias
	 */
	public gte(other: string, defaultValue?: boolean): boolean {
		return this.greaterThanOrEqualTo(other, defaultValue);
	}

	/**
	 * greaterThan() alias
	 */
	public gt(other: string, defaultValue?: boolean): boolean {
		return this.greaterThan(other, defaultValue);
	}
}