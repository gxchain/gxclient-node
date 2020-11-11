import { GXRPC } from '../lib';

const rpc = GXRPC.instance('https://node1.gxb.io');
rpc
  .query('get_chain_id', [])
  .then((resp) => {
    console.log(resp);
  })
  .catch((ex) => {
    console.error('error', ex);
  });
