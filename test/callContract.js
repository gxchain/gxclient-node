import {GXClient} from "../lib";

const private_key = "";
const account_id = "1.2.19";
let client = new GXClient(private_key, account_id, "ws://47.96.164.78:28090");

// set broadcast to false so we could calculate the fee before broadcasting
let broadcast = true;

//Calling deposit method of bank contract
client.callContract("bank", "deposit", {}, null, broadcast).then(resp => {
    let transaction = broadcast ? resp[0].trx : resp;
    let txid = broadcast ? resp[0].id : "";
    console.log(txid, JSON.stringify(transaction));
}).catch(ex => {
    console.error(ex);
});
