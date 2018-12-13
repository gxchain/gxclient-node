import GXClientFactory from "../lib";


let client = GXClientFactory.instance({
    account: "gxb121",
    network: "wss://testnet.gxchain.org"
});

client.getAccount("gxb121").then(acc => {
    console.log(acc.id);
    client = GXClientFactory.instance({
        account: "gxb121",
        network: "wss://testnet.gxchain.org"
    });
    client.getAccount("gxb122").then(acc => {
        console.log(acc.id);
    });
});
