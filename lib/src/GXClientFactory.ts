/**
 * @module GXClientFactory
 */
import GXClient from './GXClient';

let ins = null;

function formatNetwork(network = '') {
  return network.replace('https://', 'wss://').replace('http://', 'ws://');
}

function needNewIns(oldIns, {account, network = ''}) {
  if (account != oldIns.account_id_or_name || (formatNetwork(network) != oldIns.witness)) {
    return true;
  } else {
    return false;
  }
}

function createNewIns({keyProvider, account, network = '', signatureProvider,nonceProvider}) {
  return new GXClient(keyProvider, account, formatNetwork(network), signatureProvider,nonceProvider);
}

function resetInsProperty(oldIns, {keyProvider, signatureProvider,nonceProvider}) {
  oldIns.private_key = keyProvider;
  oldIns.signProvider = signatureProvider;
  oldIns.nonceProvider = nonceProvider;
}

/**
 * A singleton factory for GXClient
 */
export default {
  constructor() {
    throw new Error('Usage: GXClientFactory.instance({keyProvider, account, network, signatureProvider, nonceProvider})');
  },

  /**
     * get GXClient instance
     * @param keyProvider {String} - private key
     * @param account {String} - '1.2.12'|'gxcaccount'
     * @param network {String} - entry point network address
     * @param signatureProvider {signatureProvider} 
     * @returns {GXClient}
     */
  instance({keyProvider, account, network = '', signatureProvider, nonceProvider}) {
    if (!!ins) {
      if (needNewIns(ins, { account, network })) {
        ins = createNewIns({keyProvider, account, network, signatureProvider,nonceProvider});
      } else {
        resetInsProperty(ins, {keyProvider, signatureProvider,nonceProvider});
      }
    } else {
      ins = createNewIns({keyProvider, account, network, signatureProvider,nonceProvider});
    }

    return ins;
  }
};

/**
 * This callback is displayed as a global member.
 * @callback signatureProvider
 * @param transaction {TransactionBuilder}
 * @param chain_id {String} - Chain Id
 */
