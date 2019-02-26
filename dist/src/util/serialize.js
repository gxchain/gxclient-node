"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = serialize;

var _gxbjs = require("gxbjs");

function serialize(data) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _gxbjs.types.string;

    if (type instanceof _gxbjs.Serializer) {
        return type.toBuffer(data);
    } else {
        var ser = new _gxbjs.Serializer("temp", {
            temp: type
        });
        return ser.toBuffer({
            temp: data
        });
    }
}