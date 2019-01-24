"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GXRPC = exports.GXClient = undefined;

var _GXClient = require("./src/GXClient");

var _GXClient2 = _interopRequireDefault(_GXClient);

var _GXClientFactory = require("./src/GXClientFactory");

var _GXClientFactory2 = _interopRequireDefault(_GXClientFactory);

var _GXRPC = require("./src/GXRPC");

var _GXRPC2 = _interopRequireDefault(_GXRPC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.GXClient = _GXClient2.default;
exports.GXRPC = _GXRPC2.default;
exports.default = _GXClientFactory2.default;