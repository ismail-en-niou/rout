# Installation
> `npm install --save @types/fresh`

# Summary
This package contains type definitions for fresh (https://github.com/jshttp/fresh#readme).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/fresh.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/fresh/index.d.ts)
````ts
export = fresh;

declare function fresh(reqHeaders: fresh.Headers, resHeaders: fresh.Headers): boolean;

declare namespace fresh {
    interface Headers {
        [header: string]: string | string[] | number | undefined;
    }
}

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 03:09:37 GMT
 * Dependencies: none

# Credits
These definitions were written by [BendingBender](https://github.com/BendingBender).
