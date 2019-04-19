# GXClient
GXClient is a wrapped toolkit of gxbjs, a client to interact with gxchain apis.

You can get more info on [docs](https://gxchain.github.io/gxclient-node).

<p>
    <a href="javascript:;">
        <img width="300px" src='https://raw.githubusercontent.com/gxchain/gxips/master/assets/images/task-gxclient.png'/>
    </a>
    <a href="javascript:;">
        <img width="300px" src='https://raw.githubusercontent.com/gxchain/gxips/master/assets/images/task-gxclient-en.png'/>
    </a>
</p>

## Install

``` bash
npm install gxclient --save
```

## Usage(CLI)

``` bash
$ npm install gxclient -g
$ gxclient -h
```

```bash
Usage: gxclient [cmd]

Options:
  -V, --version                                                                              output the version number
  -v --version                                                                               print gxclient version
  -h, --help                                                                                 output usage information

Commands:
  list|ls                                                                                    List all apis
  generate_key                                                                               Generate gxchain key pairs
  private_to_public <private_key>                                                            Export public key from private key
  is_valid_private <private_key>                                                             Check if private key is valid
  is_valid_public <public_key>                                                               Check if public key is valid
  register [options] <account_name> <public_key>                                             Register gxchain account
  get_account [options] <account_name>                                                       Get account information by account_name
  get_account_by_public_key [options] <public_key>                                           Get account information by account_name
  get_object [options] <object_id>                                                           Get object by object_id
  get_account_balances|get_account_balance [options] <account_name>                          Get account balances by account_name
  get_asset [options] <symbol>                                                               Get asset info by asset symbol
  get_block [options] <block_height>                                                         Get block by block height
  transfer [options] <to> <memo> <amount_asset> [boradcast]                                  Send a transfer transaction
  vote [options] <account_ids> [overwrite] [fee_asset_id] [boradcast]                        Vote for TrustNodes
  call_contract [options] <contract_name> <method_name> <params> [amount_asset] [boradcast]  Call smart contract method
  get_contract_tables [options] <contract_name>                                              Get contract table by contract_name
  get_contract_abi [options] <contract_name>                                                 Get contract abi by contract_name
  get_table_objects [options] <contract_name> <table_name> [start] [limit]                   Get table records by contract_name and table_name
  broadcast [options] <tx>                                                                   broadcast transaction
  get_chain_id [options]                                                                     get_chain_id
```

## Usage(Client)

```js
import GXClientFactory from "gxclient";

const private_key = "5Ka9YjFQtfUUX2Ddnqka...";
const account_name = "gxcaccount";
const asset_precicion = 5;

let client = GXClientFactory.instance({keyProvider:private_key, account:account_name,network:"wss://testnet.gxchain.org"});

// set broadcast to false so we could calculate the fee before broadcasting
let broadcast = true;

//Sending 15GXS to gxb456 with memo "GXChain NB"
client.transfer("gxb456", "GXChain NB", "15 GXC", broadcast).then(resp => {
    let transaction = broadcast ? resp[0].trx : resp;
    let txid = broadcast ? resp[0].id : "";
    console.log(JSON.stringify(transaction));
    console.log("txid:", txid, "fee:", transaction.operations[0].fee.amount / Math.pow(10, asset_precicion));
    // > txid: f28d27ac74649a76f58c9b84fb7ea700163e31c4 fee: 0.0118
    // Since gxchain implemented dpos consensus, the transaction will be confirmed until the block becomes irreversible
    // You can find the logic when a transfer operation was confirmed in the example of detectTransaction
}).catch(ex => {
    console.error(ex);
});

```

## APIs

[API documents](https://gxchain.github.io/gxclient-node/api/)

## Other

- It's very welcome for developers to translate this project into different programing languages
- We are looking forward to your pull requests
