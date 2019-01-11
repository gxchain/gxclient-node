// export PVK="xxxx" && export ACCOUNT_ID="xxxx" && npm run test -- ./test/transfer
import { GXClient } from "../lib";
import wasm from './static/wasm'
import abi from './static/abi'

const private_key = process.env.PVK;
const account = process.env.ACCOUNT;
let client;

if (!private_key || !account) {
    throw new Error("需要设置环境变量ACCOUNT和PVK");
}

describe("updateContract", () => {
    before(function () {
        client = new GXClient(private_key, account, "wss://testnet.gxchain.org");
    });

    it("updateContract", () => {
        return new Promise((resolve, reject) => {
            client.updateContract("heyue123", "", wasm, abi, true).then(resp => {
                resolve();
                console.lot(resp)
            }).catch(ex => {
                reject(ex);
            });
        });
    });
});
