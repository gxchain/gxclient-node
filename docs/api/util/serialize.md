---
title: serialize
---

# serialize

<a name="module_serialize"></a>

## serialize
<a name="exp_module_serialize--module.exports"></a>

### .module.exports(data, type) ⇒ <code>Object</code> ⏏
**Kind**: static method of [<code>serialize</code>](#module_serialize)  
**Returns**: <code>Object</code> - a buffer  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | a buffer |
| type | <code>Object</code> | you can import types from as: `import {Types} from 'gxclient'` |

**Example**  
```js
import { serialize, Types } from 'gxclient'
serialize('hello', Types.string).toString('hex') // => 0568656c6c6f
```
