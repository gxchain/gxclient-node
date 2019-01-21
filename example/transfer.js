import GXClientFactory from "../lib";

const account = "gxb122";
let client = GXClientFactory.instance({
    keyProvider: "",
    account: account,
    network: "wss://testnet.gxchain.org"
});
// set broadcast to false so we could calculate the fee before broadcasting
let broadcast = true;

//Sending 15GXS to gxb456 with memo "GXChain NB"
(async () => {
    let transaction = await client.transfer("gxb121", "GXChain NB", "10 GXC", broadcast);

    console.log(transaction);
})();
