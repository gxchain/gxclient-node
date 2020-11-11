import client from './client';

client
  .createStaking('init0', 10, '5', true)
  .then((result) => {
    console.log(result);
  })
  .catch((ex) => {
    console.error(ex);
  });
