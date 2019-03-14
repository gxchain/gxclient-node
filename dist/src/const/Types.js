"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _index = require("gxbjs/dist/index");

/**
 * @module Types
 * you can reference any types from [types](https://github.com/gxchain/gxbjs/blob/master/lib/serializer/src/types.js) or [operations](https://github.com/gxchain/gxbjs/blob/master/lib/serializer/src/operations.js)
 */
var Types = (0, _objectSpread2.default)({}, _index.types, _index.ops);
var _default = Types;
exports.default = _default;