import GXClientFactory from "../lib";

let client = GXClientFactory.instance({network: "https://testnet.gxchain.org"});
let keypairs = client.generateKey();
console.log(keypairs, client.privateToPublic(keypairs.privateKey),client.isValidPrivate(keypairs.privateKey), client.isValidPublic(keypairs.publicKey));
