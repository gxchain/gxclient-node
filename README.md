# GXClient
GXClient is a wrap toolkit for gxbjs, a client to interact with gxchain apis

# Install

```
npm install gxclient --save
```

# Usage

## 1. Transaction detect

``` js
import {GXClient} from "gxclient";
import {Aes, PrivateKey} from "gxbjs";

const private_key = "";
const account_id = "1.2.525166";
const memo_private = "";

let client = new GXClient(private_key, account_id);

// start a task to fetching latest irreversible block
client.latestBlockTask();

// start to detect new transactions related to my account from the indicated block
client.detectTransaction(10904333, function (blockHeight, txid, operation) {
    console.log(blockHeight, txid, operation);

    //deal with transfer operation
    if (operation[0] === 0) {
        // deal with deposit
        if (operation[1].to === account_id) {
            let memo = operation[1].memo;
            // decrypt memo if assigned
            if (memo) {
                let decryptedMsg = Aes.decrypt_with_checksum(PrivateKey.fromWif(memo_private), memo.from, memo.nonce, memo.message);
                console.log("memo:", decryptedMsg);
            } else {
                console.log("no memo:", txid);
            }
        }
        // deal with withdraw
        if (operation[1].from === account_id) {
            console.log(txid, " should be confirmed");
        }
    }
});
```

## 2. KeyPair generation

```js
import GXClient from "gxclient";

let client = new GXClient();
console.log(client.generateKey());
```

## 3. Account register

```js
import GXClient from "gxclient";

let client = new GXClient();
let keyPair = client.generateKey();
console.log(keyPair);

client.register("testaccount-2", keyPair.publicKey).then(resp => {
    console.log(resp);
}).catch(ex => {
    console.error("register failed:", ex);
});
```

## 4. Transfer

```js
import GXClient from "gxclient";

const private_key = "5Ka9YjFQtfUUX2Ddnqka...";
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
```

# Other

It's very welcome for developers to translate this project into different programing languages
We are looking forward to your pull requests
