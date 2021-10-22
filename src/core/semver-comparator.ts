import { SemverUtility } from './semver-utility';
import { SemverComparisonType } from './semver-comparison-type';

export type SemverComparisonResult = -1 | 0 | 1;
export type SemverComparisonDelegate = (v1: string, v2: string) => SemverComparisonResult;

/**
 * Core implementation for comparison functionality with error catching baked in.
 */
export class SemverComparator {

	/**
	 * Customizable value to be used when the comparison delegate explodes.
	 */
	public compareFailureResult: number = SemverUtility.COMPARE_FAILURE_DEFAULT;

	constructor(
		public onCompareVersions: SemverComparisonDelegate
	) {
	}

	/**
	 * Wrap this comparator as a delegate to be passed to arrays or other sortable constructs.
	 */
	public get sortable(): (a: string, b: string) => number {
		return (a: string, b: string) => this.compare(a, b);
	}

	/**
	 * Returns true if v1 < v2 - defaults to defaultValue on error.
	 */
	public lessThan(v1: string, v2: string, defaultValue: boolean = false): boolean {
		return this.test(v1, v2, SemverComparisonType.LESS_THAN, defaultValue);
	}

	/**
	 * Returns true if v1 <= v2 - defaults to defaultValue on error.
	 */
	public lessThanOrEqualTo(v1: string, v2: string, defaultValue: boolean = false): boolean {
		return this.test(v1, v2, SemverComparisonType.LESS_THAN_OR_EQUAL, defaultValue);
	}

	/**
	 * Returns true if v1 == v2 - defaults to defaultValue on error.
	 */
	public equals(v1: string, v2: string, defaultValue: boolean = false): boolean {
		return this.test(v1, v2, SemverComparisonType.EQUAL, defaultValue);
	}

	/**
	 * Returns true if v1 >= v2 - defaults to defaultValue on error.
	 */
	public greaterThanOrEqualTo(v1: string, v2: string, defaultValue: boolean = false): boolean {
		return this.test(v1, v2, SemverComparisonType.GREATER_THAN_OR_EQUAL, defaultValue);
	}

	/**
	 * Returns true if v1 > v2 - defaults to defaultValue on error.
	 */
	public greaterThan(v1: string, v2: string, defaultValue: boolean = false): boolean {
		return this.test(v1, v2, SemverComparisonType.GREATER_THAN, defaultValue);
	}

	/**
	 * lessThan() alias
	 */
	public lt(v1: string, v2: string, defaultValue?: boolean): boolean {
		return this.lessThan(v1, v2, defaultValue);
	}

	/**
	 * lessThanOrEqualTo() alias
	 */
	public lte(v1: string, v2: string, defaultValue?: boolean): boolean {
		return this.lessThanOrEqualTo(v1, v2, defaultValue);
	}

	/**
	 * equals() alias
	 */
	public eq(v1: string, v2: string, defaultValue?: boolean): boolean {
		return this.equals(v1, v2, defaultValue);
	}

	/**
	 * greaterThanOrEqualTo() alias
	 */
	public gte(v1: string, v2: string, defaultValue?: boolean): boolean {
		return this.greaterThanOrEqualTo(v1, v2, defaultValue);
	}

	/**
	 * greaterThan() alias
	 */
	public gt(v1: string, v2: string, defaultValue?: boolean): boolean {
		return this.greaterThan(v1, v2, defaultValue);
	}

	/**
	 * Returns the comparison result between the two given versions, where:
	 * * -1 indicates v1 < v2
	 * * 0 indicates v1 <= v2 | v1 = v2 | v1 >= v2
	 * * 1 indicates v1 > v2
	 * 
	 * Returns defaultValue on comparison failure.
	 */
	public compare(v1: string, v2: string, defaultValue: number = this.compareFailureResult): number {
		return SemverUtility.bombShield(() => this.onCompareVersions(v1, v2), defaultValue);
	}

	/**
	 * Returns true if the comparison between v1 and v2 results in the given type.
	 * Returns defaultValue on comparison error.
	 */
	public test(v1: string, v2: string, type: SemverComparisonType, defaultValue: boolean): boolean {

		const resultDefault = this.compareFailureResult;
		const compareResult = this.compare(v1, v2, resultDefault);

		if (compareResult === resultDefault) {
			return defaultValue;
		}

		return SemverUtility.bombShield(() => {
			const equalityTest = SemverUtility.getEqualityDelegateByType(type);
			return equalityTest(compareResult, 0);
		}, defaultValue)
	}
}