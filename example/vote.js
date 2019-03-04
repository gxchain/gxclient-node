import GXClientFactory from "../lib";

const private_key = "";
const account_id = "gxb122";
let client = GXClientFactory.instance({
    keyProvider: private_key,
    account: account_id,
    network: "https://testnet.gxchain.org"
});

client.vote(["init1"], true, {fee_symbol: "GXC"}).then(result => {
    console.log(JSON.stringify(result, null, "  "));
}).catch(ex => {
    console.error(ex);
});
