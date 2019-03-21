---
title: Signature
---

# Signature

<a name="module_Signature"></a>

## Signature
<a name="module_Signature.signBuffer"></a>

### Signature.signBuffer(buffer, private_key) ⇒ <code>Signature</code>
**Kind**: static method of [<code>Signature</code>](#module_Signature)  
**Returns**: <code>Signature</code> - you can use .toHex to get signature hex string  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Object</code> | a buffer |
| private_key | <code>String</code> | private key |

**Example**  
```js
import { Signature } from 'gxclient'
const buf = Buffer.from('hello')
Signature.signBuffer(buf, '5KQNge45iAFohAJFnXowuPk3ob3eiGbAQMCtff7tM78i5RNywMe')
```
**Example**  
```js
// if you want to use verify_signature function in contract, you must serialize your buffer first
import {serialize, Types} from 'gxclient'
const buf = serialize('hello', Types.string)
Signature.signBuffer(buf, '5KQNge45iAFohAJFnXowuPk3ob3eiGbAQMCtff7tM78i5RNywMe')
```
