const { types, ops } = require('gxbjs/dist/index');

/**
 * @module Types
 * you can reference any types from [types](https://github.com/gxchain/gxbjs/blob/master/lib/serializer/src/types.js) or [operations](https://github.com/gxchain/gxbjs/blob/master/lib/serializer/src/operations.js)
 */
exports.default = {
  ...types,
  ...ops
};