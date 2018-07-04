import {Apis} from "gxbjs-ws";
import {Aes, key, PrivateKey, TransactionBuilder, TransactionHelper} from "gxbjs";
import superagent from "superagent";
import dictionary from "./dictionary";

class GXClient {

    constructor(private_key, account_id, witness = "wss://node1.gxb.io") {
        this.private_key = private_key;
        this.account_id = account_id;
        this.witness = witness;
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (this.connected) {
                resolve();
            } else {
                Apis.reset(this.witness, true).init_promise.then(() => {
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
     * register an account by faucet
     * curl ‘https://opengateway.gxb.io/account/register' -H 'Content-type: application/json' -H 'Accept: application/json’ -d ‘{“account”:{“name”:”gxb123”,”owner_key”:”GXC5wQ4RtjouyobBV57vTx7boBj4Kt3BUxZEMsUD3TU369d3C9DqZ”,”active_key”:”GXC7cPVyB9F1Pfiaaxw4nY3xKADo5993hEsTjFs294LKwhqsUrFZs”,”memo_key”:”GXC7cPVyB9F1Pfiaaxw4nY3xKADo5993hEsTjFs294LKwhqsUrFZs”,”refcode”:null,”referrer”:null}}’
     * @param account:String
     * @param activeKey:PublicKey
     * @param ownerKey:PublicKey
     * @param memoKey:PublicKey
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
    latestBlockTask() {
        let host = this.witness.replace("wss://", "https://").replace("ws://", "http://");
        superagent.post(host).send({
            jsonrpc: "2.0",
            method: "get_objects",
            params: [["2.1.0"]],
            id: 1
        }).end((err, resp) => {
            let body = JSON.parse(resp.text);
            let latestBlock = body.result[0].last_irreversible_block_num;
            if (this.latestBlock !== latestBlock) {
                this.latestBlock = latestBlock;
                console.log("latest block:", this.latestBlock);
            }
            setTimeout(() => {
                this.latestBlockTask();
            }, 3000);
        });
    }

    /**
     * get block by block height
     * @param blockHeight
     * @returns {RegExpExecArray | null}
     */
    getBlock(blockHeight) {
        return Apis.instance().db_api().exec("get_block", [blockHeight]);
    }

    /**
     * detect new transactions related to this.account_id
     * @param blockHeight
     * @param callback
     */
    detectTransaction(blockHeight, callback) {
        this.connect().then(() => {
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
        return new Promise((resolve, reject) => {
            resolve(this.connect().then(() => {
                return Promise.all([Apis.instance().db_api().exec("get_objects", [[this.account_id]]), this.fetchAccount(to)]).then(results => {
                    let fromAcc = results[0][0];
                    let toAcc = results[1];
                    if (!toAcc) {
                        throw new Error("to account not exist");
                    }

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

                    let memo_object;
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

                    let tr = new TransactionBuilder();
                    tr.add_operation(tr.get_type_operation("transfer", {
                        fee: {
                            amount: 0,
                            asset_id: asset_amount.asset_id
                        },
                        from: fromAcc.id,
                        to: toAcc.id,
                        amount: {
                            amount: this.accMult(asset_amount.amount, Math.pow(10, asset_amount.precision)),
                            asset_id: asset_amount.asset_id
                        },
                        memo: memo_object
                    }));
                    return this.processTransaction(tr, broadcast);
                });
            }));
        });
    }

    fee (operation,feeAssetId = "1.3.1"){
        Apis.instance().db_api().exec("get_required_fees", [operation, feeAssetId])
    }

    /**
     * accurate multiply - fix the accurate issue of javascript
     * @param arg1
     * @param arg2
     * @returns {number}
     */
    accMult(arg1, arg2) {
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

    /**
     * fetch account by name
     * @param account_name
     * @returns {RegExpExecArray | null}
     */
    fetchAccount(account_name) {
        return Apis.instance().db_api().exec("get_account_by_name", [account_name]);
    }

    /**
     * process transaction
     * @param tr
     * @param broadcast
     * @returns {Promise<any[]>}
     */
    processTransaction(tr, broadcast) {
        return new Promise((resolve) => {
            resolve(Promise.all([tr.update_head_block(), tr.set_required_fees()]).then(() => {
                tr.add_signer(PrivateKey.fromWif(this.private_key));
                if (broadcast) {
                    return tr.broadcast();
                } else {
                    return tr.serialize();
                }
            }));
        });
    }
}

export default GXClient;
