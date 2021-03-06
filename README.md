# @obsidize/semver

Middleware to compare semver strings and not cause error explosions on malformed input.

This was created with the belief that a version comparator should not halt execution during other complex processes.

```typescript
import * as compareVersions from 'compare-versions';
import {Semver} from '@obsidize/semver';

compareVersions('1.2.3', ''); // ERROR ERROR ERROR ONE OF THE ARGS ISN'T A VERSION AHHHHH!!!
Semver.greaterThan('1.2.3', ''); // false
```

**NOTE:** While the above example is poking fun at the [compare-versions](https://www.npmjs.com/package/compare-versions)
module, this module actually uses compare-versions as the primary backend for core comparison logic.

## Installation

- npm:

```bash
npm install --save @obsidize/semver
```

- git:

```bash
npm install --save git+https://github.com/jospete/obsidize-semver.git
```

## Usage

### Example

```typescript
import {Semver, SemverComparator, SemverContext} from '@obsidize/semver';

// Use the static comparator for one-off comparisons
console.log(Semver.gt('1.2.3', '1')); // true
console.log(Semver.gt('1.2.3', null)); // false
console.log(Semver.eq('1.2.3', null, true)); // true (because 3rd parameter 'defaultValue' is true)

// Or create a version context for multiple checks against a target version
const version = new SemverContext(() => '1.2.3'); // or load this dynamically from somewhere else
console.log(version.lt('2')); // true
console.log(version.eq('1.2.3')); // true
console.log(version.gte('1.2.3')); // true
console.log(version.gt(null)); // false
console.log(version.gt(null, true)); // true
console.log(version.gt('2', true)); // false

// Don't like 'compare-versions' as the backend?
// Make your own!
const customComparator = new SemverComparator((a, b) =>  /* fancy compare function here */);
```

See the [Example Usage Spec](https://github.com/jospete/obsidize-semver/blob/master/tests/example-usage.spec.ts) to get a general feel for what this module can do.

## API

Source documentation can be found [here](https://jospete.github.io/obsidize-semver/)