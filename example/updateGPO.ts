import client from './client';

client
  .proposeUpdateGPO({ block_interval: 4 }, true)
  .then((tx) => {
    console.log(tx);
  })
  .catch((ex) => {
    console.error(ex);
  });
