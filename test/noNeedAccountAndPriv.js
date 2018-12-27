// export PVK="xxxx" && export ACCOUNT_ID="xxxx" && npm run test -- ./test/transfer
import { GXClient } from "../lib";
let client;

describe("getObjects", () => {
    before(function () {
        client = new GXClient('', '', "wss://testnet.gxchain.org");
    });

    it("getObjects success", () => {
        return new Promise((resolve, reject) => {
            client.getObjects(['1.3.1','1.3.6']).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        });
    });
});
