// export PVK="xxxx" && export ACCOUNT_ID="xxxx" && npm run test -- ./test/transfer
import { GXClient } from "../lib";
import assert from "assert";

let client;

describe("transfer", () => {
    before(function () {
        client = new GXClient("", "", "wss://testnet.gxchain.org");
    });

    it("transfer without memo", async () => {
        const a = await client.updateAccount("youxiu123");
        assert.equal(a, "1.2.488");
    });

});
