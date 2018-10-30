import {GXClient} from "../lib";

let client = new GXClient("", "", "wss://testnet.gxchain.org");

let contractName = "redpacket";

client.getContractABI(contractName).then(abi => {
    // describe the tables
    console.log(abi.tables);

    let promises = abi.tables.map(table => client.getTableObjects(contractName, table.name));
    Promise.all(promises).then(infos => {
        abi.tables.forEach((table, i) => {
            console.log(table.name, infos[i]);
        });
    });
});
