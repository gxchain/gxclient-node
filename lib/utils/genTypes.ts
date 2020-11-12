import './modifier';
import { ops } from 'gxbjs';
import fs from 'fs';
import path from 'path';

let content = '';
const opertaions = [];
let repeatedFlag = false;

for (const op of Object.keys(ops)) {
  if (typeof ops[op].genInterface === 'function') {
    content +=
      ops[op].genInterface.call(ops[op], (name) => {
        if (name === 'free_data_product_update' && !repeatedFlag) {
          repeatedFlag = true;
          return 'stale_' + name;
        } else {
          return name;
        }
      }) + '\n\n';
  }
}

repeatedFlag = false;
for (const op of ops.operation.st_operations) {
  if (op.operation_name === 'free_data_product_update' && !repeatedFlag) {
    repeatedFlag = true;
    opertaions.push('stale_' + op.operation_name);
  } else {
    opertaions.push(op.operation_name);
  }
}

content += 'export type operation = ';
for (let i = 0; i < opertaions.length; i++) {
  const op = opertaions[i];
  content += i === 0 ? `[GXChainOperation.${op}, ${op}]` : ` | [GXChainOperation.${op}, ${op}]`;
}
content += '\n';

content += 'export type operations = Array<operation>;\n\n';
content += `export enum GXChainOperation {\n\t${opertaions.join(',\n\t')}\n};`;

fs.writeFileSync(path.join(__dirname, '../types/types.ts'), content);
