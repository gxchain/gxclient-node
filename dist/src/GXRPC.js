"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var callID = 0;

var GXRPC =
/*#__PURE__*/
function () {
  function GXRPC(service) {
    _classCallCheck(this, GXRPC);

    this.service = service;
  }

  _createClass(GXRPC, [{
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