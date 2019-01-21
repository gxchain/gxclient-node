import GXClientFactory from "../lib";

let client = GXClientFactory.instance({network: "https://testnet.gxchain.org"});
/**
 * 1.2.* account object
 * 1.3.* asset object
 * 2.0.0 global property object
 * 2.1.0 dynamic global parameter object
 */
client.getObject("2.1.0").then(result => {
    console.log(result);
}).catch(ex => {
    console.error(ex);
});
