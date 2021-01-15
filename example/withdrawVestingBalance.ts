import client from './client';

client
  .withdrawVestingBalance('1.13.1463', 1, true)
  .then((result) => {
    console.log(result);
  })
  .catch((ex) => {
    console.error(ex);
  });
