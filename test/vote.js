// export PVK="xxxx" && export account="xxxx" && npm run test -- ./test/transfer
import { GXClient } from "../lib";
import { assert } from "chai";

const private_key = process.env.PVK;
const account = process.env.ACCOUNT;
let client;

if (!private_key || !account) {
    throw new Error("需要设置环境变量account和PVK");
}

describe("vote", () => {
    before(function () {
        client = new GXClient(private_key, account, "wss://testnet.gxchain.org");
    });

    it("vote", () => {
        return new Promise((resolve, reject) => {
            client.vote(["math-wallet-test", "gxc-pacific"], true).then(resp => {
                resolve(resp);
            }).catch(ex => {
                reject(ex);
            });
        });
    });

    it("vote with custom fee", () => {
        return new Promise((resolve, reject) => {
            client.vote(["math-wallet-test", "gxc-pacific"], true, { fee_symbol: "BTC" }).then(resp => {
                resolve(assert.equal(resp[0].trx.operations[0][1].fee.asset_id, "1.3.4"));
            }).catch(ex => {
                reject(ex);
            });
        });
    });
});
