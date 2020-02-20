import { Aes, PrivateKey } from 'gxbjs';
import client from './client';

const memo_private = client.private_key;

// start to detect new transactions related to my account from the indicated block
client.detectTransaction(10595260, function(blockHeight, txid, operation) {
  console.log(blockHeight, txid, operation);
  //deal with transfer operation
  if (operation[0] === 0) {
    // deal with deposit
    if (operation[1].to === account_id) {
      let memo = operation[1].memo;
      // decrypt memo if assigned
      if (memo && memo_private) {
        let decryptedMsg = Aes.decrypt_with_checksum(PrivateKey.fromWif(memo_private), memo.from, memo.nonce, memo.message);
        console.log('memo:', decryptedMsg);
        // TODO: Persistent blockHeight, txid and operation to the database,
        // it's recommended to use blockHeight and txid as the primary key
      } else {
        console.log('no memo:', txid);
      }
    }
    // deal with withdraw
    if (operation[1].from === account_id) {
      console.log(txid, ' should be confirmed');
    }
  }
});
