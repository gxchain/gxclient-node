import GXClient from "../lib/src/GXClient";

let client = new GXClient("", "", "ws://47.96.164.78:28090/");
let keyPair = client.generateKey();
console.log(keyPair);

client.register("testaccount-2", keyPair.publicKey).then(resp => {
    console.log(resp);
}).catch(ex => {
    console.error("register failed:", ex);
});
