"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _gxbjs = require("gxbjs");

var _tx_serializer = require("gxbjs/dist/tx_serializer");

var _TransactionBuilder = require("./TransactionBuilder");

var _TransactionBuilder2 = _interopRequireDefault(_TransactionBuilder);

var _bip = require("bip39");

var _bip2 = _interopRequireDefault(_bip);

var _uniq = require("lodash/uniq");

var _uniq2 = _interopRequireDefault(_uniq);

var _const = require("../const/const");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _GXRPC = require("./GXRPC");

var _GXRPC2 = _interopRequireDefault(_GXRPC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GXClient = function () {
    function GXClient(private_key, account_id_or_name) {
        var entry_point = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "wss://node1.gxb.io";
        var signProvider = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        (0, _classCallCheck3.default)(this, GXClient);

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
        this.rpc = _GXRPC2.default.instance(this.host);
    }

    (0, _createClass3.default)(GXClient, [{
        key: "generateKey",
        value: function generateKey(brainKey) {
            brainKey = brainKey || _bip2.default.generateMnemonic();
            var privateKey = _gxbjs.key.get_brainPrivateKey(brainKey);
            var publicKey = privateKey.toPublicKey().toPublicKeyString();
            return {
                brainKey: brainKey,
                privateKey: privateKey.toWif(),
                publicKey: publicKey
            };
        }
    }, {
        key: "privateToPublic",
        value: function privateToPublic(privateKey) {
            return _gxbjs.PrivateKey.fromWif(privateKey).toPublicKey().toPublicKeyString();
        }
    }, {
        key: "isValidPublic",
        value: function isValidPublic(publicKey) {
            return !!_gxbjs.PublicKey.fromPublicKeyString(publicKey);
        }
    }, {
        key: "isValidPrivate",
        value: function isValidPrivate(privateKey) {
            try {
                return !!_gxbjs.PrivateKey.fromWif(privateKey);
            } catch (ex) {
                return false;
            }
        }
    }, {
        key: "register",
        value: function register(account, activeKey, ownerKey, memoKey) {
            var faucet = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "https://opengateway.gxb.io";

            return new _promise2.default(function (resolve, reject) {
                if (!activeKey) {
                    reject(new Error("active key is required"));
                } else {
                    _axios2.default.post(faucet + "/account/register", {
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
    }, {
        key: "getObject",
        value: function getObject(object_id) {
            return this._query("get_objects", [[object_id]]).then(function (results) {
                return results[0];
            });
        }
    }, {
        key: "getObjects",
        value: function getObjects(object_ids) {
            return this._query("get_objects", [object_ids]);
        }
    }, {
        key: "getAccount",
        value: function getAccount(account_name) {
            return this._query("get_account_by_name", [account_name]);
        }
    }, {
        key: "getChainID",
        value: function getChainID() {
            return this._query("get_chain_id", []);
        }
    }, {
        key: "getDynamicGlobalProperties",
        value: function getDynamicGlobalProperties() {
            return this._query("get_dynamic_global_properties", []);
        }
    }, {
        key: "getAccountByPublicKey",
        value: function getAccountByPublicKey(publicKey) {
            return this._query("get_key_references", [[publicKey]]).then(function (results) {
                return (0, _uniq2.default)(results[0]);
            });
        }
    }, {
        key: "getAccountBalances",
        value: function getAccountBalances(account_name) {
            var _this2 = this;

            return new _promise2.default(function (resolve, reject) {
                _this2.getAccount(account_name).then(function (account) {
                    resolve(_this2._query("get_account_balances", [account.id, []]));
                }).catch(reject);
            });
        }
    }, {
        key: "getAsset",
        value: function getAsset(symbol) {
            return this._query("lookup_asset_symbols", [[symbol]]).then(function (assets) {
                return assets[0];
            });
        }
    }, {
        key: "getBlock",
        value: function getBlock(blockHeight) {
            return this._query("get_block", [blockHeight]);
        }
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
    }, {
        key: "transfer",
        value: function transfer(to, memo, amount_asset) {
            var _this4 = this;

            var broadcast = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

            var fee_symbol = options.fee_symbol;
            var memo_private = this.private_key;
            var isMemoProvider = false;

            if (typeof memo === "function") {
                isMemoProvider = true;
            }

            return new _promise2.default(function (resolve, reject) {
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

                        return _promise2.default.all(promises).then(function () {
                            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(results) {
                                var memo_object, fromAcc, toAcc, assetInfo, feeInfo, memo_from_public, memo_to_public, fromPrivate, nonce, tr;
                                return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                memo_object = void 0;
                                                fromAcc = results[0][0];
                                                toAcc = results[1];
                                                assetInfo = results[2];
                                                feeInfo = results[3] || {};

                                                if (toAcc) {
                                                    _context.next = 7;
                                                    break;
                                                }

                                                throw new Error("Account " + to + " not exist");

                                            case 7:
                                                if (assetInfo) {
                                                    _context.next = 9;
                                                    break;
                                                }

                                                throw new Error("Asset " + asset + " not exist");

                                            case 9:
                                                amount = {
                                                    amount: _this4._accMult(amount, Math.pow(10, assetInfo.precision)),
                                                    asset_id: assetInfo.id
                                                };

                                                if (isMemoProvider) {
                                                    _context.next = 23;
                                                    break;
                                                }

                                                memo_from_public = void 0, memo_to_public = void 0;

                                                if (!memo) {
                                                    _context.next = 20;
                                                    break;
                                                }

                                                memo_from_public = fromAcc.options.memo_key;

                                                if (/111111111111111111111/.test(memo_from_public)) {
                                                    memo_from_public = null;
                                                }

                                                memo_to_public = toAcc.options.memo_key;
                                                if (/111111111111111111111/.test(memo_to_public)) {
                                                    memo_to_public = null;
                                                }
                                                fromPrivate = _gxbjs.PrivateKey.fromWif(memo_private);

                                                if (!(memo_from_public != fromPrivate.toPublicKey().toPublicKeyString())) {
                                                    _context.next = 20;
                                                    break;
                                                }

                                                throw new Error("memo signer not exist");

                                            case 20:

                                                if (memo && memo_to_public && memo_from_public) {
                                                    nonce = _gxbjs.TransactionHelper.unique_nonce_uint64();

                                                    memo_object = {
                                                        from: memo_from_public,
                                                        to: memo_to_public,
                                                        nonce: nonce,
                                                        message: _gxbjs.Aes.encrypt_with_checksum(_gxbjs.PrivateKey.fromWif(memo_private), memo_to_public, nonce, new Buffer(memo, "utf-8"))
                                                    };
                                                }
                                                _context.next = 33;
                                                break;

                                            case 23:
                                                _context.prev = 23;
                                                _context.next = 26;
                                                return memo(fromAcc, toAcc);

                                            case 26:
                                                memo_object = _context.sent;
                                                _context.next = 33;
                                                break;

                                            case 29:
                                                _context.prev = 29;
                                                _context.t0 = _context["catch"](23);

                                                reject(_context.t0);
                                                return _context.abrupt("return");

                                            case 33:
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

                                            case 36:
                                            case "end":
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this4, [[23, 29]]);
                            }));

                            return function (_x6) {
                                return _ref.apply(this, arguments);
                            };
                        }());
                    }));
                }
            });
        }
    }, {
        key: "getContractABI",
        value: function getContractABI(contract_name) {
            return this.getAccount(contract_name).then(function (acc) {
                return acc.abi;
            });
        }
    }, {
        key: "getContractTable",
        value: function getContractTable(contract_name) {
            return this.getAccount(contract_name).then(function (acc) {
                return acc.abi && acc.abi.tables;
            });
        }
    }, {
        key: "getTableObjects",
        value: function getTableObjects(contract_name, table_name) {
            var _this5 = this;

            var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;

            return this.getAccount(contract_name).then(function (acc) {
                if (acc) {
                    var contract_id = (0, _gxbjs.object_id_type)(acc.id).toString();
                    return _this5._query("get_table_objects", [contract_id, contract_id, (0, _gxbjs.string_to_name)(table_name).toString(), start, -1, limit]);
                } else {
                    throw new Error("Contract not found");
                }
            });
        }
    }, {
        key: "createContract",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(contract_name, code, abi) {
                var vm_type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "0";
                var vm_version = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "0";

                var _this6 = this;

                var broadcast = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
                var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
                var fee_symbol, feeInfo;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                fee_symbol = options.fee_symbol;
                                feeInfo = {};

                                if (!fee_symbol) {
                                    _context2.next = 6;
                                    break;
                                }

                                _context2.next = 5;
                                return this.getAsset(fee_symbol);

                            case 5:
                                feeInfo = _context2.sent;

                            case 6:
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

                            case 7:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function createContract(_x9, _x10, _x11) {
                return _ref2.apply(this, arguments);
            }

            return createContract;
        }()
    }, {
        key: "updateContract",
        value: function updateContract(contract_name, newOwner, code, abi) {
            var _this7 = this;

            var broadcast = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
            var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

            var fee_symbol = options.fee_symbol;
            return this._connect().then((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                var feeInfo, promises;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
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
                                return _context3.abrupt("return", _promise2.default.all(promises).then(function (results) {
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
                }, _callee3, _this7);
            })));
        }
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

                return _promise2.default.all(promises).then(function (results) {
                    var acc = results[0];
                    var assetInfo = results[1];
                    var feeInfo = results[2] || {};
                    if (!assetInfo) {
                        throw new Error("Asset " + asset + " not exist");
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
    }, {
        key: "vote",
        value: function vote() {
            var accounts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var _this9 = this;

            var fee_symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GXC";
            var broadcast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            return new _promise2.default(function (resolve) {
                resolve(_this9._connect().then(function () {
                    var accountPromises = accounts.map(function (a) {
                        return _this9.getAccount(a);
                    });
                    return _promise2.default.all(accountPromises).then(function (accounts) {
                        var account_ids = accounts.map(function (a) {
                            return a.id;
                        });
                        return _promise2.default.all([_this9._query("get_objects", [[_this9.account_id, "2.0.0"]]), _this9.getAsset(fee_symbol)]).then(function (results) {
                            var acc = results[0][0];
                            var globalObject = results[0][1];
                            var fee_asset = results[1];
                            if (!acc) {
                                throw Error("account_id " + _this9.account_id + " not exist");
                            }
                            if (!fee_asset) {
                                throw Error("asset " + fee_symbol + " not exist");
                            }

                            var new_options = {
                                memo_key: acc.options.memo_key,
                                voting_account: acc.options.voting_account || "1.2.5"
                            };

                            var promises = [];

                            account_ids.forEach(function (account_id) {
                                promises.push(_this9._query("get_witness_by_account", [account_id]));
                                promises.push(_this9._query("get_committee_member_by_account", [account_id]));
                            });

                            return _promise2.default.all(promises).then(function (results) {
                                var votes = results.filter(function (r) {
                                    return r;
                                }).map(function (r) {
                                    return r.vote_id;
                                });

                                new_options.votes = (0, _uniq2.default)(votes.concat(acc.options.votes));

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
    }, {
        key: "fee",
        value: function fee(operation) {
            var feeAssetId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "1.3.1";

            return this._query("get_required_fees", [operation, feeAssetId]);
        }
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
    }, {
        key: "_connect",
        value: function _connect() {
            var _this10 = this;

            return new _promise2.default(function (resolve) {
                if (_this10.connected) {
                    resolve();
                } else {
                    resolve(_promise2.default.all([_this10.getAccount(_this10.account), _this10.getChainID()]).then(function (results) {
                        var acc = results[0];
                        _this10.chain_id = results[1];
                        _this10.account_id = acc.id;
                        _this10.connected = true;
                        return;
                    }));
                }
            });
        }
    }, {
        key: "_query",
        value: function _query(method, params) {
            return this.rpc.query(method, params);
        }
    }, {
        key: "_createTransaction",
        value: function _createTransaction() {
            var tr = null;
            if (!this.connected) {
                throw new Error("_createTransaction have to be invoked after _connect()");
            }
            if (this.signProvider) {
                tr = new _TransactionBuilder2.default(this.signProvider, this.rpc, this.chain_id);
            } else {
                tr = new _TransactionBuilder2.default(null, this.rpc, this.chain_id);
            }

            return tr;
        }
    }, {
        key: "_processTransaction",
        value: function _processTransaction(tr, broadcast) {
            var _this11 = this;

            return new _promise2.default(function (resolve) {
                resolve(_promise2.default.all([tr.update_head_block(), tr.set_required_fees()]).then(function () {
                    if (!_this11.signProvider) {
                        _this11.private_key && tr.add_signer(_gxbjs.PrivateKey.fromWif(_this11.private_key));
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
    }, {
        key: "broadcast",
        value: function broadcast(tx) {
            return this.rpc.broadcast(tx);
        }
    }]);
    return GXClient;
}();

exports.default = GXClient;