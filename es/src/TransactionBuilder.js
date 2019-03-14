"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assert = _interopRequireDefault(require("assert"));

var _index = require("gxbjs/dist/index");

var expire_in_secs = 15;
var expire_in_secs_proposal = 24 * 60 * 60;
var review_in_secs_committee = 24 * 60 * 60;
var head_block_time_string, committee_min_review;

var TransactionBuilder =
/*#__PURE__*/
function () {
  function TransactionBuilder() {
    var signProvider = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var rpc = arguments.length > 1 ? arguments[1] : undefined;
    var chain_id = arguments.length > 2 ? arguments[2] : undefined;
    (0, _classCallCheck2.default)(this, TransactionBuilder);

    if (!!signProvider) {
      // a function,first param is transaction instance,second is chain_id, must return array buffer like [buffer,buffer]
      this.signProvider = signProvider;
    }

    if (!!rpc) {
      this.rpc = rpc;
    }

    if (!!chain_id) {
      this.chain_id = chain_id;
    }

    this.ref_block_num = 0;
    this.ref_block_prefix = 0;
    this.expiration = 0;
    this.operations = [];
    this.signatures = [];
    this.signer_private_keys = []; // semi-private method bindings

    this._broadcast = _broadcast.bind(this);
  }
  /**
   @arg {string} name - like "transfer"
   @arg {object} operation - JSON matchching the operation's format
   */


  (0, _createClass2.default)(TransactionBuilder, [{
    key: "add_type_operation",
    value: function add_type_operation(name, operation) {
      this.add_operation(this.get_type_operation(name, operation));
      return;
    }
    /** Typically this is called automatically just prior to signing.  Once finalized this transaction can not be changed. */

  }, {
    key: "finalize",
    value: function finalize() {
      var _this = this;

      return new Promise(function (resolve) {
        if (_this.tr_buffer) {
          throw new Error("already finalized");
        }

        resolve(_this.rpc.query("get_objects", [["2.1.0"]]).then(function (r) {
          head_block_time_string = r[0].time;

          if (_this.expiration === 0) {
            _this.expiration = base_expiration_sec() + expire_in_secs;
          }

          _this.ref_block_num = r[0].head_block_number & 0xFFFF;
          _this.ref_block_prefix = Buffer.from(r[0].head_block_id, "hex").readUInt32LE(4);
          var iterable = _this.operations;

          for (var i = 0, op; i < iterable.length; i++) {
            op = iterable[i];

            if (op[1]["finalize"]) {
              op[1].finalize();
            }
          }

          _this.tr_buffer = _index.ops.transaction.toBuffer(_this);
        }));
      });
    }
    /** @return {string} hex transaction ID */

  }, {
    key: "id",
    value: function id() {
      if (!this.tr_buffer) {
        throw new Error("not finalized");
      }

      return _index.hash.sha256(this.tr_buffer).toString("hex").substring(0, 40);
    }
    /**
     Typically one will use {@link this.add_type_operation} instead.
     @arg {array} operation - [operation_id, operation]
     */

  }, {
    key: "add_operation",
    value: function add_operation(operation) {
      if (this.tr_buffer) {
        throw new Error("already finalized");
      }

      (0, _assert.default)(operation, "operation");

      if (!Array.isArray(operation)) {
        throw new Error("Expecting array [operation_id, operation]");
      }

      this.operations.push(operation);
      return;
    }
  }, {
    key: "get_type_operation",
    value: function get_type_operation(name, operation) {
      if (this.tr_buffer) {
        throw new Error("already finalized");
      }

      (0, _assert.default)(name, "name");
      (0, _assert.default)(operation, "operation");
      var _type = _index.ops[name];
      (0, _assert.default)(_type, "Unknown operation ".concat(name));
      var operation_id = _index.ChainTypes.operations[_type.operation_name];

      if (operation_id === undefined) {
        throw new Error("unknown operation: ".concat(_type.operation_name));
      }

      if (!operation.fee) {
        operation.fee = {
          amount: 0,
          asset_id: 1
        };
      }

      if (name === "proposal_create") {
        /*
        * Proposals involving the committee account require a review
        * period to be set, look for them here
        */
        var requiresReview = false,
            extraReview = 0;
        operation.proposed_ops.forEach(function (op) {
          var COMMITTE_ACCOUNT = 0;
          var key;

          switch (op.op[0]) {
            case 0:
              // transfer
              key = "from";
              break;

            case 6: //account_update

            case 17:
              // asset_settle
              key = "account";
              break;

            case 10: // asset_create

            case 11: // asset_update

            case 12: // asset_update_bitasset

            case 13: // asset_update_feed_producers

            case 14: // asset_issue

            case 18: // asset_global_settle

            case 43:
              // asset_claim_fees
              key = "issuer";
              break;

            case 15:
              // asset_reserve
              key = "payer";
              break;

            case 16:
              // asset_fund_fee_pool
              key = "from_account";
              break;

            case 22: // proposal_create

            case 23: // proposal_update

            case 24:
              // proposal_delete
              key = "fee_paying_account";
              break;

            case 31:
              // committee_member_update_global_parameters
              requiresReview = true;
              extraReview = 60 * 60 * 24 * 13; // Make the review period 2 weeks total

              break;
          }

          if (key in op.op[1] && op.op[1][key] === COMMITTE_ACCOUNT) {
            requiresReview = true;
          }
        });
        operation.expiration_time || (operation.expiration_time = base_expiration_sec() + expire_in_secs_proposal);

        if (requiresReview) {
          operation.review_period_seconds = extraReview + Math.max(committee_min_review, review_in_secs_committee);
          /*
          * Expiration time must be at least equal to
          * now + review_period_seconds, so we add one hour to make sure
          */

          operation.expiration_time += 60 * 60 + extraReview;
        }
      }

      var operation_instance = _type.fromObject(operation);

      return [operation_id, operation_instance];
    }
    /* optional: fetch the current head block */

  }, {
    key: "update_head_block",
    value: function update_head_block() {
      return Promise.all([this.rpc.query("get_objects", [["2.0.0"]]), this.rpc.query("get_objects", [["2.1.0"]])]).then(function (res) {
        var _res = (0, _slicedToArray2.default)(res, 2),
            g = _res[0],
            r = _res[1];

        head_block_time_string = r[0].time;
        committee_min_review = g[0].parameters.committee_proposal_review_period;
      });
    }
    /** optional: there is a deafult expiration */

  }, {
    key: "set_expire_seconds",
    value: function set_expire_seconds(sec) {
      if (this.tr_buffer) {
        throw new Error("already finalized");
      }

      return this.expiration = base_expiration_sec() + sec;
    }
    /* Wraps this transaction in a proposal_create transaction */

  }, {
    key: "propose",
    value: function propose(proposal_create_options) {
      if (this.tr_buffer) {
        throw new Error("already finalized");
      }

      if (!this.operations.length) {
        throw new Error("add operation first");
      }

      (0, _assert.default)(proposal_create_options, "proposal_create_options");
      (0, _assert.default)(proposal_create_options.fee_paying_account, "proposal_create_options.fee_paying_account");
      var proposed_ops = this.operations.map(function (op) {
        return {
          op: op
        };
      });
      this.operations = [];
      this.signatures = [];
      this.signer_private_keys = [];
      proposal_create_options.proposed_ops = proposed_ops;
      this.add_type_operation("proposal_create", proposal_create_options);
      return this;
    }
    /** optional: the fees can be obtained from the witness node */

  }, {
    key: "set_required_fees",
    value: function set_required_fees(asset_id) {
      var _this2 = this;

      var fee_pool;

      if (this.tr_buffer) {
        throw new Error("already finalized");
      }

      if (!this.operations.length) {
        throw new Error("add operations first");
      }

      var operations = [];

      for (var i = 0, op; i < this.operations.length; i++) {
        op = this.operations[i];
        operations.push(_index.ops.operation.toObject(op));
      }

      if (!asset_id) {
        var op1_fee = operations[0][1].fee;

        if (op1_fee && op1_fee.asset_id !== null) {
          asset_id = op1_fee.asset_id;
        } else {
          asset_id = "1.3.1";
        }
      }

      var promises = [this.rpc.query("get_required_fees", [operations, asset_id])];
      var feeAssetPromise = null;

      if (asset_id !== "1.3.1") {
        // This handles the fallback to paying fees in BTS if the fee pool is empty.
        promises.push(this.rpc.query("get_required_fees", [operations, "1.3.1"]));
        promises.push(this.rpc.query("get_objects", [[asset_id]]));
      }

      return Promise.all(promises).then(function (results) {
        var _results = (0, _slicedToArray2.default)(results, 3),
            fees = _results[0],
            coreFees = _results[1],
            asset = _results[2];

        asset = asset ? asset[0] : null;
        var dynamicPromise = asset_id !== "1.3.1" && asset ? _this2.rpc.query("get_objects", [[asset.dynamic_asset_data_id]]) : new Promise(function (resolve, reject) {
          resolve();
        });
        return dynamicPromise.then(function (dynamicObject) {
          if (asset_id !== "1.3.1") {
            fee_pool = dynamicObject ? dynamicObject[0].fee_pool : 0;
            var totalFees = 0;

            for (var j = 0, fee; j < coreFees.length; j++) {
              fee = coreFees[j];
              totalFees += fee.amount;
            }

            if (totalFees > parseInt(fee_pool, 10)) {
              fees = coreFees;
              asset_id = "1.3.1";
            }
          } // Proposed transactions need to be flattened


          var flat_assets = [];

          var flatten = function flatten(obj) {
            if (Array.isArray(obj)) {
              for (var k = 0, item; k < obj.length; k++) {
                item = obj[k];
                flatten(item);
              }
            } else {
              flat_assets.push(obj);
            }

            return;
          };

          flatten(fees);
          var asset_index = 0;

          var set_fee = function set_fee(operation) {
            if (!operation.fee || operation.fee.amount === 0 || operation.fee.amount.toString && operation.fee.amount.toString() === "0" // Long
            ) {
                operation.fee = flat_assets[asset_index]; // console.log("new operation.fee", operation.fee)
              } else {// console.log("old operation.fee", operation.fee)
              }

            asset_index++;

            if (operation.proposed_ops) {
              var result = [];

              for (var y = 0; y < operation.proposed_ops.length; y++) {
                result.push(set_fee(operation.proposed_ops[y].op[1]));
              }

              return result;
            }
          };

          for (var _i = 0; _i < _this2.operations.length; _i++) {
            set_fee(_this2.operations[_i][1]);
          }
        });
      });
    }
  }, {
    key: "add_signer",
    value: function add_signer(private_key) {
      var public_key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : private_key.toPublicKey();
      (0, _assert.default)(private_key.d, "required PrivateKey object");

      if (this.signed) {
        throw new Error("already signed");
      }

      if (!public_key.Q) {
        public_key = _index.PublicKey.fromPublicKeyString(public_key);
      } // prevent duplicates


      var spHex = private_key.toHex();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.signer_private_keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var sp = _step.value;
          if (sp[0].toHex() === spHex) return;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.signer_private_keys.push([private_key, public_key]);
    }
  }, {
    key: "sign",
    value: function sign() {
      var _this3 = this;

      return new Promise(
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(resolve, reject) {
          var end, i, _this3$signer_private, private_key, public_key, sig;

          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (_this3.tr_buffer) {
                    _context.next = 2;
                    break;
                  }

                  throw new Error("not finalized");

                case 2:
                  if (!_this3.signed) {
                    _context.next = 4;
                    break;
                  }

                  throw new Error("already signed");

                case 4:
                  if (_this3.signProvider) {
                    _context.next = 11;
                    break;
                  }

                  if (_this3.signer_private_keys.length) {
                    _context.next = 7;
                    break;
                  }

                  throw new Error("Transaction was not signed. Do you have a private key? [no_signers]");

                case 7:
                  end = _this3.signer_private_keys.length;

                  for (i = 0; 0 < end ? i < end : i > end; 0 < end ? i++ : i++) {
                    _this3$signer_private = (0, _slicedToArray2.default)(_this3.signer_private_keys[i], 2), private_key = _this3$signer_private[0], public_key = _this3$signer_private[1];
                    sig = _index.Signature.signBuffer(Buffer.concat([Buffer.from(_this3.chain_id, "hex"), _this3.tr_buffer]), private_key, public_key);

                    _this3.signatures.push(sig.toBuffer());
                  }

                  _context.next = 21;
                  break;

                case 11:
                  _context.prev = 11;
                  _context.next = 14;
                  return _this3.signProvider(_this3, _this3.chain_id);

                case 14:
                  _this3.signatures = _context.sent;
                  _context.next = 21;
                  break;

                case 17:
                  _context.prev = 17;
                  _context.t0 = _context["catch"](11);
                  reject(_context.t0);
                  return _context.abrupt("return");

                case 21:
                  _this3.signer_private_keys = [];
                  _this3.signed = true;
                  resolve();

                case 24:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[11, 17]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "serialize",
    value: function serialize() {
      return _index.ops.signed_transaction.toObject(this);
    }
  }, {
    key: "toObject",
    value: function toObject() {
      return _index.ops.signed_transaction.toObject(this);
    }
  }, {
    key: "broadcast",
    value: function broadcast() {
      var _this4 = this;

      if (this.tr_buffer) {
        return this._broadcast();
      } else {
        return this.finalize().then(function () {
          return _this4._broadcast();
        });
      }
    }
  }]);
  return TransactionBuilder;
}();

var base_expiration_sec = function base_expiration_sec() {
  var head_block_sec = Math.ceil(getHeadBlockDate().getTime() / 1000);
  var now_sec = Math.ceil(Date.now() / 1000); // The head block time should be updated every 3 seconds.  If it isn't
  // then help the transaction to expire (use head_block_sec)

  if (now_sec - head_block_sec > 30) {
    return head_block_sec;
  } // If the user's clock is very far behind, use the head block time.


  return Math.max(now_sec, head_block_sec);
};

function _broadcast() {
  var _this5 = this;

  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(resolve, reject) {
      var tr_object;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              if (_this5.signed) {
                _context2.next = 4;
                break;
              }

              _context2.next = 4;
              return _this5.sign();

            case 4:
              _context2.next = 10;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              reject(_context2.t0);
              return _context2.abrupt("return");

            case 10:
              if (_this5.tr_buffer) {
                _context2.next = 12;
                break;
              }

              throw new Error("not finalized");

            case 12:
              if (_this5.signatures.length) {
                _context2.next = 14;
                break;
              }

              throw new Error("not signed");

            case 14:
              if (_this5.operations.length) {
                _context2.next = 16;
                break;
              }

              throw new Error("no operations");

            case 16:
              tr_object = _index.ops.signed_transaction.toObject(_this5);
              resolve(_this5.rpc.broadcast(tr_object).catch(function (error) {
                var message = error.message;

                if (!message) {
                  message = "";
                }

                throw new Error(message); // throw new Error((
                //     message + "\n" +
                //     "gxb-crypto " +
                //     " digest " + hash.sha256(this.tr_buffer).toString("hex") +
                //     " transaction " + this.tr_buffer.toString("hex") +
                //     " " + JSON.stringify(tr_object)));
              }));

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
}

function getHeadBlockDate() {
  return timeStringToDate(head_block_time_string);
}

function timeStringToDate(time_string) {
  if (!time_string) return new Date("1970-01-01T00:00:00.000Z");
  if (!/Z$/.test(time_string)) //does not end in Z
    // https://github.com/cryptonomex/graphene/issues/368
    time_string = time_string + "Z";
  return new Date(time_string);
}

var _default = TransactionBuilder;
exports.default = _default;