import {Apis} from "gxbjs-ws";
import {PrivateKey, TransactionBuilder, TransactionHelper} from "gxbjs";
import superagent from "superagent";

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

    getLatestBlock() {
        let host = this.witness.replace("wss://", "https://").replace("ws://", "http://");
        superagent.get(`${host}/rpc`, {
            params: {
                jsonrpc: "2.0",
                method: "get_objects",
                params: [["2.1.0"]],
                id: 0
            }
        }).end(resp => {
            let result = resp.data;
            console.log(result);
            setTimeout(() => {
                this.getLatestBlock();
            }, 3000);
        }).catch(ex => {
            console.error("error when get latest block:", ex);
            setTimeout(() => {
                this.getLatestBlock();
            }, 3000);
        });
    }

    detectTransaction(block_height, callback) {
        this.connect().then(() => {
            this.get_block(block_height).then(block => {
                if (block) {
                    block.transactions.forEach((transaction, i) => {
                        let txid = block.txids[i];
                        let related = false;
                        transaction.operations.forEach((op) => {
                            for (var key in op) {
                                let val = op[key];
                                if (val === this.account_id) {
                                    related = true;
                                }
                            }
                        });
                        if (related) {
                            callback(block_height, txid, transaction);
                        }
                    });
                    if (block_height < this.latest_block) {
                        process.nextTick(() => {
                            this.detectTransaction(block_height + 1, callback);
                        });
                    } else {
                        setTimeout(() => {
                            this.detectTransaction(block_height, callback);
                        }, 1000);
                    }
                } else {
                    setTimeout(() => {
                        this.detectTransaction(block_height, callback);
                    }, 1000);
                }
            }).catch(ex => {
                console.error("get block error", ex);
                setTimeout(() => {
                    this.detectTransaction(block_height, callback);
                }, 1000);
            });
        }).catch(ex => {
            console.error("connect error:", ex);
            setTimeout(() => {
                this.detectTransaction(block_height, callback);
            }, 1000);
        });
    }

    get_block(block_height) {
        return new Promise((resolve, reject) => {
            Apis.instance().db_api.exec("get_block", [block_height]).then(resp => {
                resolve(resp && resp.length ? resp[0] : null);
            }).catch(ex => {
                reject(ex);
            });
        });
    }

    transfer(to, memo, asset_amount, broadcast = false) {
        return new Promise((resolve, reject) => {
            resolve(this.fetch_account(to).then(results => {
                let fromAcc = results[0];
                if (!fromAcc) {
                    throw new Error("from account not exist");
                }
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
                    let fromPrivate = PrivateKey.fromWif(results[2].wifKey);
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
                            PrivateKey.fromWif(results[2].wifKey),
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
                        asset_id: fee_id
                    },
                    from: fromAcc.id,
                    to: toAcc.id,
                    amount: {amount: this.accMult(amount, Math.pow(10, asset.precision)), asset_id: asset.id},
                    memo: memo_object
                }));
                return this.process_transaction(tr, broadcast);
            }));
        });
    }

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

    fetch_account(account_name) {
        return Apis.instance().db_api().exec("get_account_by_name", [account_name]);
    };

    process_transaction(tr, broadcast) {
        return Promise.all([tr.update_head_block(), tr.set_required_fees()]).then(() => {
            tr.add_signer(PrivateKey.fromWif(this.private_key));
            if (broadcast) {
                return tr.broadcast();
            } else {
                return tr;
            }
        });
    }
}

export default GXClient;
