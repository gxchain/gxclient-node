import {GXClient} from "../lib";

let client = new GXClient();
client.getAsset("GXS").then(asset => {
    console.log(asset);
}).catch(ex=>{
    console.error(ex);
});
