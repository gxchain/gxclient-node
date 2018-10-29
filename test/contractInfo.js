import GXClient from "../lib/src/GXClient";

let client = new GXClient("", "", "wss://testnet.gxchain.org");

let contractName = "redpacket";

client.getContractTable(contractName).then(tables => {
    console.log(tables);
    let promises = tables.map(table => client.getTableObjects(contractName, table.name));

    Promise.all(promises).then(infos => {
        tables.forEach((table, i) => {
            console.log(table.name, infos[i]);
        });
    });
});
