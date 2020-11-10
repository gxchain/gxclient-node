import { Aes, key, object_id_type, PrivateKey, PublicKey, string_to_name, TransactionHelper } from 'gxbjs/dist/index';
import { serializeCallData } from 'gxbjs/dist/tx_serializer';
import { TransactionBuilder } from './TransactionBuilder';
import { generateMnemonic } from './util/memonic';
import uniq from 'lodash/uniq';
import { DEFUALT_EXPIRE_SEC } from '../const/const';
import axios from 'axios';
import GXRPC from './GXRPC';
import * as types from '../types/types'

/**
 * This callback is displayed as a global member.
 * @callback signatureProvider
 * @param transaction {TransactionBuilder}
 * @param chain_id {String} - Chain Id
 */

/**
 * GXClient Class
 */
class GXClient {

  private_key: string;
  account_id_or_name: number | string;
  account_id: string;
  account: string;
  connected: boolean;
  chain_id: string;
  witness: string;
  signProvider: (transaction: TransactionBuilder, chain_id: string) => Promise<Buffer>;
  nonceProvider: () => string;
  host: string;
  rpc: GXRPC;
  isTaskStarted: boolean;
  latestBlock: number;

  /**
   *
   * @param {String} private_key - private key
   * @param {String} account_id_or_name - e.g: '1.2.44'|'gxcaccount'
   * @param {String} entry_point - entry point network address
   * @param {signatureProvider} signProvider
   */
  constructor(private_key: string, account_id_or_name: string, entry_point: string = 'wss://node1.gxb.io', signProvider?: (transaction: TransactionBuilder, chain_id: string) => Promise<Buffer>, nonceProvider?: () => string) {
    this.private_key = private_key;
    this.account_id_or_name = account_id_or_name;
    if (/^1.2.\d+$/.test(account_id_or_name)) {
      this.account_id = account_id_or_name;
    } else {
      this.account = account_id_or_name;
    }
    this.connected = false;
    this.chain_id = '';
    this.witness = entry_point;
    this.signProvider = signProvider;
    this.nonceProvider = nonceProvider;
    this.host = this.witness.replace('wss://', 'https://').replace('ws://', 'http://');
    this.rpc = GXRPC.instance(this.host);
  }

  /**
   * generate key pair locally
   * @returns {{brainKey: *, privateKey: *, publicKey: *}}
   */
  generateKey(brainKey: string): {
    brainKey: string,
    privateKey: string,
    publicKey: string
  } {
    brainKey = brainKey || generateMnemonic(160); // generate a new brain key if not assigned
    let privateKey = key.get_brainPrivateKey(brainKey);
    let publicKey = privateKey.toPublicKey().toPublicKeyString();
    return {
      brainKey,
      privateKey: privateKey.toWif(),
      publicKey
    };
  }

  /**
   * export public key from private key
   * @param privateKey {String}
   * @returns {String}
   */
  privateToPublic(privateKey: string): string {
    return PrivateKey.fromWif(privateKey)
      .toPublicKey()
      .toPublicKeyString();
  }

  /**
   * check if public key is valid
   * @param publicKey {String}
   * @returns {boolean}
   */
  isValidPublic(publicKey: string): boolean {
    return !!PublicKey.fromPublicKeyString(publicKey);
  }

  /**
   * check if private key is valid
   * @param privateKey {String}
   * @returns {boolean}
   */
  isValidPrivate(privateKey: string): boolean {
    try {
      return !!PrivateKey.fromWif(privateKey);
    } catch (ex) {
      return false;
    }
  }

  /**
   * register an account by faucet
   * @param account {String} - Account name
   * @param activeKey {String} - Public Key for account operator
   * @param ownerKey {String} - Public Key for account owner
   * @param memoKey {String} - Public Key for memo
   * @param faucet {String} - faucet url
   * @returns {Promise<any>}
   * @example
   * curl ‘https://opengateway.gxb.io/account/register' -H 'Content-type: application/json' -H 'Accept: application/json’ -d ‘{“account”:{“name”:”gxb123”,”owner_key”:”GXC5wQ4RtjouyobBV57vTx7boBj4Kt3BUxZEMsUD3TU369d3C9DqZ”,”active_key”:”GXC7cPVyB9F1Pfiaaxw4nY3xKADo5993hEsTjFs294LKwhqsUrFZs”,”memo_key”:”GXC7cPVyB9F1Pfiaaxw4nY3xKADo5993hEsTjFs294LKwhqsUrFZs”,”refcode”:null,”referrer”:null}}’
   */
  register(account: string, activeKey: string, ownerKey: string, memoKey: string, faucet: string = 'https://opengateway.gxb.io') {
    return new Promise((resolve, reject) => {
      if (!activeKey) {
        reject(new Error('active key is required'));
      } else {
        axios
          .post(`${faucet}/account/register`, {
            account: {
              name: account,
              active_key: activeKey,
              owner_key: ownerKey || activeKey,
              memo_key: memoKey || activeKey
            }
          })
          .then((resp) => {
            resolve(resp.data);
          })
          .catch(reject);
      }
    });
  }

  /**
   * fetching latest block each 3 seconds
   * @private
   */
  _latestBlockTask(force) {
    if (this.isTaskStarted && !force) {
      return false;
    }
    this.isTaskStarted = true;
    this.getDynamicGlobalProperties().then((obj) => {
      try {
        let latestBlock = obj.last_irreversible_block_num;
        if (this.latestBlock !== latestBlock) {
          this.latestBlock = latestBlock;
          console.log('latest block:', this.latestBlock);
        }
      } catch (ex) {
        console.error('error when fetching block header,', ex);
      } finally {
        setTimeout(() => {
          this._latestBlockTask(true);
        }, 3000);
      }
    });
  }

  // TODO
  /**
   * get object by id
   * @param object_id {String} - e.g: '1.2.3'
   * @returns {Request|PromiseLike<T>|Promise<T>}
   */
  getObject(object_id: string): Promise<any> {
    return this._query('get_objects', [[object_id]]).then((results) => results[0]);
  }

  // TODO
  /**
   * get objects
   * @param {String[]} object_ids
   * @returns {Request|PromiseLike<T>|Promise<T>}
   */
  getObjects(object_ids: string[]): Promise<any[]> {
    return this._query('get_objects', [object_ids]);
  }

  // TODO
  /**
   * get account info by account name
   * @param account_name {String}
   * @returns {Promise<any>}
   */
  getAccount(account_name: string): Promise<any> {
    return this._query('get_account_by_name', [account_name]);
  }

  /**
   * get current blockchain id
   * @returns {Request|PromiseLike<T>|Promise<T>}
   */
  getChainID(): Promise<string> {
    return this._query('get_chain_id', []);
  }

  /**
   * get dynamic global properties
   * @returns {Request|PromiseLike<T>|Promise<T>}
   */
  getDynamicGlobalProperties(): Promise<{
    id: string,
    head_block_number :number,
    head_block_id: string,
    time: string,
    current_witness: string,
    next_maintenance_time: string
    last_budget_time: string,
    witness_budget: number,
    accounts_registered_this_interval: number,
    recently_missed_count: number,
    current_aslot: number,
    recent_slots_filled: string,
    dynamic_flags: number,
    last_irreversible_block_num: number
  }> {
    return this._query('get_dynamic_global_properties', []);
  }

  /**
   * get account_ids by public key
   * @param publicKey {String}
   * @returns {Request|PromiseLike<T>|Promise<T>}
   */
  getAccountByPublicKey(publicKey: string): Promise<string[]> {
    return this._query('get_key_references', [[publicKey]]).then((results) => uniq(results[0]));
  }

  /**
   * get account balances by account name
   * @param account_name {String}
   * @returns {Promise<any>}
   */
  getAccountBalances(account_name: string): Promise<{
    amount: string,
    asset_id: string
  }[]> {
    return new Promise((resolve, reject) => {
      this.getAccount(account_name)
        .then((account) => {
          resolve(this._query('get_account_balances', [account.id, []]));
        })
        .catch(reject);
    });
  }

  // TODO
  /**
   * get asset info by symbol
   * @param symbol {String} - e.g: 'GXC'
   * @returns {Promise<any>}
   */
  getAsset(symbol: string): Promise<any> {
    return this._query('lookup_asset_symbols', [[symbol]]).then((assets) => assets[0]);
  }

  /**
   * get block by block height
   * @param blockHeight {Number} - block height
   * @returns {Promise<any>}
   */
  getBlock(blockHeight: number): Promise<{
    previous: string,
    timestamp: string,
    witness: string,
    transaction_merkle_root: string,
    extensions: any[],
    witness_signature: string,
    transactions: types.signed_transaction[],
    block_id: string,
    signing_key: string
    transaction_ids: string[]
  }> {
    return this._query('get_block', [blockHeight]);
  }

  /**
   * detect new transactions related to this.account_id
   * @param blockHeight {Number} - block height
   * @param callback {Function}
   */
  detectTransaction(blockHeight: number, callback?: (blockHeight: number, txid: string, op: types.operation) => void): void {
    let detect = () => {
      this.getBlock(blockHeight)
        .then((block) => {
          if (block) {
            block.transactions.forEach((transaction, i) => {
              let txid = block.transaction_ids[i];
              transaction.operations.forEach((op) => {
                let exist = false;
                for (var key in op[1]) {
                  let val = op[1][key];

                  if (val === this.account_id) {
                    exist = true;
                  }
                }
                exist && callback && callback(blockHeight, txid, op);
              });
            });
            if (blockHeight < this.latestBlock) {
              process.nextTick(() => {
                this.detectTransaction(blockHeight + 1, callback);
              });
            } else {
              setTimeout(() => {
                this.detectTransaction(blockHeight, callback);
              }, 1000);
            }
          } else {
            setTimeout(() => {
              this.detectTransaction(blockHeight, callback);
            }, 1000);
          }
        })
        .catch((ex) => {
          console.error('get block error', ex);
          setTimeout(() => {
            this.detectTransaction(blockHeight, callback);
          }, 1000);
        });
    };
    this._latestBlockTask(false);
    detect();
  }

  /**
   * send transfer request to witness node
   * @param to {String} - to account name
   * @param memo {String|Function} - memo
   * @param amount_asset {String} - e.g: '1 GXC'
   * @param broadcast {Boolean}
   * @param options {Object}
   * @param options.fee_symbol {String} - e.g: 'GXC'
   * @returns {Promise<any>}
   */
  transfer(to: string, memo: string | ((from: string, to: string) => Promise<types.memo_data>), amount_asset: string, broadcast?: false, options?: { fee_symbol?: string }): SerializeTransactionResult;
  transfer(to: string, memo: string | ((from: string, to: string) => Promise<types.memo_data>), amount_asset: string, broadcast?: true, options?: { fee_symbol?: string }): BroadcaseTransactionResult;
  transfer(to: string, memo: string | ((from: string, to: string) => Promise<types.memo_data>), amount_asset: string, broadcast?: boolean, options?: { fee_symbol?: string }): ProcessTransactionResult;
  transfer(to: string, memo: string | ((from: string, to: string) => Promise<types.memo_data>), amount_asset: string, broadcast: boolean = false, options: { fee_symbol?: string } = {}): ProcessTransactionResult {
    const fee_symbol = options.fee_symbol;
    let memo_private = this.private_key;

    return new Promise((resolve, reject) => {
      if (amount_asset.indexOf(' ') == -1) {
        reject(new Error('Incorrect format of amount params, eg. "100 GXC"'));
      } else {
        let amount: any = Number(amount_asset.split(' ').filter((o) => !!o)[0]);
        let asset = amount_asset.split(' ').filter((o) => !!o)[1];
        resolve(
          this._connect().then(() => {
            const promises = [this._query('get_objects', [[this.account_id]]), this.getAccount(to), this.getAsset(asset)];
            if (fee_symbol) {
              promises.push(this.getAsset(fee_symbol));
            }

            return Promise.all(promises).then(async (results) => {
              let memo_object;
              let fromAcc = results[0][0];
              let toAcc = results[1];
              let assetInfo = results[2];
              let feeInfo = results[3] || {};
              if (!toAcc) {
                throw new Error(`Account ${to} not exist`);
              }
              if (!assetInfo) {
                throw new Error(`Asset ${asset} not exist`);
              }
              if (amount.toString().indexOf('.') > -1 && amount.toString().split('.')[1].length > assetInfo.precision) {
                throw new Error(`Incorrect decimal numbers of ${amount}, max decimals are ${assetInfo.precision}`);
              }
              amount = {
                amount: this._accMult(amount, Math.pow(10, assetInfo.precision)),
                asset_id: assetInfo.id
              };

              if (typeof memo === 'string') {
                let memo_from_public, memo_to_public;
                if (memo) {
                  memo_from_public = fromAcc.options.memo_key;

                  // The 1s are base58 for all zeros (null)
                  if (/111111111111111111111/.test(memo_from_public)) {
                    memo_from_public = null;
                  }

                  memo_to_public = toAcc.options.memo_key;
                  if (/111111111111111111111/.test(memo_to_public)) {
                    memo_to_public = null;
                  }
                  let fromPrivate = PrivateKey.fromWif(memo_private);
                  if (memo_from_public != fromPrivate.toPublicKey().toPublicKeyString()) {
                    throw new Error('memo signer not exist');
                  }
                }

                if (memo && memo_to_public && memo_from_public) {
                  let nonce = this.nonceProvider ? this.nonceProvider() : TransactionHelper.unique_nonce_uint64();
                  memo_object = {
                    from: memo_from_public,
                    to: memo_to_public,
                    nonce,
                    message: Aes.encrypt_with_checksum(PrivateKey.fromWif(memo_private), memo_to_public, nonce, new Buffer(memo, 'utf-8'))
                  };
                }
              } else {
                try {
                  memo_object = await memo(fromAcc, toAcc);
                } catch (err) {
                  reject(err);
                  return;
                }
              }

              let tr = this._createTransaction();

              tr.add_operation(
                tr.get_type_operation('transfer', {
                  fee: {
                    amount: 0,
                    asset_id: (feeInfo && feeInfo.id) || amount.asset_id
                  },
                  from: fromAcc.id,
                  to: toAcc.id,
                  amount: amount,
                  memo: memo_object
                })
              );
              return this._processTransaction(tr, broadcast);
            });
          })
        );
      }
    });
  }

  /**
   * get staking programs
   */
  getStakingPrograms(): Promise<[string, {
      staking_days: number,
      weight: number,
      is_valid: boolean
  }][]> {
    return this.getObject('2.0.0').then((obj) => {
      let programs = obj.parameters.extensions.find((item) => {
        return item[0] === 11;
      });
      if (programs) {
        return programs[1].params;
      } else {
        return [];
      }
    });
  }

  /**
   * @param {String} to - trust node account name
   * @param {Number} amount - the amount of GXC to staking
   * @param {String} program_id - the staking program id
   * @param {Object} options
   * @param {String} options.fee_symbol  - e.g: 'GXC'
   * @returns {Promise<any>}
   */
  createStaking(to: string, amount: number, program_id: string, broadcast?: false, options?: { fee_symbol?: string }): SerializeTransactionResult;
  createStaking(to: string, amount: number, program_id: string, broadcast?: true, options?: { fee_symbol?: string }): BroadcaseTransactionResult;
  createStaking(to: string, amount: number, program_id: string, broadcast?: boolean, options?: { fee_symbol?: string }): ProcessTransactionResult;
  createStaking(to: string, amount: number, program_id: string, broadcast: boolean = false, options: { fee_symbol?: string } = { fee_symbol: 'GXC' }): ProcessTransactionResult {
    return this._connect().then(() => {
      return Promise.all([this.getStakingPrograms(), this.getAccount(to), this.getAsset(options.fee_symbol)]).then(async (results) => {
        let trustNodeAccount = results[1];
        if (!trustNodeAccount) {
          throw new Error(`Account ${to} not exist`);
        }
        let tustNodeInfo = await this._query('get_witness_by_account', [trustNodeAccount.id]);
        if (!tustNodeInfo) {
          throw new Error(`Account ${to} is not a trustnode`);
        }
        let feeInfo = results[2];
        var program = results[0].find((item) => item[0] == program_id);
        if (!program) {
          throw new Error(`Program ${program_id} not exist`);
        }
        if (!program[1].is_valid) {
          throw new Error(`Program ${program_id} disabled`);
        }
        let tr = this._createTransaction();
        tr.add_operation(
          tr.get_type_operation('staking_create', {
            fee: {
              amount: 0,
              asset_id: (feeInfo && feeInfo.id) || '1.3.1'
            },
            owner: this.account_id,
            trust_node: tustNodeInfo.id,
            program_id: `${program_id}`,
            amount: {
              asset_id: '1.3.1',
              amount: amount * 1e5
            },
            weight: program[1].weight,
            staking_days: program[1].staking_days
          })
        );
        return this._processTransaction(tr, broadcast);
      });
    });
  }

  /**
   * @param {String} to - trust node account name
   * @param {String} staking_id - the staking id
   * @param {Object} options
   * @param {String} options.fee_symbol  - e.g: 'GXC'
   * @returns {Promise<any>}
   */
  updateStaking(to: string, staking_id: string, broadcast?: false, options?: { fee_symbol?: string }): SerializeTransactionResult;
  updateStaking(to: string, staking_id: string, broadcast?: true, options?: { fee_symbol?: string }): BroadcaseTransactionResult;
  updateStaking(to: string, staking_id: string, broadcast?: boolean, options?: { fee_symbol?: string }): ProcessTransactionResult;
  updateStaking(to: string, staking_id: string, broadcast: boolean = false, options: { fee_symbol?: string } = { fee_symbol: 'GXC' }): ProcessTransactionResult {
    return this._connect().then(() => {
      return Promise.all([this.getAccount(to), this.getAsset(options.fee_symbol)]).then(async (results) => {
        let trustNodeAccount = results[0];
        if (!trustNodeAccount) {
          throw new Error(`Account ${to} not exist`);
        }
        let tustNodeInfo = await this._query('get_witness_by_account', [trustNodeAccount.id]);
        if (!tustNodeInfo) {
          throw new Error(`Account ${to} is not a trustnode`);
        }
        let feeInfo = results[1];

        let tr = this._createTransaction();
        tr.add_operation(
          tr.get_type_operation('staking_update', {
            fee: {
              amount: 0,
              asset_id: (feeInfo && feeInfo.id) || '1.3.1'
            },
            owner: this.account_id,
            trust_node: tustNodeInfo.id,
            staking_id: staking_id
          })
        );
        return this._processTransaction(tr, broadcast);
      });
    });
  }

  /**
   * @param {String} staking_id - the staking id
   * @param {Object} options
   * @param {String} options.fee_symbol  - e.g: 'GXC'
   * @returns {Promise<any>}
   */
  claimStaking(staking_id: string, broadcast?: false, options?: { fee_symbol?: string }): SerializeTransactionResult;
  claimStaking(staking_id: string, broadcast?: true, options?: { fee_symbol?: string }): BroadcaseTransactionResult;
  claimStaking(staking_id: string, broadcast?: boolean, options?: { fee_symbol?: string }): ProcessTransactionResult;
  claimStaking(staking_id: string, broadcast: boolean = false, options: { fee_symbol?: string } = { fee_symbol: 'GXC' }): ProcessTransactionResult {
    return this._connect().then(() => {
      return this.getAsset(options.fee_symbol).then((feeInfo) => {
        let tr = this._createTransaction();
        tr.add_operation(
          tr.get_type_operation('staking_claim', {
            fee: {
              amount: 0,
              asset_id: (feeInfo && feeInfo.id) || '1.3.1'
            },
            owner: this.account_id,
            staking_id: staking_id
          })
        );
        return this._processTransaction(tr, broadcast);
      });
    });
  }

  /**
   * get contract abi by contract_name
   * @param contract_name {String}
   * @returns {Promise<any>}
   */
  getContractABI(contract_name: string): Promise<any> {
    return this.getAccount(contract_name).then((acc) => acc.abi);
  }

  /**
   * get contract table by contract_name
   * @param contract_name {String}
   * @returns {Promise<any>}
   */
  getContractTable(contract_name: string): Promise<any> {
    return this.getAccount(contract_name).then((acc) => acc.abi && acc.abi.tables);
  }

  /**
   * fetch contract table record by contract_name and table_name
   * @param contract_name {String}
   * @param table_name {String}
   * @param start {Number}
   * @param limit {Number}
   * @returns {Promise<any>}
   */
  getTableObjects(contract_name: string, table_name: string, start: number = 0, limit: number = 100): Promise<any> {
    return this.getAccount(contract_name).then((acc) => {
      if (acc) {
        let contract_id = object_id_type(acc.id).toString();
        return this._query('get_table_objects', [contract_id, contract_id, string_to_name(table_name).toString(), start, -1, limit]);
      } else {
        throw new Error('Contract not found');
      }
    });
  }

  /**
   * fetch contract table record by contract_name and table_name
   * @param contract_name
   * @param table_name
   * @param lower_bound
   * @param upper_bound
   * @param limit
   * @param reverse
   * @returns {*}
   */
  getTableObjectsEX(contract_name: string, table_name: string, lower_bound: number = 0, upper_bound: number = -1, limit: number = 100, reverse: boolean = false): Promise<any> {
    return this._query('get_table_rows_ex', [
      contract_name,
      table_name,
      {
        lower_bound: lower_bound,
        upper_bound: upper_bound,
        reverse: reverse,
        limit: limit
      }
    ]);
  }

  /**
   * deploy smart contract
   * @param contract_name {String}
   * @param code {String} - bytecode
   * @param abi {Object} - abi object
   * @param vm_type {String}
   * @param vm_version {String}
   * @param broadcast {Boolean}
   * @param options {Object}
   * @param options.fee_symbol {String} - e.g: 'GXC'
   * @returns {Promise<any>}
   */
  createContract(contract_name: string, code: string, abi: types.abi_def, vm_type?: string, vm_version?: string, broadcast?: false, options?: { fee_symbol?: string }): SerializeTransactionResult;
  createContract(contract_name: string, code: string, abi: types.abi_def, vm_type?: string, vm_version?: string, broadcast?: true, options?: { fee_symbol?: string }): BroadcaseTransactionResult;
  createContract(contract_name: string, code: string, abi: types.abi_def, vm_type?: string, vm_version?: string, broadcast?: boolean, options?: { fee_symbol?: string }): ProcessTransactionResult;
  createContract(contract_name: string, code: string, abi: types.abi_def, vm_type: string = '0', vm_version: string = '0', broadcast: boolean = false, options: { fee_symbol?: string } = { fee_symbol: 'GXC' }): ProcessTransactionResult {
    return this.getAsset(options.fee_symbol).then((feeInfo) => {
      return this._connect().then(() => {
        let tr = this._createTransaction();
        tr.add_operation(
          tr.get_type_operation('create_contract', {
            fee: {
              amount: 0,
              asset_id: feeInfo.id || '1.3.1'
            },
            name: contract_name,
            account: this.account_id,
            vm_type,
            vm_version,
            code,
            abi
          })
        );
        return this._processTransaction(tr, broadcast);
      });
    })
  }

  /**
   * update smart contract
   * @param contract_name {String}
   * @param newOwner {String} - new owner account name
   * @param code {String} - same to createContract
   * @param abi {Object} - same to createContract
   * @param broadcast {Boolean}
   * @param options {Object}
   * @param options.fee_symbol {String} - e.g: 'GXC'
   * @returns {Request|PromiseLike<T>|Promise<T>}
   */
  updateContract(contract_name: string, newOwner: string, code: string, abi: types.abi_def, broadcast?: false, options?: { fee_symbol?: string }): SerializeTransactionResult;
  updateContract(contract_name: string, newOwner: string, code: string, abi: types.abi_def, broadcast?: true, options?: { fee_symbol?: string }): BroadcaseTransactionResult;
  updateContract(contract_name: string, newOwner: string, code: string, abi: types.abi_def, broadcast?: boolean, options?: { fee_symbol?: string }): ProcessTransactionResult;
  updateContract(contract_name: string, newOwner: string, code: string, abi: types.abi_def, broadcast: boolean = false, options: { fee_symbol?: string } = { fee_symbol: 'GXC' }): ProcessTransactionResult {
    const fee_symbol = options.fee_symbol;
    return this._connect().then(async () => {
      let feeInfo: any = {};
      let promises = [this.getAccount(contract_name)];
      if (newOwner) {
        promises.push(this.getAccount(newOwner));
      }
      if (fee_symbol) {
        feeInfo = await this.getAsset(fee_symbol);
      }
      return Promise.all(promises).then((results) => {
        let tr = this._createTransaction();

        let opt = {
          fee: {
            amount: 0,
            asset_id: feeInfo.id || '1.3.1'
          },
          owner: this.account_id,
          contract: results[0].id,
          code,
          abi,
          new_owner: undefined
        };
        if (newOwner) {
          opt.new_owner = results[1].id;
        }
        tr.add_operation(tr.get_type_operation('update_contract', opt));
        return this._processTransaction(tr, broadcast);
      });
    });
  }

  /**
   * call smart contract method
   * @param contract_name {String} - The name of the smart contract
   * @param method_name {String} - Method/Action name
   * @param params {JSON} - parameters
   * @param amount_asset {String} - same to transfer eg."100 GXC"
   * @param broadcast {Boolean} - Broadcast the transaction or just return a serialized transaction
   * @param options {Object}
   * @param options.fee_symbol {String} - e.g: 'GXC'
   * @returns {Promise<any>}
   */
  callContract(contract_name: string, method_name: string, params: any, amount_asset: string, broadcast?: false, options?: { fee_symbol?: string }): SerializeTransactionResult;
  callContract(contract_name: string, method_name: string, params: any, amount_asset: string, broadcast?: true, options?: { fee_symbol?: string }): BroadcaseTransactionResult;
  callContract(contract_name: string, method_name: string, params: any, amount_asset: string, broadcast?: boolean, options?: { fee_symbol?: string }): ProcessTransactionResult;
  callContract(contract_name: string, method_name: string, params: any, amount_asset: string, broadcast: boolean = false, options: { fee_symbol?: string } = { fee_symbol: "GXC"}): ProcessTransactionResult {
    const fee_symbol = options.fee_symbol;
    return this._connect().then(() => {
      if (amount_asset) {
        if (amount_asset.indexOf(' ') == -1) {
          throw new Error('Incorrect format of asset, eg. "100 GXC"');
        }
      }
      let amount: any = amount_asset ? Number(amount_asset.split(' ').filter((o) => !!o)[0]) : 0;
      let asset = amount_asset ? amount_asset.split(' ').filter((o) => !!o)[1] : 'GXC';
      const promises = [this.getAccount(contract_name), this.getAsset(asset)];
      if (fee_symbol) {
        promises.push(this.getAsset(fee_symbol));
      }

      return Promise.all(promises).then((results) => {
        let acc = results[0];
        let assetInfo = results[1];
        let feeInfo = results[2] || {};
        if (!assetInfo) {
          throw new Error(`Asset ${asset} not exist`);
        }
        if (amount.toString().indexOf('.') > -1 && amount.toString().split('.')[1].length > assetInfo.precision) {
          throw new Error(`Incorrect decimal numbers of ${amount}, max decimals are ${assetInfo.precision}`);
        }
        amount = {
          amount: this._accMult(amount, Math.pow(10, assetInfo.precision)),
          asset_id: assetInfo.id
        };
        if (acc) {
          let abi = acc.abi;
          let act = {
            method_name: method_name,
            data: serializeCallData(method_name, params, abi)
          };

          let tr = this._createTransaction();
          let opts = {
            fee: {
              amount: 0,
              asset_id: feeInfo.id || amount.asset_id
            },
            account: this.account_id,
            contract_id: acc.id,
            method_name: act.method_name,
            data: act.data,
            amount: undefined
          };

          if (!!amount.amount) {
            opts.amount = amount;
          }
          tr.add_operation(tr.get_type_operation('call_contract', opts));
          return this._processTransaction(tr, broadcast);
        } else {
          throw new Error('Contract not found');
        }
      });
    });
  }

  /**
   * vote for accounts - Deprecated
   * @param accounts {String[]} - An array of account_names to vote
   * @param broadcast {Boolean}
   * @param options {Object}
   * @param options.fee_symbol {String} - e.g: 'GXC'
   * @params options.append {bool} - default: true
   * @returns {Promise<any>}
   */
  vote(accounts?: string[], broadcast?: false, options?: { fee_symbol?: string, append?: boolean }): SerializeTransactionResult;
  vote(accounts?: string[], broadcast?: true, options?: { fee_symbol?: string, append?: boolean }): BroadcaseTransactionResult;
  vote(accounts?: string[], broadcast?: boolean, options?: { fee_symbol?: string, append?: boolean }): ProcessTransactionResult;
  vote(accounts: string[] = [], broadcast: boolean = false, options: { fee_symbol?: string, append?: boolean } = { fee_symbol: 'GXC', append: true }): ProcessTransactionResult {
    const fee_symbol = options.fee_symbol || 'GXC';
    return new Promise((resolve) => {
      resolve(
        this._connect().then(() => {
          let accountPromises = accounts.map((a) => this.getAccount(a));
          return Promise.all(accountPromises).then((accounts) => {
            let account_ids = accounts.map((a) => a.id);
            return Promise.all([this._query('get_objects', [[this.account_id, '2.0.0']]), this.getAsset(fee_symbol)]).then((results) => {
              let acc = results[0][0];
              let globalObject = results[0][1];
              let fee_asset = results[1];
              if (!acc) {
                throw Error(`account_id ${this.account_id} not exist`);
              }
              if (!fee_asset) {
                throw Error(`asset ${fee_symbol} not exist`);
              }

              let new_options = {
                memo_key: acc.options.memo_key,
                voting_account: acc.options.voting_account || '1.2.5',
                votes: undefined,
                num_committee: undefined,
                num_witness: undefined
              };

              let promises = [];

              account_ids.forEach((account_id) => {
                promises.push(this._query('get_witness_by_account', [account_id]));
                promises.push(this._query('get_committee_member_by_account', [account_id]));
              });

              // fetch vote_ids
              return Promise.all(promises).then((results) => {
                // filter empty records since some of the account are not witness or committee
                let votes = results.filter((r) => r).map((r) => r.vote_id);

                if (options.append) {
                  new_options.votes = uniq(votes.concat(acc.options.votes));
                } else {
                  new_options.votes = uniq(votes);
                }

                let num_witness = 0;
                let num_committee = 0;
                new_options.votes.forEach((v) => {
                  let vote_type = v.split(':')[0];
                  if (vote_type == '0') {
                    num_committee += 1;
                  }
                  if (vote_type == 1) {
                    num_witness += 1;
                  }
                });
                new_options.num_committee = Math.min(num_committee, globalObject.parameters.maximum_committee_count);
                new_options.num_witness = Math.min(num_witness, globalObject.parameters.maximum_witness_count);
                new_options.votes = new_options.votes.sort((a, b) => {
                  let a_split = a.split(':');
                  let b_split = b.split(':');
                  return parseInt(a_split[1]) - parseInt(b_split[1]);
                });

                let tr = this._createTransaction();

                tr.add_operation(
                  tr.get_type_operation('account_update', {
                    fee: {
                      amount: 0,
                      asset_id: fee_asset.id
                    },
                    account: this.account_id,
                    new_options: new_options
                  })
                );

                return this._processTransaction(tr, broadcast);
              });
            });
          });
        })
      );
    });
  }

  /**
   * Since committee account is controled by multiple account
   * so broadcast = false
   * will use create_proposal to send this transaction
   * @param {Object} new_params Same structure as getObject('2.0.0').parameters
   * @param {Object} options
   */
  proposeUpdateGPO(new_params: any, broadcast?: false, options?: { fee_symbol?: string, append?: boolean }): SerializeTransactionResult;
  proposeUpdateGPO(new_params: any, broadcast?: true, options?: { fee_symbol?: string, append?: boolean }): BroadcaseTransactionResult;
  proposeUpdateGPO(new_params: any, broadcast?: boolean, options?: { fee_symbol?: string, append?: boolean }): ProcessTransactionResult;
  async proposeUpdateGPO(new_params: any, broadcast: boolean = false, options: { fee_symbol?: string, append?: boolean } = { fee_symbol: 'GXC' }) {
    const fee_symbol = options.fee_symbol || 'GXC';
    await this._connect();
    let fee_asset = await this.getAsset(fee_symbol);
    if (!fee_asset) {
      throw Error(`asset ${fee_symbol} not exist`);
    }
    let GPO = await this.getObject('2.0.0');
    let new_parameters = GPO.parameters;
    for (var key in new_params) {
      new_parameters[key] = new_params[key];
    }
    let tr = this._createTransaction();
    tr.add_operation(
      tr.get_type_operation('committee_member_update_global_parameters', {
        fee: {
          amount: 0,
          asset_id: fee_asset.id
        },
        new_parameters
      })
    );

    return await this._processTransaction(tr, broadcast, true);
  }

  /**
   * create a proposal
   * @param {Array} ops
   * @param {Date} expiration_time
   * @param {Number} review_period_seconds
   * @param {Boolean} broadcast
   * @param {Object} options
   */
  createProposal(ops: types.op_wrapper[], expiration_time: number | string, review_period_seconds?: number, broadcast?: false, options?: { fee_symbol?: string }) : SerializeTransactionResult;
  createProposal(ops: types.op_wrapper[], expiration_time: number | string, review_period_seconds?: number, broadcast?: true, options?: { fee_symbol?: string }) : BroadcaseTransactionResult;
  createProposal(ops: types.op_wrapper[], expiration_time: number | string, review_period_seconds?: number, broadcast?: boolean, options?: { fee_symbol?: string }) : ProcessTransactionResult;
  async createProposal(ops: types.op_wrapper[], expiration_time: number | string, review_period_seconds: number = 0, broadcast: boolean = false, options: { fee_symbol?: string } = { fee_symbol: 'GXC' }) {
    const fee_symbol = options.fee_symbol || 'GXC';
    await this._connect();
    let fee_asset = await this.getAsset(fee_symbol);
    if (!fee_asset) {
      throw Error(`asset ${fee_symbol} not exist`);
    }
    let tr = this._createTransaction();
    tr.add_operation(
      tr.get_type_operation('proposal_create', {
        fee: {
          amount: 0,
          asset_id: fee_asset.id
        },
        fee_paying_account: this.account_id,
        expiration_time,
        proposed_ops: ops,
        review_period_seconds,
        extensions: []
      })
    );

    return await this._processTransaction(tr, broadcast)
  }

  /**
   * calculate fee of a operation
   * @param operation {Object}
   * @param feeAssetId {String}
   * @returns {Promise<any>}
   */
  fee(operation: types.operation, feeAssetId: string = '1.3.1'): Promise<{
    amount: number,
    asset_id: string
  }[]> {
    return this._query('get_required_fees', [operation, feeAssetId]);
  }

  /**
   * accurate multiply - fix the accurate issue of javascript
   * @private
   * @param arg1
   * @param arg2
   * @returns {number}
   */
  _accMult(arg1, arg2) {
    let m = 0;
    let s1 = arg1.toString();
    let s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length;
    } catch (e) {}
    try {
      m += s2.split('.')[1].length;
    } catch (e) {}
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
  }

  /**
   *
   * @private
   */
  _connect(): Promise<void> {
    return new Promise((resolve) => {
      if (this.connected) {
        resolve();
      } else {
        resolve(
          Promise.all([this.getAccount(this.account), this.getChainID()]).then((results) => {
            let acc = results[0];
            this.chain_id = results[1];
            this.account_id = acc.id;
            this.connected = true;
            return;
          })
        );
      }
    });
  }

  /**
   *
   * @private
   */
  _query(method, params) {
    return this.rpc.query(method, params);
  }

  /**
   * WARNING: This function have to be used after connected
   * @returns {*}
   * @private
   */
  _createTransaction() {
    let tr = null;
    if (!this.connected) {
      throw new Error('_createTransaction have to be invoked after _connect()');
    }
    if (this.signProvider) {
      tr = new TransactionBuilder(this.signProvider, this.rpc, this.chain_id);
    } else {
      tr = new TransactionBuilder(null, this.rpc, this.chain_id);
    }

    return tr;
  }

  /**
   * process transaction
   * @private
   * @param tr
   * @param broadcast
   * @returns {Promise<any[]>}
   */
  _processTransaction(tr, broadcast: true, useRemoteSerializer?: boolean): BroadcaseTransactionResult;
  _processTransaction(tr, broadcast: false, useRemoteSerializer?: boolean): SerializeTransactionResult;
  _processTransaction(tr, broadcast: boolean, useRemoteSerializer?: boolean): ProcessTransactionResult;
  _processTransaction(tr, broadcast: boolean, useRemoteSerializer: boolean = false): ProcessTransactionResult {
    return new Promise<any>((resolve) => {
      resolve(
        Promise.all([tr.update_head_block(), tr.set_required_fees()]).then(() => {
          if (!this.signProvider) {
            this.private_key && tr.add_signer(PrivateKey.fromWif(this.private_key));
          }
          tr.set_expire_seconds(DEFUALT_EXPIRE_SEC);
          if (broadcast) {
            return tr.broadcast();
          } else {
            return tr.finalize(useRemoteSerializer).then(() => {
              return tr.sign().then(() => {
                return tr.serialize();
              });
            });
          }
        })
      );
    });
  }

  /**
   * broadcast transaction
   * @param {TransactionBuilder} tx
   * @returns {Promise<any>}
   */
  broadcast(tx: TransactionBuilder): Promise<string[]> {
    return this.rpc.broadcast(tx);
  }
}

type BroadcaseTransactionResult = Promise<string[]>;
type SerializeTransactionResult = Promise<types.signed_transaction>;
type ProcessTransactionResult = Promise<types.signed_transaction | string[]>;

export default GXClient;
