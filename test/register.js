import GXClient from "../lib/src/GXClient";

let client = new GXClient();
let keyPair = client.generateKey();
console.log(keyPair);

client.register("testaccount-3", keyPair.publicKey).then(resp => {
    console.log(JSON.stringify(resp));
}).catch(ex => {
    console.error("register failed:", ex);
});
