# Installation
> `npm install --save @types/on-finished`

# Summary
This package contains type definitions for on-finished (https://github.com/jshttp/on-finished).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/on-finished.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/on-finished/index.d.ts)
````ts
/// <reference types="node" />
import { IncomingMessage, OutgoingMessage } from "http";

export = onFinished;

declare function onFinished<T extends IncomingMessage | OutgoingMessage>(
    msg: T,
    listener: (err: Error | null, msg: T) => void,
): T;

declare namespace onFinished {
    function isFinished(msg: IncomingMessage | OutgoingMessage): boolean;
}

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 09:09:39 GMT
 * Dependencies: [@types/node](https://npmjs.com/package/@types/node)

# Credits
These definitions were written by [Honza Dvorsky](https://github.com/czechboy0), and [BendingBender](https://github.com/BendingBender).
