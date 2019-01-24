"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var callID = 0;

var GXRPC = function () {
    function GXRPC(service) {
        (0, _classCallCheck3.default)(this, GXRPC);

        this.service = service;
    }

    (0, _createClass3.default)(GXRPC, [{
        key: "query",
        value: function query(method, params) {
            return _axios2.default.post(this.service, {
                jsonrpc: "2.0",
                method: method,
                params: params,
                id: ++callID
            }).then(function (resp) {
                if (resp.data.error) {
                    return _promise2.default.reject(resp.data.error);
                } else {
                    return resp.data.result;
                }
            });
        }
    }, {
        key: "broadcast",
        value: function broadcast(tx) {
            return _axios2.default.post(this.service, {
                jsonrpc: "2.0",
                method: "call",
                params: [2, "broadcast_transaction_synchronous", [tx]],
                id: ++callID
            }).then(function (resp) {
                if (resp.data.error) {
                    return _promise2.default.reject(resp.data.error);
                } else {
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

exports.default = GXRPC;