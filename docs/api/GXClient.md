---
title: GXClient
---
<a name="GXClient"></a>

## GXClient
**Kind**: global class  

* [GXClient](#GXClient)
    * [new GXClient()](#new_GXClient_new)
    * [.generateKey()](#GXClient+generateKey) ⇒ <code>Object</code>
    * [.privateToPublic(privateKey)](#GXClient+privateToPublic) ⇒ <code>\*</code>
    * [.isValidPublic(publicKey)](#GXClient+isValidPublic) ⇒ <code>boolean</code>
    * [.isValidPrivate(privateKey)](#GXClient+isValidPrivate) ⇒ <code>boolean</code>
    * [.register(account, activeKey, ownerKey, memoKey, faucet)](#GXClient+register) ⇒ <code>Promise.&lt;any&gt;</code>
    * [._latestBlockTask()](#GXClient+_latestBlockTask)
    * [.getObject(object_id)](#GXClient+getObject) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
    * [.getObjects(object_ids)](#GXClient+getObjects) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
    * [.getAccount(account_name)](#GXClient+getAccount) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getChainID()](#GXClient+getChainID)
    * [.getDynamicGlobalProperties()](#GXClient+getDynamicGlobalProperties) ⇒ <code>\*</code>
    * [.getAccountByPublicKey(publicKey)](#GXClient+getAccountByPublicKey) ⇒ <code>\*</code>
    * [.getAccountBalances(account_name)](#GXClient+getAccountBalances) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getAsset(symbol)](#GXClient+getAsset) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getBlock(blockHeight)](#GXClient+getBlock) ⇒ <code>\*</code>
    * [.detectTransaction(blockHeight, callback)](#GXClient+detectTransaction)
    * [.transfer(to, memo, amount_asset, broadcast)](#GXClient+transfer) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getContractABI(contract_name)](#GXClient+getContractABI) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getContractTable(contract_name)](#GXClient+getContractTable) ⇒ <code>\*</code>
    * [.getTableObjects(contract_name, table_name, start, limit)](#GXClient+getTableObjects) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.createContract(contract_name, code, abi, vm_type, vm_version)](#GXClient+createContract)
    * [.updateContract(contract_name, newOwner, code, abi, broadcast)](#GXClient+updateContract) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
    * [.callContract(contract_name, method_name, params, amount_asset, broadcast)](#GXClient+callContract) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.vote(account_ids, fee_paying_asset, broadcast)](#GXClient+vote) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.fee(operation, feeAssetId)](#GXClient+fee) ⇒ <code>Promise.&lt;any&gt;</code>
    * [._accMult(arg1, arg2)](#GXClient+_accMult) ⇒ <code>number</code>
    * [._processTransaction(tr, broadcast)](#GXClient+_processTransaction) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>

<a name="new_GXClient_new"></a>

### new GXClient()
GXClient Class

<a name="GXClient+generateKey"></a>

### gxClient.generateKey() ⇒ <code>Object</code>
generate key pair locally

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  
<a name="GXClient+privateToPublic"></a>

### gxClient.privateToPublic(privateKey) ⇒ <code>\*</code>
export public key from private key

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| privateKey | 

<a name="GXClient+isValidPublic"></a>

### gxClient.isValidPublic(publicKey) ⇒ <code>boolean</code>
check if public key is valid

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| publicKey | 

<a name="GXClient+isValidPrivate"></a>

### gxClient.isValidPrivate(privateKey) ⇒ <code>boolean</code>
check if private key is valid

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| privateKey | 

<a name="GXClient+register"></a>

### gxClient.register(account, activeKey, ownerKey, memoKey, faucet) ⇒ <code>Promise.&lt;any&gt;</code>
register an account by faucetcurl ‘https://opengateway.gxb.io/account/register' -H 'Content-type: application/json' -H 'Accept: application/json’ -d ‘{“account”:{“name”:”gxb123”,”owner_key”:”GXC5wQ4RtjouyobBV57vTx7boBj4Kt3BUxZEMsUD3TU369d3C9DqZ”,”active_key”:”GXC7cPVyB9F1Pfiaaxw4nY3xKADo5993hEsTjFs294LKwhqsUrFZs”,”memo_key”:”GXC7cPVyB9F1Pfiaaxw4nY3xKADo5993hEsTjFs294LKwhqsUrFZs”,”refcode”:null,”referrer”:null}}’

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| account | <code>String</code> |  | Account name |
| activeKey | <code>String</code> |  | Public Key for account operator |
| ownerKey | <code>String</code> |  | Public Key for account owner |
| memoKey | <code>String</code> |  | Public Key for memo |
| faucet |  | <code>https://opengateway.gxb.io</code> |  |

<a name="GXClient+_latestBlockTask"></a>

### gxClient.\_latestBlockTask()
fetching latest block each 3 seconds

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  
<a name="GXClient+getObject"></a>

### gxClient.getObject(object_id) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
get object by id

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| object_id | 

<a name="GXClient+getObjects"></a>

### gxClient.getObjects(object_ids) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
get objects

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type |
| --- | --- |
| object_ids | <code>Array</code> | 

<a name="GXClient+getAccount"></a>

### gxClient.getAccount(account_name) ⇒ <code>Promise.&lt;any&gt;</code>
get account info by account name

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| account_name | 

<a name="GXClient+getChainID"></a>

### gxClient.getChainID()
get current blockchain id

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  
<a name="GXClient+getDynamicGlobalProperties"></a>

### gxClient.getDynamicGlobalProperties() ⇒ <code>\*</code>
get dynamic global properties

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  
<a name="GXClient+getAccountByPublicKey"></a>

### gxClient.getAccountByPublicKey(publicKey) ⇒ <code>\*</code>
get account_ids by public key

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| publicKey | 

<a name="GXClient+getAccountBalances"></a>

### gxClient.getAccountBalances(account_name) ⇒ <code>Promise.&lt;any&gt;</code>
get account balances by account name

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| account_name | 

<a name="GXClient+getAsset"></a>

### gxClient.getAsset(symbol) ⇒ <code>Promise.&lt;any&gt;</code>
get asset info by symbol

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| symbol | 

<a name="GXClient+getBlock"></a>

### gxClient.getBlock(blockHeight) ⇒ <code>\*</code>
get block by block height

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| blockHeight | 

<a name="GXClient+detectTransaction"></a>

### gxClient.detectTransaction(blockHeight, callback)
detect new transactions related to this.account_id

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| blockHeight | 
| callback | 

<a name="GXClient+transfer"></a>

### gxClient.transfer(to, memo, amount_asset, broadcast) ⇒ <code>Promise.&lt;any&gt;</code>
send transfer request to witness node

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Default |
| --- | --- |
| to |  | 
| memo |  | 
| amount_asset |  | 
| broadcast | <code>false</code> | 

<a name="GXClient+getContractABI"></a>

### gxClient.getContractABI(contract_name) ⇒ <code>Promise.&lt;any&gt;</code>
get contract abi by contract_name

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| contract_name | 

<a name="GXClient+getContractTable"></a>

### gxClient.getContractTable(contract_name) ⇒ <code>\*</code>
get contract table by contract_name

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| contract_name | 

<a name="GXClient+getTableObjects"></a>

### gxClient.getTableObjects(contract_name, table_name, start, limit) ⇒ <code>Promise.&lt;any&gt;</code>
fetch contract table record by contract_name and table_name

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Default |
| --- | --- |
| contract_name |  | 
| table_name |  | 
| start | <code>0</code> | 
| limit | <code>100</code> | 

<a name="GXClient+createContract"></a>

### gxClient.createContract(contract_name, code, abi, vm_type, vm_version)
deploy smart contract

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Default |
| --- | --- |
| contract_name |  | 
| code |  | 
| abi |  | 
| vm_type | <code>0</code> | 
| vm_version | <code>0</code> | 

<a name="GXClient+updateContract"></a>

### gxClient.updateContract(contract_name, newOwner, code, abi, broadcast) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>
update smart contract

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Default |
| --- | --- |
| contract_name |  | 
| newOwner |  | 
| code |  | 
| abi |  | 
| broadcast | <code>false</code> | 

<a name="GXClient+callContract"></a>

### gxClient.callContract(contract_name, method_name, params, amount_asset, broadcast) ⇒ <code>Promise.&lt;any&gt;</code>
call smart contract method

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| contract_name | <code>String</code> |  | The name of the smart contract |
| method_name | <code>String</code> |  | Method/Action name |
| params | <code>JSON</code> |  | parameters |
| amount_asset |  |  | "100 GXC" - The amount of asset for payable action |
| broadcast | <code>Boolean</code> | <code>false</code> | Broadcast the transaction or just return a serialized transaction |

<a name="GXClient+vote"></a>

### gxClient.vote(account_ids, fee_paying_asset, broadcast) ⇒ <code>Promise.&lt;any&gt;</code>
vote for accounts

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Description |
| --- | --- |
| account_ids | An array of account_id to vote |
| fee_paying_asset | The asset to pay the fee |
| broadcast |  |

<a name="GXClient+fee"></a>

### gxClient.fee(operation, feeAssetId) ⇒ <code>Promise.&lt;any&gt;</code>
calculate fee of a operation

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param | Default |
| --- | --- |
| operation |  | 
| feeAssetId | <code>1.3.1</code> | 

<a name="GXClient+_accMult"></a>

### gxClient.\_accMult(arg1, arg2) ⇒ <code>number</code>
accurate multiply - fix the accurate issue of javascript

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| arg1 | 
| arg2 | 

<a name="GXClient+_processTransaction"></a>

### gxClient.\_processTransaction(tr, broadcast) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>
process transaction

**Kind**: instance method of [<code>GXClient</code>](#GXClient)  

| Param |
| --- |
| tr | 
| broadcast | 

