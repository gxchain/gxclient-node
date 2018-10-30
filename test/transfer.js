import {GXClient} from "../lib";

const private_key = "";
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
    let txid = broadcast ? resp[0].id : "";
    console.log(JSON.stringify(transaction));
    console.log("txid:", txid, "fee:", transaction.operations[0][1].fee.amount / Math.pow(10, asset_precicion));
    // > txid: f28d27ac74649a76f58c9b84fb7ea700163e31c4 fee: 0.0118
    // Since gxchain implemented dpos consensus, the transaction will be confirmed until the block becomes irreversible
    // You can find the logic when a transfer operation was confirmed in the example of detectTransaction
}).catch(ex => {
    console.error(ex);
});
