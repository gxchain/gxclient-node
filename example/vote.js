import client from './client';

client
  .vote(['init1'], true, { fee_symbol: 'GXC' })
  .then((result) => {
    console.log(JSON.stringify(result, null, '  '));
  })
  .catch((ex) => {
    console.error(ex);
  });
