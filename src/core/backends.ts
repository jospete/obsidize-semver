import * as compareVersions from 'compare-versions';
import { SemverComparator } from './semver-comparator';

/**
 * Default comparator that uses the 'compare-versions' module.
 */
export const Semver = new SemverComparator(compareVersions);