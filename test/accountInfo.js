import {GXClient} from "../lib";

let client = new GXClient();
client.getAccountBalances("gxb123").then(balances => {
    console.log(balances);
    client.getAccountByPublicKey("GXC5jynfNTY35xBkFTSKDUfzRrHDmruDCwmcPAU97gyeupKZwfzUh").then(result=>{
        console.log(result);
    });
});
