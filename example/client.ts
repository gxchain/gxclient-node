import GXClientFactory from '../lib';

const private_key = '5J7Yu8zZD5oV9Ex7npmsT3XBbpSdPZPBKBzLLQnXz5JHQVQVfNT';
const account_id = 'gxb122';

const client = GXClientFactory.instance({
  keyProvider: private_key,
  account: account_id,
  network: 'https://testnet.gxchain.org'
});

export default client;
