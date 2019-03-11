import { types, Serializer } from "gxbjs/es/index";

/**
 * @module serialize
 */

/**
 * @static serialize
 * @function
 * @param data {*} - a buffer
 * @param type {Object} - you can import types from as: `import {Types} from 'gxclient'`
 * @returns {Object} a buffer
 * @example 
 * import { serialize, Types } from 'gxclient'
 * serialize('hello', Types.string).toString('hex') // => 0568656c6c6f
 */
export default function serialize(data, type = types.string){
    if(type instanceof Serializer){ 
        return type.toBuffer(data);
    }else {
        const ser = new Serializer("temp", {
            temp: type
        });
        return ser.toBuffer({
            temp: data
        });
    }
}