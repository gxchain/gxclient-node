import GXClient from "./GXClient";

let clients = {};

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
        if (!this.exists({keyProvider, account, network, signatureProvider})) {
            clients[clientKey] = new GXClient(keyProvider, account, network.replace("https://", "wss://").replace("http://", "ws://"), signatureProvider);
        }
        return clients[clientKey];
    },
    /**
     * judge if client already exists
     * @param keyProvider
     * @param account
     * @param network
     * @param signatureProvider
     * @returns {boolean}
     */
    exists({keyProvider, account, network, signatureProvider}) {
        return !!clients[this._clientKey({keyProvider, account, network, signatureProvider})];
    }
};
