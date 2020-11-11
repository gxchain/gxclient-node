import client from './client';

// set broadcast to false so we could calculate the fee before broadcasting
const broadcast = true;

const contractName = 'bank';

// Calling deposit method of bank contract
client
  .callContract(contractName, 'deposit', '10 GXC', null, broadcast)
  .then((resp) => {;
    console.log(resp);
  })
  .catch((ex) => {
    console.error(ex);
  });
