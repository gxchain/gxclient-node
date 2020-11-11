import client from './client';
import { types } from '../lib'

const tx: types.signed_transaction = {
  ref_block_num: 63800,
  ref_block_prefix: 244986909,
  expiration: '2019-01-21T08:15:22',
  operations: [
    [
      0,
      {
        fee: { amount: '1179', asset_id: '1.3.1' },
        from: '1.2.1110',
        to: '1.2.850',
        amount: { amount: '1000000', asset_id: '1.3.1' },
        memo: {
          from: 'GXC69R784krfXRuFYMuNwhTTnMGPMuCSSng3WPssL6vrXRqTYCLT4',
          to: 'GXC8H1wXTAUWcTtogBmA5EW8TUWLA6T1kAXwMKYtnNuqAe1VCXFD9',
          nonce: '396302966195245',
          message: '2fd016f9c38546c2d5d6cebcde8bbd74'
        },
        extensions: []
      }
    ]
  ],
  extensions: [],
  signatures: ['1f2aa2880789bc7c6a5ce41959edd55b4e79f557c4e9495ea6fbd2a41118fa9f033b515e08c800081ec0a98bf7661c6bdd2795b8d47759982d5be8030efeb55a24']
};

client
  .broadcast(tx)
  .then((result) => {
    console.log(result);
  })
  .catch((ex) => {
    console.error('error', ex);
  });
