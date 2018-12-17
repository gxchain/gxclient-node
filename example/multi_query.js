// export PVK="xxxx" && export ACCOUNT_ID="xxxx" && npm run test -- ./test/transfer
import {GXClient} from "../lib";

const private_key = "5JHsFs1VMjQEa9ZaNeBJ78oKExpms1sgXY6zNmsLMTPpKQXJuEb";
const account_id = "lzydophin94";
let client;

if (!private_key || !account_id) {
    throw new Error("需要设置环境变量ACCOUNT_ID和PVK");
}

client = new GXClient(private_key, account_id, "wss://testnet.gxchain.org");

client.transfer("youxiu123", "", "1 GXC", true).then(trx => {
    console.log(`transfer success`, trx);
}).catch(error => {
    if (error.code === 432) {
        alert("you don't authorize identity!");
    }
    console.error(error);
});

client.vote(["math-wallet-test", "gxc-pacific"], "GXC", true).then(trx => {
    console.log(`vote success`, trx);
}).catch(error => {
    console.error(error);
});

client.getAccount('lzydophin94').then(res => {
    console.log('aaacccc', res)
})
