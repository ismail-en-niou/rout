# Installation
> `npm install --save @types/destroy`

# Summary
This package contains type definitions for destroy (https://github.com/stream-utils/destroy).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/destroy.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/destroy/index.d.ts)
````ts
/// <reference types="node" />
import { Stream } from "stream";

export = destroy;

declare function destroy<T extends Stream>(stream: T): T;

````

### Additional Details
 * Last updated: Mon, 06 Nov 2023 22:41:05 GMT
 * Dependencies: [@types/node](https://npmjs.com/package/@types/node)

# Credits
These definitions were written by [BendingBender](https://github.com/BendingBender).
