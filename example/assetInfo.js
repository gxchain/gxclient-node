import GXClientFactory from "../lib";

let client = GXClientFactory.instance({network: "https://testnet.gxchain.org"});
client.getAsset("GXC").then(asset => {
    console.log(asset);
}).catch(ex => {
    console.error(ex);
});
