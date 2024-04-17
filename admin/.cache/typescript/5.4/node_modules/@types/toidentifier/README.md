# Installation
> `npm install --save @types/toidentifier`

# Summary
This package contains type definitions for toidentifier (https://github.com/component/toidentifier#readme).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/toidentifier.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/toidentifier/index.d.ts)
````ts
export = toIdentifier;

/**
 * Convert a string of words to a JavaScript identifier.
 *
 * Given a string as the argument, it will be transformed according to the following
 * rules and the new string will be returned:
 *
 * 1. Split into words separated by space characters (`0x20`).
 * 1. Upper case the first character of each word.
 * 1. Join the words together with no separator.
 * 1. Remove all non-word (`[0-9a-z_]`) characters.
 *
 * @example
 * import toIdentifier = require('toidentifier')
 *
 * console.log(toIdentifier('Bad Request'))
 * // => "BadRequest"
 */
declare function toIdentifier(str: string): string;

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 15:11:36 GMT
 * Dependencies: none

# Credits
These definitions were written by [BendingBender](https://github.com/BendingBender).
