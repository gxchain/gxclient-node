"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace");

var _GXClient = _interopRequireDefault(require("./GXClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module GXClientFactory
 */
var ins = null;

function formatNetwork() {
  var network = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return network.replace("https://", "wss://").replace("http://", "ws://");
}

function needNewIns(oldIns, _ref) {
  var keyProvider = _ref.keyProvider,
      account = _ref.account,
      _ref$network = _ref.network,
      network = _ref$network === void 0 ? "" : _ref$network,
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
      network = _ref2$network === void 0 ? "" : _ref2$network,
      signatureProvider = _ref2.signatureProvider;
  return new _GXClient.default(keyProvider, account, formatNetwork(network), signatureProvider);
}

function resetInsProperty(oldIns, _ref3) {
  var keyProvider = _ref3.keyProvider,
      signatureProvider = _ref3.signatureProvider;
  oldIns.private_key = keyProvider;
  oldIns.signProvider = signatureProvider;
}
/**
 * A singleton factory for GXClient
 */


var _default = {
  constructor: function constructor() {
    throw new Error("Usage: GXClientFactory.instance({keyProvider, account, network, signatureProvider})");
  },

  /**
   * get GXClient instance
   * @param keyProvider {String} - private key
   * @param account {String} - '1.2.12'|'gxcaccount'
   * @param network {String} - entry point network address
   * @param signatureProvider {signatureProvider} 
   * @returns {GXClient}
   */
  instance: function instance(_ref4) {
    var keyProvider = _ref4.keyProvider,
        account = _ref4.account,
        _ref4$network = _ref4.network,
        network = _ref4$network === void 0 ? "" : _ref4$network,
        signatureProvider = _ref4.signatureProvider;

    if (!!ins) {
      if (needNewIns(ins, {
        keyProvider: keyProvider,
        account: account,
        network: network,
        signatureProvider: signatureProvider
      })) {
        ins = createNewIns({
          keyProvider: keyProvider,
          account: account,
          network: network,
          signatureProvider: signatureProvider
        });
      } else {
        resetInsProperty(ins, {
          keyProvider: keyProvider,
          signatureProvider: signatureProvider
        });
      }
    } else {
      ins = createNewIns({
        keyProvider: keyProvider,
        account: account,
        network: network,
        signatureProvider: signatureProvider
      });
    }

    return ins;
  }
};
/**
 * This callback is displayed as a global member.
 * @callback signatureProvider
 * @param transaction {TransactionBuilder}
 * @param chain_id {String} - Chain Id
 */

exports.default = _default;