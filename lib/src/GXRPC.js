import axios from "axios";

let callID = 0;

class GXRPC {
    constructor(service) {
        this.service = service;
    }

    static instance(service) {
        return new GXRPC(service);
    }

    query(method, params) {
        return axios.post(this.service, {
            jsonrpc: "2.0",
            method: method,
            params: params,
            id: ++callID
        }).then(resp => {
            if (resp.data.error) {
                return Promise.reject(resp.data.error);
            } else {
                return resp.data.result;
            }
        });
    }

    broadcast(tx) {
        return axios.post(this.service, {
            jsonrpc: "2.0",
            method: "call",
            params: [2, "broadcast_transaction_synchronous", [tx]],
            id: ++callID
        }).then(resp => {
            if (resp.data.error) {
                return Promise.reject(resp.data.error);
            } else {
                // to adapt with old version, make the result an array
                return [resp.data.result];
            }
        });
    }
}

export default GXRPC;
