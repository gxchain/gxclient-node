import { types, Serializer } from "gxbjs";

export default function serialize(data, type = types.string){
    if(type instanceof Serializer){ 
        return type.toBuffer(data);
    }else {
        const ser = new Serializer("temp", {
            temp: type
        });
        return ser.toBuffer({
            temp: data
        });
    }
}