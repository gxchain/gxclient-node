import {types, ops} from "gxbjs/dist/index";

/**
 * @module Types
 * you can reference any types from [types](https://github.com/gxchain/gxbjs/blob/master/lib/serializer/src/types.js) or [operations](https://github.com/gxchain/gxbjs/blob/master/lib/serializer/src/operations.js)
 */
const Types = {
    ...types,
    ...ops
};

export default Types;

