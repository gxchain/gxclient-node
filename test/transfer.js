import GXClient from "../lib/src/GXClient";

const private_key = "5Ka9YjFQtfUUX2DdnqkaPWH1rVeSeby7Cj2VdjRt79S9kKLvXR7";
const account_id = "1.2.19";
const asset_precicion = 5;
let client = new GXClient(private_key, account_id, "ws://47.96.164.78:28090");
// set broadcast to false so we could calculate the fee before broadcasting
let broadcast = true;

//Sending 15GXS to gxb456 with memo "GXChain NB"
client.transfer("gxb456", "GXChain NB", {
    amount: 15,
    asset_id: "1.3.1",
    precision: asset_precicion
}, broadcast).then(resp => {
    let transaction = broadcast ? resp[0].trx : resp;

    console.log(JSON.stringify(transaction));
    console.log("fee:", transaction.operations[0][1].fee.amount / Math.pow(10, asset_precicion));
}).catch(ex => {
    console.error(ex);
});
