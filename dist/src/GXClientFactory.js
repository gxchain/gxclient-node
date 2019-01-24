"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _GXClient = require("./GXClient");

var _GXClient2 = _interopRequireDefault(_GXClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ins = null;

function formatNetwork() {
    var network = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    return network.replace("https://", "wss://").replace("http://", "ws://");
}

function needNewIns(oldIns, _ref) {
    var keyProvider = _ref.keyProvider,
        account = _ref.account,
        _ref$network = _ref.network,
        network = _ref$network === undefined ? "" : _ref$network,
        signatureProvider = _ref.signatureProvider;

    if (account != oldIns.account_id_or_name || formatNetwork(network) != oldIns.witness) {
        return true;
    } else {
        return false;
    }
}

function createNewIns(_ref2) {
    var keyProvider = _ref2.keyProvider,
        account = _ref2.account,
        _ref2$network = _ref2.network,
        network = _ref2$network === undefined ? "" : _ref2$network,
        signatureProvider = _ref2.signatureProvider;

    return new _GXClient2.default(keyProvider, account, formatNetwork(network), signatureProvider);
}

function resetInsProperty(oldIns, _ref3) {
    var keyProvider = _ref3.keyProvider,
        signatureProvider = _ref3.signatureProvider;

    oldIns.private_key = keyProvider;
    oldIns.signProvider = signatureProvider;
}

exports.default = {
    constructor: function constructor() {
        throw new Error("Usage: GXClientFactory.instance({keyProvider, account, network, signatureProvider})");
    },
    instance: function instance(_ref4) {
        var keyProvider = _ref4.keyProvider,
            account = _ref4.account,
            _ref4$network = _ref4.network,
            network = _ref4$network === undefined ? "" : _ref4$network,
            signatureProvider = _ref4.signatureProvider;

        if (!!ins) {
            if (needNewIns(ins, { keyProvider: keyProvider, account: account, network: network, signatureProvider: signatureProvider })) {
                ins = createNewIns({ keyProvider: keyProvider, account: account, network: network, signatureProvider: signatureProvider });
            } else {
                resetInsProperty(ins, { keyProvider: keyProvider, signatureProvider: signatureProvider });
            }
        } else {
            ins = createNewIns({ keyProvider: keyProvider, account: account, network: network, signatureProvider: signatureProvider });
        }

        return ins;
    }
};