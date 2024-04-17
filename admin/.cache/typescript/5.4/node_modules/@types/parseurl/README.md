# Installation
> `npm install --save @types/parseurl`

# Summary
This package contains type definitions for parseurl (https://github.com/pillarjs/parseurl).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/parseurl.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/parseurl/index.d.ts)
````ts
/// <reference types="node" />

import { IncomingMessage } from "http";
import { Url } from "url";

declare function parseurl(req: IncomingMessage): Url | undefined;

declare namespace parseurl {
    function original(req: IncomingMessage): Url | undefined;
}

export = parseurl;

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 09:09:39 GMT
 * Dependencies: [@types/node](https://npmjs.com/package/@types/node)

# Credits
These definitions were written by [Stefan Reichel](https://github.com/bomret).
