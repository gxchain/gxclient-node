import { Signature, serialize } from "../lib";
import { assert } from "chai";

describe("Signature signBuffer", () => {

    it("normal", () => {
        const buf = Buffer.from("hello");
        const sig = Signature.signBuffer(buf, "5KQNge45iAFohAJFnXowuPk3ob3eiGbAQMCtff7tM78i5RNywMe").toHex();
        assert.equal(sig, "1f518acd761dc47ac5075eba0ae8898129593222d42ec8432b1cba60dd3f6c9d952937b43074b6a0f746dffc6a18e43ba24d212f8c73f9f9849dc7983028452bf4");
    });

    it("serialized buffer", () => {
        const buf = serialize("hello");
        const sig = Signature.signBuffer(buf, "5KQNge45iAFohAJFnXowuPk3ob3eiGbAQMCtff7tM78i5RNywMe").toHex();
        assert.equal(sig, "1f7cf5ee0123d8c9ed9e3f0981656088310486e6b50a6f02ae3cd61f3fcdb8333f3951464cf8c09701db7494468a024ccb7a862c3407c6eccd4ffce5a2ae3250e3");
    });
});