import { GXClient } from "../lib";
var client;

describe("keypair", () => {
    before(function () {
        client = new GXClient("", "", "wss://testnet.gxchain.org");
    });

    it("generateKey", () => {
        console.log(client.generateKey());
    });

});