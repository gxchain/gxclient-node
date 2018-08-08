import GXClient from "../lib/src/GXClient";

let client = new GXClient();
client.getAccountBalances("l7x").then(balances => {
    console.log(balances);
});
