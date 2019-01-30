---
title: GXClientFactory
---
## Modules

<dl>
<dt><a href="#module_GXClientFactory">GXClientFactory</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#signatureProvider">signatureProvider</a> : <code>function</code></dt>
<dd><p>This callback is displayed as a global member.</p>
</dd>
</dl>

<a name="module_GXClientFactory"></a>

## GXClientFactory

* [GXClientFactory](#module_GXClientFactory)
    * [module.exports](#exp_module_GXClientFactory--module.exports) ⏏
        * [.instance(keyProvider, account, network, signatureProvider)](#module_GXClientFactory--module.exports.instance) ⇒ <code>GXClient</code>

<a name="exp_module_GXClientFactory--module.exports"></a>

### module.exports ⏏
A singleton factory for GXClient

**Kind**: Exported member  
<a name="module_GXClientFactory--module.exports.instance"></a>

#### module.exports.instance(keyProvider, account, network, signatureProvider) ⇒ <code>GXClient</code>
get GXClient instance

**Kind**: static method of [<code>module.exports</code>](#exp_module_GXClientFactory--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| keyProvider | <code>String</code> | private key |
| account | <code>String</code> | '1.2.12'|'gxcaccount' |
| network | <code>String</code> | entry point network address |
| signatureProvider | [<code>signatureProvider</code>](#signatureProvider) |  |

<a name="signatureProvider"></a>

## signatureProvider : <code>function</code>
This callback is displayed as a global member.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| transaction | <code>TransactionBuilder</code> |  |
| chain_id | <code>String</code> | Chain Id |

