"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = serialize;

var _gxbjs = require("gxbjs");

/**
 * @module serialize
 */

/**
 * @static serialize
 * @function
 * @param data {*} - a buffer
 * @param type {Object} - you can import types from as: `import {Types} from 'gxclient'`
 * @returns {Object} a buffer
 * @example 
 * import { serialize, Types } from 'gxclient'
 * serialize('hello', Types.string).toString('hex') // => 0568656c6c6f
 */
function serialize(data) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _gxbjs.types.string;

  if (type instanceof _gxbjs.Serializer) {
    return type.toBuffer(data);
  } else {
    var ser = new _gxbjs.Serializer("temp", {
      temp: type
    });
    return ser.toBuffer({
      temp: data
    });
  }
}