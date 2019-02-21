import { serialize, Types } from "../lib";
import {assert} from "chai";

describe("serialize", () => {

    it("omit type with string 'hello'", () => {
        assert.equal(serialize("hello").toString("hex"), "0568656c6c6f");
    });

    it("string 'hello'", () => {
        assert.equal(serialize("hello", Types.string).toString("hex"), "0568656c6c6f");
    });

    it("contract_asset", () => {
        assert.equal(serialize({
            amount: 1234567,
            asset_id: 4
        }, Types.contract_asset).toString("hex"), "87d61200000000000400000000000000");
    });
});