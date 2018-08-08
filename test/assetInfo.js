import GXClient from "../lib/src/GXClient";

let client = new GXClient();
client.getAsset("GXS").then(asset => {
    console.log(asset);
});
