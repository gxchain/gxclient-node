---
title: GXClient
---
## Classes

<dl>
<dt><a href="#GXClient">GXClient</a></dt>
<dd><p>GXClient Class</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#signatureProvider">signatureProvider</a> : <code>function</code></dt>
<dd><p>This callback is displayed as a global member.</p>
</dd>
</dl>

<a name="GXClient"></a>

## GXClient
GXClient Class

**Kind**: global class  

* [GXClient](#GXClient)
    * [new GXClient(private_key, account_id_or_name, entry_point, signProvider)](#new_GXClient_new)
    * [.generateKey()](#GXClient+generateKey) ⇒ <code>Object</code>
    * [.privateToPublic(privateKey)](#GXClient+privateToPublic) ⇒ <code>String</code>
    * [.isValidPublic(publicKey)](#GXClient+isValidPublic) ⇒ <code>boolean</code>
    * [.isValidPrivate(privateKey)](#GXClient+isValidPrivate) ⇒ <code>boolean</code>
    * [.register(account, activeKey, ownerKey, memoKey, faucet)](#GXClient+register) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getObject(object_id)](#GXClient+getObject) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
    * [.getObjects(object_ids)](#GXClient+getObjects) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
    * [.getAccount(account_name)](#GXClient+getAccount) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getChainID()](#GXClient+getChainID) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
    * [.getDynamicGlobalProperties()](#GXClient+getDynamicGlobalProperties) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
    * [.getAccountByPublicKey(publicKey)](#GXClient+getAccountByPublicKey) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
    * [.getAccountBalances(account_name)](#GXClient+getAccountBalances) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getAsset(symbol)](#GXClient+getAsset) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getBlock(blockHeight)](#GXClient+getBlock) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.detectTransaction(blockHeight, callback)](#GXClient+detectTransaction)
    * [.transfer(to, memo, amount_asset, broadcast, options)](#GXClient+transfer) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getContractABI(contract_name)](#GXClient+getContractABI) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getContractTable(contract_name)](#GXClient+getContractTable) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getTableObjects(contract_name, table_name, start, limit)](#GXClient+getTableObjects) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.createContract(contract_name, code, abi, vm_type, vm_version, broadcast, options)](#GXClient+createContract) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.updateContract(contract_name, newOwner, code, abi, broadcast, options)](#GXClient+updateContract) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
    * [.callContract(contract_name, method_name, params, amount_asset, broadcast, options)](#GXClient+callContract) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.vote(accounts, broadcast, options)](#GXClient+vote) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.fee(operation, feeAssetId)](#GXClient+fee) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.broadcast(tx)](#GXClient+broadcast) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="new_GXClient_new"></a>

### new GXClient(private_key, account_id_or_name, entry_point, signProvider)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| private_key | <code>String</code> |  | private key |
| account_id_or_name | <code>String</code> |  | e.g: '1.2.44'|'gxcaccount' |
| entry_point | <code>String</code> | <code>wss://node1.gxb.io</code> | entry point network address |
| signProvider | [<code>signatureProvider</code>](#signatureProvider) | <code></code> |  |

<a name="GXClient+generateKey"></a>

### gxClient.generateKey() ⇒ <code>Object</code>
generate key pair locally

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  
<a name="GXClient+privateToPublic"></a>

### gxClient.privateToPublic(privateKey) ⇒ <code>String</code>
export public key from private key

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type |
| --- | --- |
| privateKey | <code>String</code> | 

<a name="GXClient+isValidPublic"></a>

### gxClient.isValidPublic(publicKey) ⇒ <code>boolean</code>
check if public key is valid

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type |
| --- | --- |
| publicKey | <code>String</code> | 

<a name="GXClient+isValidPrivate"></a>

### gxClient.isValidPrivate(privateKey) ⇒ <code>boolean</code>
check if private key is valid

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type |
| --- | --- |
| privateKey | <code>String</code> | 

<a name="GXClient+register"></a>

### gxClient.register(account, activeKey, ownerKey, memoKey, faucet) ⇒ <code>Promise.&lt;any&gt;</code>
register an account by faucet

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| account | <code>String</code> |  | Account name |
| activeKey | <code>String</code> |  | Public Key for account operator |
| ownerKey | <code>String</code> |  | Public Key for account owner |
| memoKey | <code>String</code> |  | Public Key for memo |
| faucet | <code>String</code> | <code>https://opengateway.gxb.io</code> | faucet url |

**Example**  
```js
curl ‘https://opengateway.gxb.io/account/register' -H 'Content-type: application/json' -H 'Accept: application/json’ -d ‘{“account”:{“name”:”gxb123”,”owner_key”:”GXC5wQ4RtjouyobBV57vTx7boBj4Kt3BUxZEMsUD3TU369d3C9DqZ”,”active_key”:”GXC7cPVyB9F1Pfiaaxw4nY3xKADo5993hEsTjFs294LKwhqsUrFZs”,”memo_key”:”GXC7cPVyB9F1Pfiaaxw4nY3xKADo5993hEsTjFs294LKwhqsUrFZs”,”refcode”:null,”referrer”:null}}’
```
<a name="GXClient+getObject"></a>

### gxClient.getObject(object_id) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
get object by id

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Description |
| --- | --- | --- |
| object_id | <code>String</code> | e.g: '1.2.3' |

<a name="GXClient+getObjects"></a>

### gxClient.getObjects(object_ids) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
get objects

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type |
| --- | --- |
| object_ids | <code>Array.&lt;String&gt;</code> | 

<a name="GXClient+getAccount"></a>

### gxClient.getAccount(account_name) ⇒ <code>Promise.&lt;any&gt;</code>
get account info by account name

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type |
| --- | --- |
| account_name | <code>String</code> | 

<a name="GXClient+getChainID"></a>

### gxClient.getChainID() ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
get current blockchain id

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  
<a name="GXClient+getDynamicGlobalProperties"></a>

### gxClient.getDynamicGlobalProperties() ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
get dynamic global properties

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  
<a name="GXClient+getAccountByPublicKey"></a>

### gxClient.getAccountByPublicKey(publicKey) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
get account_ids by public key

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type |
| --- | --- |
| publicKey | <code>String</code> | 

<a name="GXClient+getAccountBalances"></a>

### gxClient.getAccountBalances(account_name) ⇒ <code>Promise.&lt;any&gt;</code>
get account balances by account name

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type |
| --- | --- |
| account_name | <code>String</code> | 

<a name="GXClient+getAsset"></a>

### gxClient.getAsset(symbol) ⇒ <code>Promise.&lt;any&gt;</code>
get asset info by symbol

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> | e.g: 'GXC' |

<a name="GXClient+getBlock"></a>

### gxClient.getBlock(blockHeight) ⇒ <code>Promise.&lt;any&gt;</code>
get block by block height

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Description |
| --- | --- | --- |
| blockHeight | <code>Number</code> | block height |

<a name="GXClient+detectTransaction"></a>

### gxClient.detectTransaction(blockHeight, callback)
detect new transactions related to this.account_id

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Description |
| --- | --- | --- |
| blockHeight | <code>Number</code> | block height |
| callback | <code>function</code> |  |

<a name="GXClient+transfer"></a>

### gxClient.transfer(to, memo, amount_asset, broadcast, options) ⇒ <code>Promise.&lt;any&gt;</code>
send transfer request to witness node

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | <code>String</code> |  | to account name |
| memo | <code>String</code> \| <code>function</code> |  | memo |
| amount_asset | <code>String</code> |  | e.g: '1 GXC' |
| broadcast | <code>Boolean</code> | <code>false</code> |  |
| options | <code>Object</code> |  |  |
| options.fee_symbol | <code>String</code> |  | e.g: 'GXC' |

<a name="GXClient+getContractABI"></a>

### gxClient.getContractABI(contract_name) ⇒ <code>Promise.&lt;any&gt;</code>
get contract abi by contract_name

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type |
| --- | --- |
| contract_name | <code>String</code> | 

<a name="GXClient+getContractTable"></a>

### gxClient.getContractTable(contract_name) ⇒ <code>Promise.&lt;any&gt;</code>
get contract table by contract_name

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type |
| --- | --- |
| contract_name | <code>String</code> | 

<a name="GXClient+getTableObjects"></a>

### gxClient.getTableObjects(contract_name, table_name, start, limit) ⇒ <code>Promise.&lt;any&gt;</code>
fetch contract table record by contract_name and table_name

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Default |
| --- | --- | --- |
| contract_name | <code>String</code> |  | 
| table_name | <code>String</code> |  | 
| start | <code>Number</code> | <code>0</code> | 
| limit | <code>Number</code> | <code>100</code> | 

<a name="GXClient+createContract"></a>

### gxClient.createContract(contract_name, code, abi, vm_type, vm_version, broadcast, options) ⇒ <code>Promise.&lt;any&gt;</code>
deploy smart contract

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| contract_name | <code>String</code> |  |  |
| code | <code>String</code> |  | bytecode |
| abi | <code>Object</code> |  | abi object |
| vm_type | <code>String</code> | <code>0</code> |  |
| vm_version | <code>String</code> | <code>0</code> |  |
| broadcast | <code>Boolean</code> | <code>false</code> |  |
| options | <code>Object</code> |  |  |
| options.fee_symbol | <code>String</code> |  | e.g: 'GXC' |

<a name="GXClient+updateContract"></a>

### gxClient.updateContract(contract_name, newOwner, code, abi, broadcast, options) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
update smart contract

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| contract_name | <code>String</code> |  |  |
| newOwner | <code>String</code> |  | new owner account name |
| code | <code>String</code> |  | same to createContract |
| abi | <code>Object</code> |  | same to createContract |
| broadcast | <code>Boolean</code> | <code>false</code> |  |
| options | <code>Object</code> |  |  |
| options.fee_symbol | <code>String</code> |  | e.g: 'GXC' |

<a name="GXClient+callContract"></a>

### gxClient.callContract(contract_name, method_name, params, amount_asset, broadcast, options) ⇒ <code>Promise.&lt;any&gt;</code>
call smart contract method

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| contract_name | <code>String</code> |  | The name of the smart contract |
| method_name | <code>String</code> |  | Method/Action name |
| params | <code>JSON</code> |  | parameters |
| amount_asset | <code>String</code> |  | same to transfer eg."100 GXC" |
| broadcast | <code>Boolean</code> | <code>false</code> | Broadcast the transaction or just return a serialized transaction |
| options | <code>Object</code> |  |  |
| options.fee_symbol | <code>String</code> |  | e.g: 'GXC' |

<a name="GXClient+vote"></a>

### gxClient.vote(accounts, broadcast, options) ⇒ <code>Promise.&lt;any&gt;</code>
vote for accounts

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| accounts | <code>Array.&lt;String&gt;</code> |  | An array of account_names to vote |
| broadcast | <code>Boolean</code> | <code>false</code> |  |
| options | <code>Object</code> |  |  |
| options.fee_symbol | <code>String</code> |  | e.g: 'GXC' |

<a name="GXClient+fee"></a>

### gxClient.fee(operation, feeAssetId) ⇒ <code>Promise.&lt;any&gt;</code>
calculate fee of a operation

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Default |
| --- | --- | --- |
| operation | <code>Object</code> |  | 
| feeAssetId | <code>String</code> | <code>1.3.1</code> | 

<a name="GXClient+broadcast"></a>

### gxClient.broadcast(tx) ⇒ <code>Promise.&lt;any&gt;</code>
broadcast transaction

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type |
| --- | --- |
| tx | <code>TransactionBuilder</code> | 

<a name="signatureProvider"></a>

## signatureProvider : <code>function</code>
This callback is displayed as a global member.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| transaction | <code>TransactionBuilder</code> |  |
| chain_id | <code>String</code> | Chain Id |

