import client from './client';

client
  .transfer('youxiu123', '', '1 GXC', true)
  .then((trx) => {
    console.log('transfer success', trx);
  })
  .catch((error) => {
    if (error.code === 432) {
      alert("you don't authorize identity!");
    }
    console.error(error);
  });

client
  .vote(['math-wallet-test', 'gxc-pacific'], 'GXC', true)
  .then((trx) => {
    console.log('vote success', trx);
  })
  .catch((error) => {
    console.error(error);
  });

client.getAccount('lzydophin94').then((res) => {
  console.log('aaacccc', res);
});
