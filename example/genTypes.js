import * as ops from './opertaions.js';
import fs from 'fs';

var content = '';
var opertaions = [];
var repeatedFlag = false;

for (let op of Object.keys(ops)) {
  if (typeof ops[op].genInterface === 'function') {
    content += ops[op].genInterface.call(ops[op], (name) => {
      if (name === 'free_data_product_update' && !repeatedFlag) {
        repeatedFlag = true;
        return 'stale_' + name;
      }
      else {
        return name;
      }
    }) + '\n\n';
  }
}

repeatedFlag = false;
for (let op of ops.operation.st_operations) {
  if (op.operation_name === 'free_data_product_update' && !repeatedFlag) {
    repeatedFlag = true;
    opertaions.push('stale_' + op.operation_name);
  }
  else {
    opertaions.push(op.operation_name);
  }
}

content += `export type singleOperation = ${opertaions.join(' | ')};\n`;
content += 'export type operation = [GXChainOperation, singleOperation];\n';
content += 'export type operations = Array<operation>;\n\n';
content += `export enum GXChainOperation {\n\t${opertaions.join(',\n\t')}\n};`;

fs.writeFileSync('./lib/types/types.ts', content);