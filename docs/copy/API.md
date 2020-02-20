# Overview

## constructor

[GXClient](/api/GXClient.html#gxclient)

## Singleton

[GXClientFactory](/api/GXClientFactory.html#gxclientfactory)

## Keypair API

[generateKey()](/api/GXClient.html#gxclient-generatekey-⇒-object) ⇒ <code>Object</code>

[privateToPublic(privateKey)](/api/GXClient.html#gxclient-privatetopublic-privatekey-⇒-string) ⇒ <code>String</code>

[isValidPublic(publicKey)](/api/GXClient.html#gxclient-isvalidpublic-publickey-⇒-boolean) ⇒ <code>boolean</code>

[isValidPrivate(privateKey)](/api/GXClient.html#gxclient-isvalidprivate-privatekey-⇒-boolean) ⇒ <code>boolean</code>

## Chain API

[getChainID()](/api/GXClient.html#gxclient-getchainid-⇒-request-promiselike-t-promise-t) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>

[getDynamicGlobalProperties()](/api/GXClient.html#gxclient-getdynamicglobalproperties-⇒-request-promiselike-t-promise-t) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>

[getBlock(blockHeight)](/api/GXClient.html#gxclient-getblock-blockheight-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

[getObject(object_id)](/api/GXClient.html#gxclient-getobject-object-id-⇒-request-promiselike-t-promise-t) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>

[getObjects(object_ids)](/api/GXClient.html#gxclient-getobjects-object-ids-⇒-request-promiselike-t-promise-t) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>

[transfer(to, memo, amount_asset, broadcast, options)](/api/GXClient.html#gxclient-transfer-to-memo-amount-asset-broadcast-options-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

[vote(account_ids, broadcast, options)](/api/GXClient.html#gxclient-vote-accounts-broadcast-options-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

[broadcast(tx)](/api/GXClient.html#gxclient-broadcast-tx-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

## Faucet API

[register(account, activeKey, ownerKey, memoKey, faucet)](/api/GXClient.html#gxclient-register-account-activekey-ownerkey-memokey-faucet-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

## Account API

[getAccount(account_name)](/api/GXClient.html#gxclient-getaccount-account-name-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

[getAccountByPublicKey(publicKey)](/api/GXClient.html#gxclient-getaccountbypublickey-publickey-⇒-request-promiselike-t-promise-t) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>

[getAccountBalances(account_name)](/api/GXClient.html#gxclient-getaccountbalances-account-name-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

## Asset API

[getAsset(symbol)](/api/GXClient.html#gxclient-getasset-symbol-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

## Staking API

[getStakingPrograms()](/api/GXClient.html#gxclient-getstakingprograms)

[createStaking(to, amount, program_id, options)](/api/GXClient.html#gxclient-createstaking-to-amount-program-id-options-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

[updateStaking(to, staking_id, options)](/api/GXClient.html#gxclient-updatestaking-to-staking-id-options-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

[claimStaking(to, staking_id, options)](/api/GXClient.html#gxclient-claimstaking-to-staking-id-options-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

## Contract API

[callContract(contract_name, method_name, params, amount_asset, broadcast, options)](/api/GXClient.html#gxclient-callcontract-contract-name-method-name-params-amount-asset-broadcast-options-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

[createContract(contract_name, code, abi, vm_type, vm_version, broadcast, options)](/api/GXClient.html#gxclient-createcontract-contract-name-code-abi-vm-type-vm-version-broadcast-options-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

[updateContract(contract_name, newOwner, code, abi, broadcast, options)](/api/GXClient.html#gxclient-updatecontract-contract-name-newowner-code-abi-broadcast-options-⇒-request-promiselike-t-promise-t) ⇒ <code>Request</code> \| <code>PromiseLike.&lt;T&gt;</code> \| <code>Promise.&lt;T&gt;</code>

[getContractTable(contract_name)](/api/GXClient.html#gxclient-getcontracttable-contract-name-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

[getContractABI(contract_name)](/api/GXClient.html#gxclient-getcontractabi-contract-name-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>

[getTableObjects(contract_name, table_name, start, limit)](/api/GXClient.html#gxclient-gettableobjects-contract-name-table-name-start-limit-⇒-promise-any) ⇒ <code>Promise.&lt;any&gt;</code>
