import client from './client';

client
  .claimStaking('1.27.10123', true)
  .then((result) => {
    console.log(result);
  })
  .catch((ex) => {
    console.error(ex);
  });
