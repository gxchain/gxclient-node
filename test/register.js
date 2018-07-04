import GXClient from "../lib/src/GXClient";

let client = new GXClient();
let keyPair = client.generateKey();
console.log(keyPair);

client.register("testaccount-2", keyPair.publicKey).then(resp => {
    console.log(resp);
}).catch(ex => {
    console.error("register failed:", ex);
});
