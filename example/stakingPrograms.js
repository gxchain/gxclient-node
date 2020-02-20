import client from './client';

client.getStakingPrograms().then((programs) => {
  console.log(programs);
});
