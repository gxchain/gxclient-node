# GXClient
GXClient is a wrapped toolkit of gxbjs, a client to interact with gxchain apis

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
    // 10904392 '192225b26adacb71945ee71864734bd06d896376' [ 0,
    // { fee: { amount: 1000, asset_id: '1.3.1' },
    //     from: '1.2.525166',
    //     to: '1.2.521006',
    //     amount: { amount: 24382, asset_id: '1.3.1' },
    //     extensions: [] } ]

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
// { brainKey: 'kiki gauntly unpanel rattish upbrow unbow slewer viduate topsoil foreman pentene pluff where lauia chinse glazier',
//     privateKey: '5JJnDSdwVpB8HFJsYqLXsLBFMdhZo7otDUiSNJoXvDJ3UiggVRY',
//     publicKey: 'GXC5LsiHRuZQkKwrR8eNtCNTdjziND5hZgjWx2wx3wHr8KRSKNVxp' }
```

## 3. Account register

```js
import GXClient from "gxclient";

let client = new GXClient();
let keyPair = client.generateKey();
console.log(keyPair);

client.register("testaccount-5", keyPair.publicKey).then(resp => {
    console.log(JSON.stringify(resp));
    // {"ref_block_num":32111,"ref_block_prefix":2617062570,"expiration":"2018-07-04T11:42:06","operations":[[5,{"fee":{"amount":114843,"asset_id":"1.3.0"},"registrar":"1.2.26","referrer":"1.2.26","referrer_percent":0,"name":"testaccount-3","owner":{"weight_threshold":1,"account_auths":[],"key_auths":[["GXC7kXrwuMEisXYYDRiPW7xayttNQQwTHs6uHvrzFehMqq7Nusigz",1]],"address_auths":[]},"active":{"weight_threshold":1,"account_auths":[],"key_auths":[["GXC7kXrwuMEisXYYDRiPW7xayttNQQwTHs6uHvrzFehMqq7Nusigz",1]],"address_auths":[]},"options":{"memo_key":"GXC7kXrwuMEisXYYDRiPW7xayttNQQwTHs6uHvrzFehMqq7Nusigz","voting_account":"1.2.5","num_witness":0,"num_committee":0,"votes":[],"extensions":[]},"extensions":{}}]],"extensions":[],"signatures":["1f77e23a08f77cdf2eede3c9b30c18fc3e18c1c949137af0314c9f86c49c656fe814a15b1df5f8021b8cbddc8fbe3526f70418303c4b16cbb57d37997b472457be"]}
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
    // {"ref_block_num":48921,"ref_block_prefix":781272439,"expiration":"2018-07-04T11:42:50","operations":[[0,{"fee":{"amount":1180,"asset_id":"1.3.1"},"from":"1.2.19","to":"1.2.21","amount":{"amount":1500000,"asset_id":"1.3.1"},"memo":{"from":"GXC7XzFVivuBtuc2rz3Efkb41JCN4KH7iENAx9rch9QkowEmc4UvV","to":"GXC67KQNpkkLUzBgDUkWqEBtojwqPgL78QCmTRRZSLugzKEzW4rSm","nonce":"391860365831885","message":"9122fa3fcd0709c9e9c84eef9fb7e592"},"extensions":[]}]],"extensions":[],"signatures":["203e1c264ad82c6755c9a898cf9b25bdee2ba380bd8630e48270d8f13e878f543a44098598ca99405df02e943cf9bb3f372777da04b82a290638ecce8c7faa6291"],"operation_results":[[0,{}]]}
    console.log("fee:", transaction.operations[0][1].fee.amount / Math.pow(10, asset_precicion));
    // fee: 0.0118
}).catch(ex => {
    console.error(ex);
});
```

# Other

It's very welcome for developers to translate this project into different programing languages
We are looking forward to your pull requests
