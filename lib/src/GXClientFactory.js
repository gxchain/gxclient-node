import GXClient from "./GXClient";

let clients = {};

export default {
    constructor() {
        throw new Error("Usage: GXClientFactory.instance({keyProvider, account, network, signatureProvider})");
    },
    instance({keyProvider, account, network, signatureProvider}) {
        let hasKeyProvider = keyProvider ? 1 : 0;
        let hasSignatureProvider = !!signatureProvider ? 1 : 0;
        let clientKey = `${account}|${network}|${hasKeyProvider}|${hasSignatureProvider}`;
        if (!clients[clientKey]) {
            clients[clientKey] = new GXClient(keyProvider, account, network.replace("https://", "wss://").replace("http://", "ws://"), signatureProvider);
        }
        return clients[clientKey];
    }
};
