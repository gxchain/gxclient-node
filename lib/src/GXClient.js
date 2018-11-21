import { Apis } from "gxbjs-ws";
import {
    Aes, key, object_id_type, PrivateKey, PublicKey, string_to_name, TransactionBuilder,
    TransactionHelper
} from "gxbjs";
import superagent from "superagent";
import dictionary from "./dictionary";
import { serializeCallData } from "gxc-frontend-base/build/script/util/serializer";
import uniq from "lodash/uniq";
import {DEFUALT_EXPIRE_SEC} from '../const/const';

let callID = 1;

const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

class GXClient {

    constructor(private_key, account_id, witness = "wss://node1.gxb.io", signProvider = null) {
        this.private_key = private_key;
        this.account_id = account_id;
        this.witness = witness;
        this.signProvider = signProvider;
        this.host = this.witness.replace("wss://", "https://").replace("ws://", "http://");
    }

    _connect() {
        return new Promise((resolve, reject) => {
            if (this.connected) {
                resolve();
            } else {
                Apis.instance(this.witness, true).init_promise.then(() => {
                    this.connected = true;
                    Apis.setRpcConnectionStatusCallback((status) => {
                        if (status !== "open" && status !== "reconnect") {
                            this.connected = false;
                        }
                    });
                    resolve();
                }).catch(ex => {
                    this.connected = false;
                    console.error(ex);
                    Apis.close();
                    reject(ex);
                });
            }
        });
    }

    /**
     * generate key pair locally
     * @returns {{brainKey: *, privateKey: *, publicKey: *}}
     */
    generateKey(brainKey) {
        brainKey = brainKey || key.suggest_brain_key(dictionary); // generate a new brain key if not assigned
        let privateKey = key.get_brainPrivateKey(brainKey);
        let publicKey = privateKey.toPublicKey().toPublicKeyString();
        return {
            brainKey,
            privateKey: privateKey.toWif(),
            publicKey
        };
    }

    /**
     * export public key from private key
     * @param privateKey
     * @returns {*}
     */
    privateToPublic(privateKey) {
        return PrivateKey.fromWif(privateKey).toPublicKey().toPublicKeyString();
    }

    /**
     * check if public key is valid
     * @param publicKey
     * @returns {boolean}
     */
    isValidPublic(publicKey) {
        return !!PublicKey.fromPublicKeyString(publicKey);
    }

    /**
     * check if private key is valid
     * @param privateKey
     * @returns {boolean}
     */
    isValidPrivate(privateKey) {
        try {
            return !!PrivateKey.fromWif(privateKey);
        } catch (ex) {
            return false;
        }
    }

    /**
     * register an account by faucet
     * curl ‘https://opengateway.gxb.io/account/register' -H 'Content-type: application/json' -H 'Accept: application/json’ -d ‘{“account”:{“name”:”gxb123”,”owner_key”:”GXC5wQ4RtjouyobBV57vTx7boBj4Kt3BUxZEMsUD3TU369d3C9DqZ”,”active_key”:”GXC7cPVyB9F1Pfiaaxw4nY3xKADo5993hEsTjFs294LKwhqsUrFZs”,”memo_key”:”GXC7cPVyB9F1Pfiaaxw4nY3xKADo5993hEsTjFs294LKwhqsUrFZs”,”refcode”:null,”referrer”:null}}’
     * @param account <String> - Account name
     * @param activeKey <String> - Public Key for account operator
     * @param ownerKey <String> - Public Key for account owner
     * @param memoKey <String> - Public Key for memo
     * @param faucet
     * @returns {Promise<any>}
     */
    register(account, activeKey, ownerKey, memoKey, faucet = "https://opengateway.gxb.io") {
        return new Promise((resolve, reject) => {
            if (!activeKey) {
                reject(new Error("active key is required"));
            } else {

                superagent.post(`${faucet}/account/register`).send({
                    account: {
                        name: account,
                        active_key: activeKey,
                        owner_key: ownerKey || activeKey,
                        memo_key: memoKey || activeKey
                    }
                }).end((err, resp) => {
                    if (err) {
                        reject(JSON.parse(resp.text));
                    } else {
                        resolve(JSON.parse(resp.text));
                    }
                });
            }
        });
    }

    /**
     * fetching latest block each 3 seconds
     */
    _latestBlockTask(force) {
        if (this.isTaskStarted && !force) {
            return false;
        }

        this._query("get_objects", [["2.1.0"]]).then(objs => {
            try {
                let latestBlock = objs[0].last_irreversible_block_num;
                if (this.latestBlock !== latestBlock) {
                    this.latestBlock = latestBlock;
                    console.log("latest block:", this.latestBlock);
                }
            } catch (ex) {
                console.error("error when fetching block header,", ex);
            } finally {
                setTimeout(() => {
                    this._latestBlockTask(true);
                }, 3000);
            }
        });
    }

    /**
     * get object by id
     * @param object_id
     * @returns {Request|PromiseLike<T>|Promise<T>}
     */
    getObject(object_id) {
        return this._query("get_objects", [[object_id]]).then(results => results[0]);
    }

    /**
     * get account info by account name
     * @param account_name
     * @returns {Promise<any>}
     */
    getAccount(account_name) {
        return this._query("get_account_by_name", [account_name]);
    }

    /**
     * get account_ids by public key
     * @param publicKey
     * @returns {*}
     */
    getAccountByPublicKey(publicKey) {
        return this._query("get_key_references", [[publicKey]]).then(results => uniq(results[0]));
    }

    /**
     * get account balances by account name
     * @param account_name
     * @returns {Promise<any>}
     */
    getAccountBalances(account_name) {
        return new Promise((resolve, reject) => {
            this.getAccount(account_name).then((account) => {
                resolve(this._query("get_account_balances", [account.id, []]));
            }).catch(reject);
        });
    }

    /**
     * get asset info by symbol
     * @param symbol
     * @returns {Promise<any>}
     */
    getAsset(symbol) {
        return this._query("lookup_asset_symbols", [[symbol]]).then(assets => assets[0]);
    }

    /**
     * get block by block height
     * @param blockHeight
     * @returns {*}
     */
    getBlock(blockHeight) {
        return this._query("get_block", [blockHeight]);
    }

    /**
     * detect new transactions related to this.account_id
     * @param blockHeight
     * @param callback
     */
    detectTransaction(blockHeight, callback) {

        let detect = () => {
            this._connect().then(() => {
                this.getBlock(blockHeight).then(block => {
                    if (block) {
                        block.transactions.forEach((transaction, i) => {
                            let txid = block.transaction_ids[i];
                            transaction.operations.forEach((op) => {
                                let exist = false;
                                for (var key in op[1]) {
                                    let val = op[1][key];

                                    if (val === this.account_id) {
                                        exist = true;
                                    }
                                }
                                exist && callback && callback(blockHeight, txid, op);
                            });
                        });
                        if (blockHeight < this.latestBlock) {
                            process.nextTick(() => {
                                this.detectTransaction(blockHeight + 1, callback);
                            });
                        } else {
                            setTimeout(() => {
                                this.detectTransaction(blockHeight, callback);
                            }, 1000);
                        }
                    } else {
                        setTimeout(() => {
                            this.detectTransaction(blockHeight, callback);
                        }, 1000);
                    }
                }).catch(ex => {
                    console.error("get block error", ex);
                    setTimeout(() => {
                        this.detectTransaction(blockHeight, callback);
                    }, 1000);
                });
            }).catch(ex => {
                console.error("connect error:", ex);
                setTimeout(() => {
                    this.detectTransaction(blockHeight, callback);
                }, 1000);
            });
        };

        let taskPromise = this._latestBlockTask();
        if (taskPromise) {
            taskPromise.then(() => {
                detect();
            });
        } else {
            detect();
        }

    }

    /**
     * send transfer request to witness node
     * @param to
     * @param memo
     * @param asset_amount
     * @param broadcast
     * @returns {Promise<any>}
     */
    transfer(to, memo, asset_amount, broadcast = false) {
        let memo_private = this.private_key;
        let isMemoProvider = false;

        // if memo is function, it can receive fromAccount and toAccount, and should return a full memo object
        if (typeof memo === "function") {
            isMemoProvider = true;
        }

        return new Promise((resolve, reject) => {
            resolve(this._connect().then(() => {
                return Promise.all([Apis.instance().db_api().exec("get_objects", [[this.account_id]]), this.getAccount(to)]).then(async results => {
                    let memo_object;
                    let fromAcc = results[0][0];
                    let toAcc = results[1];
                    if (!toAcc) {
                        throw new Error("to account not exist");
                    }

                    if (!isMemoProvider) {
                        let memo_from_public, memo_to_public;
                        if (memo) {
                            memo_from_public = fromAcc.options.memo_key;

                            // The 1s are base58 for all zeros (null)
                            if (/111111111111111111111/.test(memo_from_public)) {
                                memo_from_public = null;
                            }

                            memo_to_public = toAcc.options.memo_key;
                            if (/111111111111111111111/.test(memo_to_public)) {
                                memo_to_public = null;
                            }
                            let fromPrivate = PrivateKey.fromWif(memo_private);
                            if (memo_from_public != fromPrivate.toPublicKey().toPublicKeyString()) {
                                throw new Error("memo signer not exist");
                            }
                        }

                        if (memo && memo_to_public && memo_from_public) {
                            let nonce = TransactionHelper.unique_nonce_uint64();
                            memo_object = {
                                from: memo_from_public,
                                to: memo_to_public,
                                nonce,
                                message: Aes.encrypt_with_checksum(
                                    PrivateKey.fromWif(memo_private),
                                    memo_to_public,
                                    nonce,
                                    new Buffer(memo, "utf-8")
                                )
                            };
                        }
                    } else {
                        try {
                            memo_object = await memo(fromAcc, toAcc);
                        } catch (err) {
                            reject(err);
                        }
                    }

                    let tr = this._createTransaction();

                    tr.add_operation(tr.get_type_operation("transfer", {
                        fee: {
                            amount: 0,
                            asset_id: asset_amount.asset_id
                        },
                        from: fromAcc.id,
                        to: toAcc.id,
                        amount: {
                            amount: this._accMult(asset_amount.amount, Math.pow(10, asset_amount.precision)),
                            asset_id: asset_amount.asset_id
                        },
                        memo: memo_object
                    }));
                    return this._processTransaction(tr, broadcast);
                });
            }));
        });
    }

    /**
     * get contract abi by contract_name
     * @param contract_name
     * @returns {Promise<any>}
     */
    getContractABI(contract_name) {
        return this.getAccount(contract_name).then(acc => acc.abi && acc.abi);
    }

    /**
     * get contract table by contract_name
     * @param contract_name
     * @returns {*}
     */
    getContractTable(contract_name) {
        return this.getAccount(contract_name).then(acc => acc.abi && acc.abi.tables);
    }

    /**
     * fetch contract table record by contract_name and table_name
     * @param contract_name
     * @param table_name
     * @param start
     * @param limit
     * @returns {Promise<any>}
     */
    getTableObjects(contract_name, table_name, start = 0, limit = 100) {
        return this.getAccount(contract_name).then(acc => {
            if (acc) {
                let contract_id = object_id_type(acc.id).toString();
                return this._query("get_table_objects", [contract_id, contract_id, string_to_name(table_name).toString(), start, start + limit, limit]);
            } else {
                throw new Error("Contract not found");
            }
        });
    }

    /**
     * deploy smart contract
     * @param contract_name
     * @param code
     * @param abi
     * @param vm_type
     * @param vm_version
     */
    createContract(contract_name, code, abi, vm_type = "0", vm_version = "0", broadcast = false) {
        return this._connect().then(() => {
            let tr = this._createTransaction();
            tr.add_operation(tr.get_type_operation("create_contract", {
                name: contract_name,
                account: this.account_id,
                vm_type,
                vm_version,
                code,
                abi
            }));
            return this._processTransaction(tr, broadcast);
        });
    }

    /**
     * update smart contract
     * @param contract_name
     * @param newOwner
     * @param code
     * @param abi
     * @param broadcast
     * @returns {Request|PromiseLike<T>|Promise<T>}
     */
    updateContract(contract_name, newOwner, code, abi, broadcast = false) {
        return this._connect().then(() => {
            let promises = [
                this.getAccount(contract_name)
            ];
            if (newOwner) {
                promises.push(this.getAccount(newOwner));
            }
            return Promise.all(promises).then(results => {
                let tr = this._createTransaction();
                let opt = {
                    owner: this.account_id,
                    contract: results[0].id,
                    code,
                    abi
                };
                if (newOwner) {
                    opt.newOwner = results[1].id;
                }
                tr.add_operation(tr.get_type_operation("update_contract", opt));
                return this._processTransaction(tr, broadcast);
            });
        });
    }

    /**
     * call smart contract method
     * @param contract_name {String} - The name of the smart contract
     * @param method_name {String} - Method/Action name
     * @param params {JSON} - parameters
     * @param amount {amount:u32,asset_id:"1.3.*"} - The amount of asset for payable action
     * @param broadcast {Boolean} - Broadcast the transaction or just return a serialized transaction
     * @returns {Promise<any>}
     */
    callContract(contract_name, method_name, params, amount, broadcast = false) {
        if (!amount) {
            amount = { amount: 0, asset_id: "1.3.1" };
        }
        return this._connect().then(() => {
            return this.getAccount(contract_name).then(acc => {
                if (acc) {
                    let abi = acc.abi;
                    let act = {
                        method_name: method_name,
                        data: serializeCallData(method_name, params, abi)
                    };

                    let tr = this._createTransaction();
                    let opts = {
                        "fee": {
                            "amount": 0,
                            "asset_id": amount.asset_id
                        },
                        "account": this.account_id,
                        "contract_id": acc.id,
                        "method_name": act.method_name,
                        "data": act.data
                    };

                    if (!!amount.amount) {
                        opts.amount = amount;
                    }
                    tr.add_operation(tr.get_type_operation("call_contract", opts));
                    return this._processTransaction(tr, broadcast);
                } else {
                    throw new Error("Contract not found");
                }
            });
        });
    }

    /**
     * vote for accounts
     * @param account_ids - An array of account_id to vote
     * @param fee_paying_asset - The asset to pay the fee
     * @param broadcast
     * @returns {Promise<any>}
     */
    vote(accounts, fee_paying_asset = "GXC", broadcast = false) {
        return new Promise((resolve) => {
            resolve(this._connect().then(() => {
                let accountPromises = accounts.map(a => this.getAccount(a));
                return Promise.all(accountPromises).then(accounts => {
                    let account_ids = accounts.map(a => a.id);
                    return Promise.all([this._query("get_objects", [[this.account_id, "2.0.0"]]), this.getAsset(fee_paying_asset)]).then(results => {
                        let acc = results[0][0];
                        let globalObject = results[0][1];
                        let fee_asset = results[1];
                        if (!acc) {
                            throw Error(`account_id ${this.account_id} not exist`);
                        }
                        if (!fee_asset) {
                            throw Error(`asset ${fee_paying_asset} not exist`);
                        }

                        let new_options = {
                            memo_key: acc.options.memo_key,
                            voting_account: acc.options.voting_account || "1.2.5"
                        };

                        let promises = [];

                        account_ids.forEach(account_id => {
                            promises.push(this._query("get_witness_by_account", [account_id]));
                            promises.push(this._query("get_committee_member_by_account", [account_id]));
                        });

                        // fetch vote_ids
                        return Promise.all(promises).then(results => {

                            // filter empty records since some of the account are not witness or committee
                            let votes = results.filter(r => r).map(r => r.vote_id);

                            // only merge you votes into current selections
                            // if you want cancel your votes, please operate it in your wallet
                            // eg. Visit https://wallet.gxb.io
                            new_options.votes = uniq(votes.concat(acc.options.votes));

                            let num_witness = 0;
                            let num_committee = 0;
                            new_options.votes.forEach(v => {
                                let vote_type = v.split(":")[0];
                                if (vote_type == "0") {
                                    num_committee += 1;
                                }
                                if (vote_type == 1) {
                                    num_witness += 1;
                                }
                            });
                            new_options.num_committee = Math.min(num_committee, globalObject.parameters.maximum_committee_count);
                            new_options.num_witness = Math.min(num_witness, globalObject.parameters.maximum_witness_count);
                            new_options.votes = new_options.votes.sort((a, b) => {
                                let a_split = a.split(":");
                                let b_split = b.split(":");
                                return parseInt(a_split[1]) - parseInt(b_split[1]);
                            });

                            let tr = this._createTransaction();

                            tr.add_operation(tr.get_type_operation("account_update", {
                                fee: {
                                    amount: 0,
                                    asset_id: fee_asset.id
                                },
                                account: this.account_id,
                                new_options: new_options,
                            }));

                            return this._processTransaction(tr, broadcast);
                        });
                    });
                });
            }));
        });
    }

    /**
     * calculate fee of a operation
     * @param operation
     * @param feeAssetId
     * @returns {Promise<any>}
     */
    fee(operation, feeAssetId = "1.3.1") {
        return this._query("get_required_fees", [operation, feeAssetId]);
    }

    async updateAccount(account) {
        if (/\d+\.\d+\.\d+/.test(account)) {
            return this.account_id = account;
        } else {
            const acc = await this._query('get_account_by_name', [account]);
            return this.account_id = acc.id;
        }
    }

    /**
     * accurate multiply - fix the accurate issue of javascript
     * @param arg1
     * @param arg2
     * @returns {number}
     */
    _accMult(arg1, arg2) {
        let m = 0;
        let s1 = arg1.toString();
        let s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        } catch (e) {
        }
        try {
            m += s2.split(".")[1].length;
        } catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }

    _query(method, params) {
        return new Promise((resolve, reject) => {
            if (!isBrowser) {
                superagent.post(this.host).send({
                    jsonrpc: "2.0",
                    method: method,
                    params: params,
                    id: ++callID
                }).end((err, resp) => {
                    if (err) {
                        reject(err);
                    } else {
                        let body = JSON.parse(resp.text);
                        resolve(body.result);
                    }
                });
            } else {
                resolve(this._connect().then(() => {
                    return Apis.instance().db_api().exec(method, params);
                }));
            }
        });
    }

    _createTransaction() {
        let tr = null;
        if (this.signProvider) {
            tr = new TransactionBuilder(this.signProvider);
        } else {
            tr = new TransactionBuilder();
        }

        return tr;
    }

    /**
     * process transaction
     * @param tr
     * @param broadcast
     * @returns {Promise<any[]>}
     */
    _processTransaction(tr, broadcast) {
        return new Promise((resolve) => {
            resolve(Promise.all([tr.update_head_block(), tr.set_required_fees()]).then(() => {
                tr.set_expire_seconds(DEFUALT_EXPIRE_SEC);
                if (!this.signProvider) {
                    this.private_key && tr.add_signer(PrivateKey.fromWif(this.private_key));
                }
                if (broadcast) {
                    return tr.broadcast();
                } else {
                    return tr.finalize().then(() => {
                        return tr.serialize();
                    });
                }
            }));
        });
    }
}

export default GXClient;
