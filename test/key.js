// export PVK="xxxx" && export account="xxxx" && npm run test -- ./test/transfer
import { GXClient } from "../lib";
var client;

describe("transfer", () => {
    before(function () {
        client = new GXClient("", "", "wss://testnet.gxchain.org");
    });

    it("transfer without memo", () => {
        console.log(client.generateKey());
    });

});