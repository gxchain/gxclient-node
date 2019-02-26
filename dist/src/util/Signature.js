"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signBuffer = undefined;

var _gxbjs = require("gxbjs");

var signBuffer = function signBuffer(buf, pvk) {
  return _gxbjs.Signature.signBuffer(buf, _gxbjs.PrivateKey.fromWif(pvk));
};

exports.signBuffer = signBuffer;