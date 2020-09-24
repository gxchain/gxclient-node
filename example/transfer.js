import client from './client';
// set broadcast to false so we could calculate the fee before broadcasting
let broadcast = true;

//Sending 10GXC to gxb121 with memo "GXChain NB"
(async () => {
  try {
    let transaction = await client.transfer('gxb121', 'GXChain 🐂🍺', '10.00001 GXC', broadcast);
    console.log(JSON.stringify(transaction, null, '  '));
    // let txresult = await client.broadcast(transaction);
    // console.log(txresult);
  } catch (ex) {
    console.error(ex);
  }
})();
