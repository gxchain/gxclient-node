"use strict";

require("core-js/modules/es6.object.define-property");

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
Object.defineProperty(exports, "serialize", {
  enumerable: true,
  get: function get() {
    return _serialize.default;
  }
});
Object.defineProperty(exports, "Types", {
  enumerable: true,
  get: function get() {
    return _Types.default;
  }
});
exports.Signature = exports.default = void 0;

var _GXClient = _interopRequireDefault(require("./src/GXClient"));

var _GXClientFactory = _interopRequireDefault(require("./src/GXClientFactory"));

var _GXRPC = _interopRequireDefault(require("./src/GXRPC"));

var _serialize = _interopRequireDefault(require("./src/util/serialize"));

var _Types = _interopRequireDefault(require("./src/const/Types"));

var Signature = _interopRequireWildcard(require("./src/util/Signature"));

exports.Signature = Signature;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _GXClientFactory.default;
exports.default = _default;