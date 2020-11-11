import client from './client';
const keypairs = client.generateKey();
console.log(keypairs, client.privateToPublic(keypairs.privateKey), client.isValidPrivate(keypairs.privateKey), client.isValidPublic(keypairs.publicKey));