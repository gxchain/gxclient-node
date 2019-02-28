// export PVK="xxxx" && export ACCOUNT_ID="xxxx" && npm run test -- ./test/transfer
import { GXClient } from "../lib";
import wasm from "./static/wasm";
import wasm2 from "./static/wasm2";
import abi from "./static/abi";
import abi2 from "./static/abi2";
import { assert } from "chai";

const private_key = process.env.PVK;
const account = process.env.ACCOUNT;
let client;

if (!private_key || !account) {
    throw new Error("需要设置环境变量ACCOUNT和PVK");
}

describe("contract", () => {
    const contractName = "contract" + (new Date() - 1551339262635);
    before(function () {
        client = new GXClient(private_key, account, "wss://testnet.gxchain.org");
    });

    it("createContract", () => {
        return new Promise((resolve, reject) => {
            client.createContract(contractName, wasm2, abi2, undefined, undefined, true).then(resp => {
                resolve(resp);
            }).catch(ex => {
                reject(ex);
            });
        });
    });

    it("callContract", () => {
        return new Promise((resolve, reject) => {
            client.callContract(contractName, "hi", { user: "lzy" }, 0, true).then(resp => {
                resolve(resp);
            }).catch(ex => {
                reject(ex);
            });
        });
    });

    it("callContract with custom fee", () => {
        return new Promise((resolve, reject) => {
            client.callContract(contractName, "hi", { user: "lzy" }, 0, true, { fee_symbol: "BTC" }).then(resp => {
                resolve(assert.equal(resp[0].trx.operations[0][1].fee.asset_id, "1.3.4"));
            }).catch(ex => {
                reject(ex);
            });
        });
    });

    it("createContract with custom fee", () => {
        return new Promise((resolve, reject) => {
            client.createContract(contractName + "x", wasm2, abi2, undefined, undefined, true, { fee_symbol: "BTC" }).then(resp => {
                resolve(assert.equal(resp[0].trx.operations[0][1].fee.asset_id, "1.3.4"));
            }).catch(ex => {
                reject(ex);
            });
        });
    });

    it("createContract with custom fee", () => {
        return new Promise((resolve, reject) => {
            client.createContract(contractName + "x", wasm2, abi2, undefined, undefined, true, { fee_symbol: "BTC" }).then(resp => {
                resolve(assert.equal(resp[0].trx.operations[0][1].fee.asset_id, "1.3.4"));
            }).catch(ex => {
                reject(ex);
            });
        });
    });

    it("updateContract", () => {
        return new Promise((resolve, reject) => {
            client.updateContract(contractName, "", wasm, abi, true).then(resp => {
                resolve(resp);
            }).catch(ex => {
                reject(ex);
            });
        });
    });

    it("updateContract with custom fee", () => {
        return new Promise((resolve, reject) => {
            client.updateContract(contractName+"x", "", wasm, abi, true, { fee_symbol: "BTC" }).then(resp => {
                resolve(assert.equal(resp[0].trx.operations[0][1].fee.asset_id, "1.3.4"));
            }).catch(ex => {
                reject(ex);
            });
        });
    });
});
