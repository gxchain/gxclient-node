import axios from 'axios';
import * as types from '../types/types';

let callID = 0;

class GXRPC {
  service: string

  constructor(service: string) {
    this.service = service;
  }

  static instance(service: string): GXRPC {
    return new GXRPC(service);
  }

  query(method: string, params: any): Promise<any> {
    return axios.post(this.service, {
      jsonrpc: '2.0',
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

  broadcast(tx: types.signed_transaction): Promise<string[]> {
    return axios.post(this.service, {
      jsonrpc: '2.0',
      method: 'call',
      params: [2, 'broadcast_transaction', [tx]],
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
