import client from './client';

client.getAccountBalances('gxb121').then((balances) => {
  console.log(balances);
  client.getAccountByPublicKey('GXC5jynfNTY35xBkFTSKDUfzRrHDmruDCwmcPAU97gyeupKZwfzUh').then((result) => {
    console.log(result);
  });
});
