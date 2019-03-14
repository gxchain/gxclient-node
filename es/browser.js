"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GXClient", {
  enumerable: true,
  get: function get() {
    return _GXClient.default;
  }
});
Object.defineProperty(exports, "GXRPC", {
  enumerable: true,
  get: function get() {
    return _GXRPC.default;
  }
});
exports.default = void 0;

var _GXClient = _interopRequireDefault(require("./src/GXClient"));

var _GXClientFactory = _interopRequireDefault(require("./src/GXClientFactory"));

var _GXRPC = _interopRequireDefault(require("./src/GXRPC"));

var _default = _GXClientFactory.default;
exports.default = _default;