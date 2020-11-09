import * as ops from './opertaions.js';
import fs from 'fs';

var content = '';
var opertaions = '';
for (let op of Object.keys(ops)) {
  if (typeof ops[op].genInterface === 'function') {
    content += ops[op].genInterface.call(ops[op]) + '\n\n';
  }

  if (op.indexOf('_operation_fee_parameters') !== -1) {
    opertaions = opertaions === '' ? op : opertaions + ' | ' + op;
  }
}

content += `export type singleOperation = ${opertaions};\n`;
content += 'export type operation = [number, singleOperation];\n';
content += 'export type operations = Array<operation>;';

fs.writeFileSync('./lib/types/types.ts', content);