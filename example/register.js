import client from './client';
let keyPair = client.generateKey();
console.log(keyPair);

client
  .register('gxb123', keyPair.publicKey, '', '', 'https://testnet.faucet.gxchain.org')
  .then((resp) => {
    console.log(JSON.stringify(resp));
  })
  .catch((ex) => {
    console.error('register failed:', ex);
  });
