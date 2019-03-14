"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var callID = 0;

var GXRPC =
/*#__PURE__*/
function () {
  function GXRPC(service) {
    (0, _classCallCheck2.default)(this, GXRPC);
    this.service = service;
  }

  (0, _createClass2.default)(GXRPC, [{
    key: "query",
    value: function query(method, params) {
      return _axios.default.post(this.service, {
        jsonrpc: "2.0",
        method: method,
        params: params,
        id: ++callID
      }).then(function (resp) {
        if (resp.data.error) {
          return Promise.reject(resp.data.error);
        } else {
          return resp.data.result;
        }
      });
    }
  }, {
    key: "broadcast",
    value: function broadcast(tx) {
      return _axios.default.post(this.service, {
        jsonrpc: "2.0",
        method: "call",
        params: [2, "broadcast_transaction_synchronous", [tx]],
        id: ++callID
      }).then(function (resp) {
        if (resp.data.error) {
          return Promise.reject(resp.data.error);
        } else {
          // to adapt with old version, make the result an array
          return [resp.data.result];
        }
      });
    }
  }], [{
    key: "instance",
    value: function instance(service) {
      return new GXRPC(service);
    }
  }]);
  return GXRPC;
}();

var _default = GXRPC;
exports.default = _default;