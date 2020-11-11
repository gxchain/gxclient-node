import client from './client';
client
  .getAsset('GXC')
  .then((asset) => {
    console.log(asset);
  })
  .catch((ex) => {
    console.error(ex);
  });
