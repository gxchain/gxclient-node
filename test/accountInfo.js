import GXClient from "../lib/src/GXClient";

let client = new GXClient();
client.getAccountBalances("gxb123").then(balances => {
    console.log(balances);
});
