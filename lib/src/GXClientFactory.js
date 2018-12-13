import GXClient from "./GXClient";

let store = {
    key: null,
    client: null
};

/**
 * A singleton factory for GXClient
 */
export default {
    constructor() {
        throw new Error("Usage: GXClientFactory.instance({keyProvider, account, network, signatureProvider})");
    },
    /**
     * generate unique client key for options
     * @param keyProvider
     * @param account
     * @param network
     * @param signatureProvider
     * @returns {string}
     * @private
     */
    _clientKey({keyProvider, account, network, signatureProvider}) {
        let hasKeyProvider = keyProvider ? 1 : 0;
        let hasSignatureProvider = !!signatureProvider ? 1 : 0;
        return `${account}|${network}|${hasKeyProvider}|${hasSignatureProvider}`;
    },

    /**
     * get GXClient instance
     * @param keyProvider
     * @param account
     * @param network
     * @param signatureProvider
     * @returns {*}
     */
    instance({keyProvider, account, network, signatureProvider}) {
        let clientKey = this._clientKey({keyProvider, account, network, signatureProvider});
        if (clientKey !== store.key) {
            if (store.client) {
                // close current connection before we create new client
                return store.client.close();
                store.key = clientKey;
                store.client = new GXClient(keyProvider, account, network.replace("https://", "wss://").replace("http://", "ws://"), signatureProvider);
                return store.client;
            } else {
                // assign a new client key
                store.key = clientKey;
            }
        }
        if (!store.client) {
            // initialize a client when no instance was created
            store.client = new GXClient(keyProvider, account, network.replace("https://", "wss://").replace("http://", "ws://"), signatureProvider);
        }
        return store.client;
    }
};
