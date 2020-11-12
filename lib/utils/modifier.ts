// DO NOT change it to import {Serializer,types} from 'gxbjs', it may cause failed to gen types
import Serializer from 'gxbjs/dist/serializer/src/serializer';
import types from 'gxbjs/dist/serializer/src/types';

const setTypeString = (target, type) => {
  Object.defineProperty(target, 'typeString', {
    value: type,
    writable: false
  });
};

const proxy = (target, type) => {
  const old = target;
  return (...args) => {
    const result = old(...args);
    setTypeString(result, type);
    return result;
  };
};

const arrayProxy = (target) => {
  const old = target;
  return (obj) => {
    const result = old(obj);
    if (obj instanceof Serializer) {
      Object.defineProperty(result, 'genTypes', {
        value: (count = 1) => `Array<{\n${(obj as any).genTypes.call(obj, count)}${pretty(count - 1)}}>`,
        writable: false
      });
      Object.defineProperty(result, 'operation_name', {
        value: obj.operation_name,
        writable: false
      });
    } else if (obj.typeString) {
      setTypeString(result, `Array<${obj.typeString}>`);
    } else {
      setTypeString(result, 'Array<any>');
    }
    Object.defineProperty(result, 'arrayFlag', {
      value: true,
      writable: false
    });
    return result;
  };
};

setTypeString(types.uint8, 'number');
setTypeString(types.uint16, 'number');
setTypeString(types.uint32, 'number');
setTypeString(types.varint32, 'number');
setTypeString(types.int64, 'number | string');
setTypeString(types.uint64, 'number | string');
setTypeString(types.string, 'string');
setTypeString(types.bool, 'boolean');
setTypeString(types.void, 'any');
setTypeString(types.time_point_sec, 'number | string');
setTypeString(types.object_id_type, 'string');
setTypeString(types.vote_id, 'string');
setTypeString(types.public_key, 'string');
setTypeString(types.address, 'string');
setTypeString(types.name_type, 'string');
setTypeString(types.checksum160, 'string');
setTypeString(types.checksum256, 'string');
setTypeString(types.checksum512, 'string');
setTypeString(types.block_id_type, 'string');

types.bytes = proxy(types.bytes, 'string');
types.array = arrayProxy(types.array);
types.set = arrayProxy(types.set);
types.fixed_array = arrayProxy(types.fixed_array);
types.protocol_id_type = proxy(types.protocol_id_type, 'number | string');
types.static_variant = proxy(types.static_variant, '[number, any]');

const oldOptional = types.optional;
types.optional = (obj) => {
  const result = oldOptional(obj);
  if (obj instanceof Serializer) {
    Object.defineProperty(result, 'genTypes', {
      value: (obj as any).genTypes.bind(obj),
      writable: false
    });
    Object.defineProperty(result, 'operation_name', {
      value: obj.operation_name,
      writable: false
    });
  } else {
    setTypeString(result, obj.typeString);
  }
  Object.defineProperty(result, 'optionalFlag', {
    value: true,
    writable: false
  });
  return result;
};

const oldMap = types.map;
types.map = (key, val) => {
  const initGenTypes = (obj) => {
    if (obj instanceof Serializer) {
      if (typeMap.get(obj.operation_name) === true) {
        return () => obj.operation_name;
      } else {
        return (count = 1) => `{\n${(obj as any).genTypes.call(obj, count)}${pretty(count - 1)}}`;
      }
    } else if (obj.typeString) {
      return () => obj.typeString;
    } else {
      return () => 'any';
    }
  };
  const result = oldMap(key, val);
  const keyGenTypes = initGenTypes(key);
  const valGenTypes = initGenTypes(val);
  Object.defineProperty(result, 'genTypes', {
    value: (count = 1) => `Array<[${keyGenTypes(count)}, ${valGenTypes(count)}]>`,
    writable: false
  });
  return result;
};

const pretty = (count) => {
  let result = '';
  for (let i = 0; i < count; i++) {
    result += '\t';
  }
  return result;
};

const typeMap = new Map();
Serializer.prototype.genTypes = function (count = 1) {
  let result = '';
  for (const k of Object.keys(this.types)) {
    if (k === 'operations') {
      result += `${pretty(count)}operations: operations\n`;
    } else if (k === 'signatures') {
      result += `${pretty(count)}signatures: Array<string>\n`;
    } else if (k === 'operation_results') {
      result += `${pretty(count)}operation_results: Array<[number, any]>\n`;
    } else if (this.types[k].typeString !== undefined) {
      result += `${pretty(count)}${k}${this.types[k].optionalFlag === true ? '?:' : ':'} ${this.types[k].typeString}\n`;
    } else if (typeMap.get(this.types[k].operation_name) === true) {
      if (this.types[k].arrayFlag === true) {
        result += `${pretty(count)}${k}${this.types[k].optionalFlag === true ? '?:' : ':'} Array<${this.types[k].operation_name}>\n`;
      } else {
        result += `${pretty(count)}${k}${this.types[k].optionalFlag === true ? '?:' : ':'} ${this.types[k].operation_name}\n`;
      }
    } else {
      const subResult = this.types[k].genTypes.call(this.types[k], count + 1);
      if (subResult[0] !== 'A') {
        result += `${pretty(count)}${k}${this.types[k].optionalFlag === true ? '?:' : ':'} {\n${subResult}${pretty(count)}}\n`;
      } else {
        result += `${pretty(count)}${k}${this.types[k].optionalFlag === true ? '?:' : ':'} ${subResult}\n`;
      }
    }
  }
  typeMap.set(this.operation_name, true);
  return result;
};

Serializer.prototype.genInterface = function (changeName) {
  const result = `export interface ${changeName ? changeName(this.operation_name) : this.operation_name} {\n${this.genTypes()}}`;
  return result;
};
