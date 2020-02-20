import client from './client';
/**
 * 1.2.* account object
 * 1.3.* asset object
 * 2.0.0 global property object
 * 2.1.0 dynamic global parameter object
 */
client
  .getObject('2.1.0')
  .then((result) => {
    console.log(result);
  })
  .catch((ex) => {
    console.error(ex);
  });
