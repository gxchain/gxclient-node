// export PVK="xxxx" && export account="xxxx" && npm run test -- ./test/transfer
import { GXClient } from "../lib";
import {
    Aes, PrivateKey,
    TransactionHelper
} from "gxbjs";

const private_key = process.env.PVK;
const account = process.env.ACCOUNT;
const asset_precicion = 5;
let client;

if (!private_key || !account) {
    throw new Error("需要设置环境变量account和PVK");
}

describe("transfer", () => {
    before(function () {
        client = new GXClient(private_key, account, "wss://testnet.gxchain.org");
    });

    it("transfer without memo", () => {
        return new Promise((resolve, reject) => {
            client.transfer("youxiu123", "", "0.5 GXC", true).then(resp => {
                resolve();
                // > txid: f28d27ac74649a76f58c9b84fb7ea700163e31c4 fee: 0.0118
                // Since gxchain implemented dpos consensus, the transaction will be confirmed until the block becomes irreversible
                // You can find the logic when a transfer operation was confirmed in the example of detectTransaction
            }).catch(ex => {
                reject(ex);
            });
        });
    });

    it("transfer with memo", () => {
        return new Promise((resolve, reject) => {
            debugger;
            client.transfer("youxiu123", "hahah", "0.5 GXC", true).then(resp => {
                resolve();
                // > txid: f28d27ac74649a76f58c9b84fb7ea700163e31c4 fee: 0.0118
                // Since gxchain implemented dpos consensus, the transaction will be confirmed until the block becomes irreversible
                // You can find the logic when a transfer operation was confirmed in the example of detectTransaction
            }).catch(ex => {
                reject(ex);
            });
        });
    });

    it("transfer with memoProvider", () => {
        function memoProvider(memo) {
            return function (fromAcc, toAcc) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        let memo_private = private_key;
                        let memo_from_public, memo_to_public;
                        let memo_object;
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

                        resolve(memo_object);
                    }, 1000);
                });
            };
        }

        return new Promise((resolve, reject) => {
            client.transfer("youxiu123", memoProvider("memo"), "0.5 GXC", true).then(resp => {
                resolve();
                // > txid: f28d27ac74649a76f58c9b84fb7ea700163e31c4 fee: 0.0118
                // Since gxchain implemented dpos consensus, the transaction will be confirmed until the block becomes irreversible
                // You can find the logic when a transfer operation was confirmed in the example of detectTransaction
            }).catch(ex => {
                reject(ex);
            });
        });
    });

    it("transfer with custom fee", () => {
        return new Promise((resolve, reject) => {
            client.transfer("youxiu123", "hahah", "0.5 GXC", true, { fee_symbol: "GXC" }).then(resp => {
                resolve();
            }).catch(ex => {
                reject(ex);
            });
        });
    });


});
