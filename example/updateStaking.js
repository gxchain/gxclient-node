import client from './client';

client
  .updateStaking('init1', '1.27.10123', true)
  .then((result) => {
    console.log(result);
  })
  .catch((ex) => {
    console.error(ex);
  });
