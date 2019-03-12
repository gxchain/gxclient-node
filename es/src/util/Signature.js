"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signBuffer = void 0;

var _index = require("gxbjs/dist/index");

/**
 * @module Signature
 */

/**
 * @static signBuffer
 * @function
 * @param buffer {Object} - a buffer
 * @param private_key {String} - private key
 * @returns {Signature} you can use .toHex to get signature hex string
 * 
 * @example 
 * import { Signature } from 'gxclient'
 * const buf = Buffer.from('hello')
 * Signature.signBuffer(buf, '5KQNge45iAFohAJFnXowuPk3ob3eiGbAQMCtff7tM78i5RNywMe')
 * 
 * @example
 * // if you want to use verify_signature function in contract, you must serialize your buffer first
 * import {serialize, Types} from 'gxclient'
 * const buf = serialize('hello', Types.string)
 * Signature.signBuffer(buf, '5KQNge45iAFohAJFnXowuPk3ob3eiGbAQMCtff7tM78i5RNywMe')
 */
var signBuffer = function signBuffer(buf, pvk) {
  return _index.Signature.signBuffer(buf, _index.PrivateKey.fromWif(pvk));
};

exports.signBuffer = signBuffer;