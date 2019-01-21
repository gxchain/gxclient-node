import GXClientFactory from "../lib";

const private_key = "";
const account_id = "gxb122";
let client = GXClientFactory.instance({
    keyProvider: private_key,
    account: account_id,
    network: "https://testnet.gxchain.org"
});

client.getAccount("gxb121").then(acc => {
    console.log(acc.id);
}).catch(ex=>{
    console.error(ex);
});
