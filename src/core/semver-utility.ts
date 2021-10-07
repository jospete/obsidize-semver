import { SemverComparisonType } from './semver-comparison-type';

export type EqualityDelegate = (a: number, b: number) => boolean;

/**
 * Pure helper functions for semver constructs.
 */
export namespace SemverUtility {

	const comparisonTypeMap: { [key: string]: EqualityDelegate } = {
		[SemverComparisonType.LESS_THAN]: lessThan,
		[SemverComparisonType.LESS_THAN_OR_EQUAL]: lessThanOrEqual,
		[SemverComparisonType.EQUAL]: equals,
		[SemverComparisonType.GREATER_THAN_OR_EQUAL]: greaterThanOrEqual,
		[SemverComparisonType.GREATER_THAN]: greaterThan
	};

	export const COMPARE_FAILURE_DEFAULT = Number.POSITIVE_INFINITY;

	export function getEqualityDelegateByType(type: SemverComparisonType): EqualityDelegate {
		return comparisonTypeMap[type];
	}

	export function lessThan(a: number, b: number): boolean {
		return a < b;
	}

	export function lessThanOrEqual(a: number, b: number): boolean {
		return a <= b;
	}

	export function equals(a: number, b: number): boolean {
		return a === b;
	}

	export function greaterThanOrEqual(a: number, b: number): boolean {
		return a >= b;
	}

	export function greaterThan(a: number, b: number): boolean {
		return a > b;
	}

	export function bombShield<T>(action: () => T, defaultValue: T): T {
		try {
			return action();
		} catch (_) {
			return defaultValue;
		}
	}
}