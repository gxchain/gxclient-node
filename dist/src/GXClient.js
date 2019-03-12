"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.regexp.replace");

var _index = require("gxbjs/dist/index");

var _tx_serializer = require("gxbjs/dist/tx_serializer");

var _TransactionBuilder = _interopRequireDefault(require("./TransactionBuilder"));

var _memonic = require("./util/memonic");

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _const = require("../const/const");

var _axios = _interopRequireDefault(require("axios"));

var _GXRPC = _interopRequireDefault(require("./GXRPC"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * This callback is displayed as a global member.
 * @callback signatureProvider
 * @param transaction {TransactionBuilder}
 * @param chain_id {String} - Chain Id
 */

/**
 * GXClient Class
 */
var GXClient =
/*#__PURE__*/
function () {
  /**
   *
   * @param {String} private_key - private key
   * @param {String} account_id_or_name - e.g: '1.2.44'|'gxcaccount'
   * @param {String} entry_point - entry point network address
   * @param {signatureProvider} signProvider
   */
  function GXClient(private_key, account_id_or_name) {
    var entry_point = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "wss://node1.gxb.io";
    var signProvider = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, GXClient);

    this.private_key = private_key;
    this.account_id_or_name = account_id_or_name;

    if (/^1.2.\d+$/.test(account_id_or_name)) {
      this.account_id = account_id_or_name;
    } else {
      this.account = account_id_or_name;
    }

    this.connected = false;
    this.chain_id = "";
    this.witness = entry_point;
    this.signProvider = signProvider;
    this.host = this.witness.replace("wss://", "https://").replace("ws://", "http://");
    this.rpc = _GXRPC.default.instance(this.host);
  }
  /**
   * generate key pair locally
   * @returns {{brainKey: *, privateKey: *, publicKey: *}}
   */


  _createClass(GXClient, [{
    key: "generateKey",
    value: function generateKey(brainKey) {
      brainKey = brainKey || (0, _memonic.generateMnemonic)(160); // generate a new brain key if not assigned

      console.log("bbk", brainKey);

      var privateKey = _index.key.get_brainPrivateKey(brainKey);

      var publicKey = privateKey.toPublicKey().toPublicKeyString();
      return {
        brainKey: brainKey,
        privateKey: privateKey.toWif(),
        publicKey: publicKey
      };
    }
    /**
     * export public key from private key
     * @param privateKey {String}
     * @returns {String}
     */

  }, {
    key: "privateToPublic",
    value: function privateToPublic(privateKey) {
      return _index.PrivateKey.fromWif(privateKey).toPublicKey().toPublicKeyString();
    }
    /**
     * check if public key is valid
     * @param publicKey {String}
     * @returns {boolean}
     */

  }, {
    key: "isValidPublic",
    value: function isValidPublic(publicKey) {
      return !!_index.PublicKey.fromPublicKeyString(publicKey);
    }
    /**
     * check if private key is valid
     * @param privateKey {String}
     * @returns {boolean}
     */

  }, {
    key: "isValidPrivate",
    value: function isValidPrivate(privateKey) {
      try {
        return !!_index.PrivateKey.fromWif(privateKey);
      } catch (ex) {
        return false;
      }
    }
    /**
     * register an account by faucet
     * @param account {String} - Account name
     * @param activeKey {String} - Public Key for account operator
     * @param ownerKey {String} - Public Key for account owner
     * @param memoKey {String} - Public Key for memo
     * @param faucet {String} - faucet url
     * @returns {Promise<any>}
     * @example
     * curl ‘https://opengateway.gxb.io/account/register' -H 'Content-type: application/json' -H 'Accept: application/json’ -d ‘{“account”:{“name”:”gxb123”,”owner_key”:”GXC5wQ4RtjouyobBV57vTx7boBj4Kt3BUxZEMsUD3TU369d3C9DqZ”,”active_key”:”GXC7cPVyB9F1Pfiaaxw4nY3xKADo5993hEsTjFs294LKwhqsUrFZs”,”memo_key”:”GXC7cPVyB9F1Pfiaaxw4nY3xKADo5993hEsTjFs294LKwhqsUrFZs”,”refcode”:null,”referrer”:null}}’
     */

  }, {
    key: "register",
    value: function register(account, activeKey, ownerKey, memoKey) {
      var faucet = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "https://opengateway.gxb.io";
      return new Promise(function (resolve, reject) {
        if (!activeKey) {
          reject(new Error("active key is required"));
        } else {
          _axios.default.post("".concat(faucet, "/account/register"), {
            account: {
              name: account,
              active_key: activeKey,
              owner_key: ownerKey || activeKey,
              memo_key: memoKey || activeKey
            }
          }).then(function (resp) {
            resolve(resp.data);
          }).catch(reject);
        }
      });
    }
    /**
     * fetching latest block each 3 seconds
     * @private
     */

  }, {
    key: "_latestBlockTask",
    value: function _latestBlockTask(force) {
      var _this = this;

      if (this.isTaskStarted && !force) {
        return false;
      }

      this.isTaskStarted = true;
      this.getDynamicGlobalProperties().then(function (obj) {
        try {
          var latestBlock = obj.last_irreversible_block_num;

          if (_this.latestBlock !== latestBlock) {
            _this.latestBlock = latestBlock;
            console.log("latest block:", _this.latestBlock);
          }
        } catch (ex) {
          console.error("error when fetching block header,", ex);
        } finally {
          setTimeout(function () {
            _this._latestBlockTask(true);
          }, 3000);
        }
      });
    }
    /**
     * get object by id
     * @param object_id {String} - e.g: '1.2.3'
     * @returns {Request|PromiseLike<T>|Promise<T>}
     */

  }, {
    key: "getObject",
    value: function getObject(object_id) {
      return this._query("get_objects", [[object_id]]).then(function (results) {
        return results[0];
      });
    }
    /**
     * get objects
     * @param {String[]} object_ids
     * @returns {Request|PromiseLike<T>|Promise<T>}
     */

  }, {
    key: "getObjects",
    value: function getObjects(object_ids) {
      return this._query("get_objects", [object_ids]);
    }
    /**
     * get account info by account name
     * @param account_name {String}
     * @returns {Promise<any>}
     */

  }, {
    key: "getAccount",
    value: function getAccount(account_name) {
      return this._query("get_account_by_name", [account_name]);
    }
    /**
     * get current blockchain id
     * @returns {Request|PromiseLike<T>|Promise<T>}
     */

  }, {
    key: "getChainID",
    value: function getChainID() {
      return this._query("get_chain_id", []);
    }
    /**
     * get dynamic global properties
     * @returns {Request|PromiseLike<T>|Promise<T>}
     */

  }, {
    key: "getDynamicGlobalProperties",
    value: function getDynamicGlobalProperties() {
      return this._query("get_dynamic_global_properties", []);
    }
    /**
     * get account_ids by public key
     * @param publicKey {String}
     * @returns {Request|PromiseLike<T>|Promise<T>}
     */

  }, {
    key: "getAccountByPublicKey",
    value: function getAccountByPublicKey(publicKey) {
      return this._query("get_key_references", [[publicKey]]).then(function (results) {
        return (0, _uniq.default)(results[0]);
      });
    }
    /**
     * get account balances by account name
     * @param account_name {String}
     * @returns {Promise<any>}
     */

  }, {
    key: "getAccountBalances",
    value: function getAccountBalances(account_name) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.getAccount(account_name).then(function (account) {
          resolve(_this2._query("get_account_balances", [account.id, []]));
        }).catch(reject);
      });
    }
    /**
     * get asset info by symbol
     * @param symbol {String} - e.g: 'GXC'
     * @returns {Promise<any>}
     */

  }, {
    key: "getAsset",
    value: function getAsset(symbol) {
      return this._query("lookup_asset_symbols", [[symbol]]).then(function (assets) {
        return assets[0];
      });
    }
    /**
     * get block by block height
     * @param blockHeight {Number} - block height
     * @returns {Promise<any>}
     */

  }, {
    key: "getBlock",
    value: function getBlock(blockHeight) {
      return this._query("get_block", [blockHeight]);
    }
    /**
     * detect new transactions related to this.account_id
     * @param blockHeight {Number} - block height
     * @param callback {Function}
     */

  }, {
    key: "detectTransaction",
    value: function detectTransaction(blockHeight, callback) {
      var _this3 = this;

      var detect = function detect() {
        _this3.getBlock(blockHeight).then(function (block) {
          console.log(blockHeight);

          if (block) {
            block.transactions.forEach(function (transaction, i) {
              var txid = block.transaction_ids[i];
              transaction.operations.forEach(function (op) {
                var exist = false;

                for (var key in op[1]) {
                  var val = op[1][key];

                  if (val === _this3.account_id) {
                    exist = true;
                  }
                }

                exist && callback && callback(blockHeight, txid, op);
              });
            });

            if (blockHeight < _this3.latestBlock) {
              process.nextTick(function () {
                _this3.detectTransaction(blockHeight + 1, callback);
              });
            } else {
              setTimeout(function () {
                _this3.detectTransaction(blockHeight, callback);
              }, 1000);
            }
          } else {
            setTimeout(function () {
              _this3.detectTransaction(blockHeight, callback);
            }, 1000);
          }
        }).catch(function (ex) {
          console.error("get block error", ex);
          setTimeout(function () {
            _this3.detectTransaction(blockHeight, callback);
          }, 1000);
        });
      };

      this._latestBlockTask(false);

      detect();
    }
    /**
     * send transfer request to witness node
     * @param to {String} - to account name
     * @param memo {String|Function} - memo
     * @param amount_asset {String} - e.g: '1 GXC'
     * @param broadcast {Boolean}
     * @param options {Object}
     * @param options.fee_symbol {String} - e.g: 'GXC'
     * @returns {Promise<any>}
     */

  }, {
    key: "transfer",
    value: function transfer(to, memo, amount_asset) {
      var _this4 = this;

      var broadcast = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var fee_symbol = options.fee_symbol;
      var memo_private = this.private_key;
      var isMemoProvider = false; // if memo is function, it can receive fromAccount and toAccount, and should return a full memo object

      if (typeof memo === "function") {
        isMemoProvider = true;
      }

      return new Promise(function (resolve, reject) {
        if (amount_asset.indexOf(" ") == -1) {
          reject(new Error("Incorrect format of asset, eg. \"100 GXC\""));
        } else {
          var amount = Number(amount_asset.split(" ").filter(function (o) {
            return !!o;
          })[0]);
          var asset = amount_asset.split(" ").filter(function (o) {
            return !!o;
          })[1];
          resolve(_this4._connect().then(function () {
            var promises = [_this4._query("get_objects", [[_this4.account_id]]), _this4.getAccount(to), _this4.getAsset(asset)];

            if (fee_symbol) {
              promises.push(_this4.getAsset(fee_symbol));
            }

            return Promise.all(promises).then(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(results) {
                var memo_object, fromAcc, toAcc, assetInfo, feeInfo, memo_from_public, memo_to_public, fromPrivate, nonce, tr;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        fromAcc = results[0][0];
                        toAcc = results[1];
                        assetInfo = results[2];
                        feeInfo = results[3] || {};

                        if (toAcc) {
                          _context.next = 6;
                          break;
                        }

                        throw new Error("Account ".concat(to, " not exist"));

                      case 6:
                        if (assetInfo) {
                          _context.next = 8;
                          break;
                        }

                        throw new Error("Asset ".concat(asset, " not exist"));

                      case 8:
                        amount = {
                          amount: _this4._accMult(amount, Math.pow(10, assetInfo.precision)),
                          asset_id: assetInfo.id
                        };

                        if (isMemoProvider) {
                          _context.next = 21;
                          break;
                        }

                        if (!memo) {
                          _context.next = 18;
                          break;
                        }

                        memo_from_public = fromAcc.options.memo_key; // The 1s are base58 for all zeros (null)

                        if (/111111111111111111111/.test(memo_from_public)) {
                          memo_from_public = null;
                        }

                        memo_to_public = toAcc.options.memo_key;

                        if (/111111111111111111111/.test(memo_to_public)) {
                          memo_to_public = null;
                        }

                        fromPrivate = _index.PrivateKey.fromWif(memo_private);

                        if (!(memo_from_public != fromPrivate.toPublicKey().toPublicKeyString())) {
                          _context.next = 18;
                          break;
                        }

                        throw new Error("memo signer not exist");

                      case 18:
                        if (memo && memo_to_public && memo_from_public) {
                          nonce = _index.TransactionHelper.unique_nonce_uint64();
                          memo_object = {
                            from: memo_from_public,
                            to: memo_to_public,
                            nonce: nonce,
                            message: _index.Aes.encrypt_with_checksum(_index.PrivateKey.fromWif(memo_private), memo_to_public, nonce, new Buffer(memo, "utf-8"))
                          };
                        }

                        _context.next = 31;
                        break;

                      case 21:
                        _context.prev = 21;
                        _context.next = 24;
                        return memo(fromAcc, toAcc);

                      case 24:
                        memo_object = _context.sent;
                        _context.next = 31;
                        break;

                      case 27:
                        _context.prev = 27;
                        _context.t0 = _context["catch"](21);
                        reject(_context.t0);
                        return _context.abrupt("return");

                      case 31:
                        tr = _this4._createTransaction();
                        tr.add_operation(tr.get_type_operation("transfer", {
                          fee: {
                            amount: 0,
                            asset_id: feeInfo.id || amount.asset_id
                          },
                          from: fromAcc.id,
                          to: toAcc.id,
                          amount: amount,
                          memo: memo_object
                        }));
                        return _context.abrupt("return", _this4._processTransaction(tr, broadcast));

                      case 34:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[21, 27]]);
              }));

              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }());
          }));
        }
      });
    }
    /**
     * get contract abi by contract_name
     * @param contract_name {String}
     * @returns {Promise<any>}
     */

  }, {
    key: "getContractABI",
    value: function getContractABI(contract_name) {
      return this.getAccount(contract_name).then(function (acc) {
        return acc.abi;
      });
    }
    /**
     * get contract table by contract_name
     * @param contract_name {String}
     * @returns {Promise<any>}
     */

  }, {
    key: "getContractTable",
    value: function getContractTable(contract_name) {
      return this.getAccount(contract_name).then(function (acc) {
        return acc.abi && acc.abi.tables;
      });
    }
    /**
     * fetch contract table record by contract_name and table_name
     * @param contract_name {String}
     * @param table_name {String}
     * @param start {Number}
     * @param limit {Number}
     * @returns {Promise<any>}
     */

  }, {
    key: "getTableObjects",
    value: function getTableObjects(contract_name, table_name) {
      var _this5 = this;

      var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
      return this.getAccount(contract_name).then(function (acc) {
        if (acc) {
          var contract_id = (0, _index.object_id_type)(acc.id).toString();
          return _this5._query("get_table_objects", [contract_id, contract_id, (0, _index.string_to_name)(table_name).toString(), start, -1, limit]);
        } else {
          throw new Error("Contract not found");
        }
      });
    }
    /**
     * deploy smart contract
     * @param contract_name {String}
     * @param code {String} - bytecode
     * @param abi {Object} - abi object
     * @param vm_type {String}
     * @param vm_version {String}
     * @param broadcast {Boolean}
     * @param options {Object}
     * @param options.fee_symbol {String} - e.g: 'GXC'
     * @returns {Promise<any>}
     */

  }, {
    key: "createContract",
    value: function () {
      var _createContract = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(contract_name, code, abi) {
        var _this6 = this;

        var vm_type,
            vm_version,
            broadcast,
            options,
            fee_symbol,
            feeInfo,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                vm_type = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : "0";
                vm_version = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : "0";
                broadcast = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : false;
                options = _args2.length > 6 && _args2[6] !== undefined ? _args2[6] : {};
                fee_symbol = options.fee_symbol;
                feeInfo = {};

                if (!fee_symbol) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 9;
                return this.getAsset(fee_symbol);

              case 9:
                feeInfo = _context2.sent;

              case 10:
                return _context2.abrupt("return", this._connect().then(function () {
                  var tr = _this6._createTransaction();

                  tr.add_operation(tr.get_type_operation("create_contract", {
                    fee: {
                      amount: 0,
                      asset_id: feeInfo.id || "1.3.1"
                    },
                    name: contract_name,
                    account: _this6.account_id,
                    vm_type: vm_type,
                    vm_version: vm_version,
                    code: code,
                    abi: abi
                  }));
                  return _this6._processTransaction(tr, broadcast);
                }));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createContract(_x2, _x3, _x4) {
        return _createContract.apply(this, arguments);
      }

      return createContract;
    }()
    /**
     * update smart contract
     * @param contract_name {String}
     * @param newOwner {String} - new owner account name
     * @param code {String} - same to createContract
     * @param abi {Object} - same to createContract
     * @param broadcast {Boolean}
     * @param options {Object}
     * @param options.fee_symbol {String} - e.g: 'GXC'
     * @returns {Request|PromiseLike<T>|Promise<T>}
     */

  }, {
    key: "updateContract",
    value: function updateContract(contract_name, newOwner, code, abi) {
      var _this7 = this;

      var broadcast = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var fee_symbol = options.fee_symbol;
      return this._connect().then(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var feeInfo, promises;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                feeInfo = {};
                promises = [_this7.getAccount(contract_name)];

                if (newOwner) {
                  promises.push(_this7.getAccount(newOwner));
                }

                if (!fee_symbol) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 6;
                return _this7.getAsset(fee_symbol);

              case 6:
                feeInfo = _context3.sent;

              case 7:
                return _context3.abrupt("return", Promise.all(promises).then(function (results) {
                  var tr = _this7._createTransaction();

                  var opt = {
                    fee: {
                      amount: 0,
                      asset_id: feeInfo.id || "1.3.1"
                    },
                    owner: _this7.account_id,
                    contract: results[0].id,
                    code: code,
                    abi: abi
                  };

                  if (newOwner) {
                    opt.new_owner = results[1].id;
                  }

                  tr.add_operation(tr.get_type_operation("update_contract", opt));
                  return _this7._processTransaction(tr, broadcast);
                }));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
    }
    /**
     * call smart contract method
     * @param contract_name {String} - The name of the smart contract
     * @param method_name {String} - Method/Action name
     * @param params {JSON} - parameters
     * @param amount_asset {String} - same to transfer eg."100 GXC"
     * @param broadcast {Boolean} - Broadcast the transaction or just return a serialized transaction
     * @param options {Object}
     * @param options.fee_symbol {String} - e.g: 'GXC'
     * @returns {Promise<any>}
     */

  }, {
    key: "callContract",
    value: function callContract(contract_name, method_name, params, amount_asset) {
      var _this8 = this;

      var broadcast = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var fee_symbol = options.fee_symbol;
      return this._connect().then(function () {
        if (amount_asset) {
          if (amount_asset.indexOf(" ") == -1) {
            throw new Error("Incorrect format of asset, eg. \"100 GXC\"");
          }
        }

        var amount = amount_asset ? Number(amount_asset.split(" ").filter(function (o) {
          return !!o;
        })[0]) : 0;
        var asset = amount_asset ? amount_asset.split(" ").filter(function (o) {
          return !!o;
        })[1] : "GXC";
        var promises = [_this8.getAccount(contract_name), _this8.getAsset(asset)];

        if (fee_symbol) {
          promises.push(_this8.getAsset(fee_symbol));
        }

        return Promise.all(promises).then(function (results) {
          var acc = results[0];
          var assetInfo = results[1];
          var feeInfo = results[2] || {};

          if (!assetInfo) {
            throw new Error("Asset ".concat(asset, " not exist"));
          }

          amount = {
            amount: _this8._accMult(amount, Math.pow(10, assetInfo.precision)),
            asset_id: assetInfo.id
          };

          if (acc) {
            var abi = acc.abi;
            var act = {
              method_name: method_name,
              data: (0, _tx_serializer.serializeCallData)(method_name, params, abi)
            };

            var tr = _this8._createTransaction();

            var opts = {
              "fee": {
                "amount": 0,
                "asset_id": feeInfo.id || amount.asset_id
              },
              "account": _this8.account_id,
              "contract_id": acc.id,
              "method_name": act.method_name,
              "data": act.data
            };

            if (!!amount.amount) {
              opts.amount = amount;
            }

            tr.add_operation(tr.get_type_operation("call_contract", opts));
            return _this8._processTransaction(tr, broadcast);
          } else {
            throw new Error("Contract not found");
          }
        });
      });
    }
    /**
     * vote for accounts
     * @param accounts {String[]} - An array of account_names to vote
     * @param broadcast {Boolean}
     * @param options {Object}
     * @param options.fee_symbol {String} - e.g: 'GXC'
     * @returns {Promise<any>}
     */

  }, {
    key: "vote",
    value: function vote() {
      var _this9 = this;

      var accounts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var broadcast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var fee_symbol = options.fee_symbol || "GXC";
      return new Promise(function (resolve) {
        resolve(_this9._connect().then(function () {
          var accountPromises = accounts.map(function (a) {
            return _this9.getAccount(a);
          });
          return Promise.all(accountPromises).then(function (accounts) {
            var account_ids = accounts.map(function (a) {
              return a.id;
            });
            return Promise.all([_this9._query("get_objects", [[_this9.account_id, "2.0.0"]]), _this9.getAsset(fee_symbol)]).then(function (results) {
              var acc = results[0][0];
              var globalObject = results[0][1];
              var fee_asset = results[1];

              if (!acc) {
                throw Error("account_id ".concat(_this9.account_id, " not exist"));
              }

              if (!fee_asset) {
                throw Error("asset ".concat(fee_symbol, " not exist"));
              }

              var new_options = {
                memo_key: acc.options.memo_key,
                voting_account: acc.options.voting_account || "1.2.5"
              };
              var promises = [];
              account_ids.forEach(function (account_id) {
                promises.push(_this9._query("get_witness_by_account", [account_id]));
                promises.push(_this9._query("get_committee_member_by_account", [account_id]));
              }); // fetch vote_ids

              return Promise.all(promises).then(function (results) {
                // filter empty records since some of the account are not witness or committee
                var votes = results.filter(function (r) {
                  return r;
                }).map(function (r) {
                  return r.vote_id;
                }); // only merge you votes into current selections
                // if you want cancel your votes, please operate it in your wallet
                // eg. Visit https://wallet.gxb.io

                new_options.votes = (0, _uniq.default)(votes.concat(acc.options.votes));
                var num_witness = 0;
                var num_committee = 0;
                new_options.votes.forEach(function (v) {
                  var vote_type = v.split(":")[0];

                  if (vote_type == "0") {
                    num_committee += 1;
                  }

                  if (vote_type == 1) {
                    num_witness += 1;
                  }
                });
                new_options.num_committee = Math.min(num_committee, globalObject.parameters.maximum_committee_count);
                new_options.num_witness = Math.min(num_witness, globalObject.parameters.maximum_witness_count);
                new_options.votes = new_options.votes.sort(function (a, b) {
                  var a_split = a.split(":");
                  var b_split = b.split(":");
                  return parseInt(a_split[1]) - parseInt(b_split[1]);
                });

                var tr = _this9._createTransaction();

                tr.add_operation(tr.get_type_operation("account_update", {
                  fee: {
                    amount: 0,
                    asset_id: fee_asset.id
                  },
                  account: _this9.account_id,
                  new_options: new_options
                }));
                return _this9._processTransaction(tr, broadcast);
              });
            });
          });
        }));
      });
    }
    /**
     * calculate fee of a operation
     * @param operation {Object}
     * @param feeAssetId {String}
     * @returns {Promise<any>}
     */

  }, {
    key: "fee",
    value: function fee(operation) {
      var feeAssetId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "1.3.1";
      return this._query("get_required_fees", [operation, feeAssetId]);
    }
    /**
     * accurate multiply - fix the accurate issue of javascript
     * @private
     * @param arg1
     * @param arg2
     * @returns {number}
     */

  }, {
    key: "_accMult",
    value: function _accMult(arg1, arg2) {
      var m = 0;
      var s1 = arg1.toString();
      var s2 = arg2.toString();

      try {
        m += s1.split(".")[1].length;
      } catch (e) {}

      try {
        m += s2.split(".")[1].length;
      } catch (e) {}

      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }
    /**
     *
     * @private
     */

  }, {
    key: "_connect",
    value: function _connect() {
      var _this10 = this;

      return new Promise(function (resolve) {
        if (_this10.connected) {
          resolve();
        } else {
          resolve(Promise.all([_this10.getAccount(_this10.account), _this10.getChainID()]).then(function (results) {
            var acc = results[0];
            _this10.chain_id = results[1];
            _this10.account_id = acc.id;
            _this10.connected = true;
            return;
          }));
        }
      });
    }
    /**
     *
     * @private
     */

  }, {
    key: "_query",
    value: function _query(method, params) {
      return this.rpc.query(method, params);
    }
    /**
     * WARNING: This function have to be used after connected
     * @returns {*}
     * @private
     */

  }, {
    key: "_createTransaction",
    value: function _createTransaction() {
      var tr = null;

      if (!this.connected) {
        throw new Error("_createTransaction have to be invoked after _connect()");
      }

      if (this.signProvider) {
        tr = new _TransactionBuilder.default(this.signProvider, this.rpc, this.chain_id);
      } else {
        tr = new _TransactionBuilder.default(null, this.rpc, this.chain_id);
      }

      return tr;
    }
    /**
     * process transaction
     * @private
     * @param tr
     * @param broadcast
     * @returns {Promise<any[]>}
     */

  }, {
    key: "_processTransaction",
    value: function _processTransaction(tr, broadcast) {
      var _this11 = this;

      return new Promise(function (resolve) {
        resolve(Promise.all([tr.update_head_block(), tr.set_required_fees()]).then(function () {
          if (!_this11.signProvider) {
            _this11.private_key && tr.add_signer(_index.PrivateKey.fromWif(_this11.private_key));
          }

          tr.set_expire_seconds(_const.DEFUALT_EXPIRE_SEC);

          if (broadcast) {
            return tr.broadcast();
          } else {
            return tr.finalize().then(function () {
              return tr.sign().then(function () {
                return tr.serialize();
              });
            });
          }
        }));
      });
    }
    /**
     * broadcast transaction
     * @param {TransactionBuilder} tx
     * @returns {Promise<any>}
     */

  }, {
    key: "broadcast",
    value: function broadcast(tx) {
      return this.rpc.broadcast(tx);
    }
  }]);

  return GXClient;
}();

var _default = GXClient;
exports.default = _default;