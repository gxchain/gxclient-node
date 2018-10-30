import {GXClient} from "../lib";

let client = new GXClient();
client.getAccountBalances("gxb123").then(balances => {
    console.log(balances);
});
