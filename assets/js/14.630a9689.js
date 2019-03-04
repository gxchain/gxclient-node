(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{179:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[t._m(0),t._v(" "),s("p",[t._v("GXClient is a wrapped toolkit of gxbjs, a client to interact with gxchain apis.")]),t._v(" "),s("p",[t._v("You can get more info on "),s("a",{attrs:{href:"https://gxchain.github.io/gxclient-node",target:"_blank",rel:"noopener noreferrer"}},[t._v("docs"),s("OutboundLink")],1),t._v(".")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._m(4),t._v(" "),t._m(5),t._m(6),t._m(7),t._v(" "),t._m(8),t._m(9),t._v(" "),t._m(10)])},[function(){var t=this.$createElement,a=this._self._c||t;return a("h1",{attrs:{id:"gxclient"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gxclient","aria-hidden":"true"}},[this._v("#")]),this._v(" GXClient")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{href:"javascript:;"}},[a("img",{attrs:{width:"300px",src:"https://raw.githubusercontent.com/gxchain/gxips/master/assets/images/task-gxclient.png"}})]),this._v(" "),a("a",{attrs:{href:"javascript:;"}},[a("img",{attrs:{width:"300px",src:"https://raw.githubusercontent.com/gxchain/gxips/master/assets/images/task-gxclient-en.png"}})])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"install"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install","aria-hidden":"true"}},[this._v("#")]),this._v(" Install")])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[this._v("install")]),this._v(" gxclient --save\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"usage-cli"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#usage-cli","aria-hidden":"true"}},[this._v("#")]),this._v(" Usage(CLI)")])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[this._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[this._v("install")]),this._v(" gxclient -g\n$ gxclient -h\n")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("Usage: gxclient "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("cmd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\nOptions:\n  -V, --version                                                                              output the version number\n  -v --version                                                                               print gxclient version\n  -h, --help                                                                                 output usage information\n\nCommands:\n  list"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ls")]),t._v("                                                                                    List all apis\n  generate_key                                                                               Generate gxchain key pairs\n  private_to_public "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("private_key"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("                                                            Export public key from private key\n  is_valid_private "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("private_key"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("                                                             Check "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" private key is valid\n  is_valid_public "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("public_key"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("                                                               Check "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" public key is valid\n  register "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("account_name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("public_key"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("                                             Register gxchain account\n  get_account "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("account_name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("                                                       Get account information by account_name\n  get_account_by_public_key "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("public_key"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("                                           Get account information by account_name\n  get_object "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("object_id"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("                                                           Get object by object_id\n  get_account_balances"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("get_account_balance "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("account_name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("                          Get account balances by account_name\n  get_asset "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("symbol"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("                                                               Get asset info by asset symbol\n  get_block "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("block_height"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("                                                         Get block by block height\n  transfer "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("to"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("memo"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("amount_asset"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("boradcast"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("                                  Send a transfer transaction\n  vote "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("account_ids"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("overwrite"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("fee_asset_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("boradcast"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("                        Vote "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" TrustNodes\n  call_contract "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("contract_name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("method_name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("params"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("amount_asset"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("boradcast"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  Call smart contract method\n  get_contract_tables "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("contract_name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("                                              Get contract table by contract_name\n  get_contract_abi "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("contract_name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("                                                 Get contract abi by contract_name\n  get_table_objects "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("contract_name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("table_name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("start"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("limit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("                   Get table records by contract_name and table_name\n  broadcast "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("tx"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("                                                                   broadcast transaction\n  get_chain_id "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("                                                                     get_chain_id\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"usage-client"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#usage-client","aria-hidden":"true"}},[this._v("#")]),this._v(" Usage(Client)")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" GXClientFactory "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"gxclient"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" private_key "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"5Ka9YjFQtfUUX2Ddnqka..."')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" account_name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"gxcaccount"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" asset_precicion "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" client "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" GXClientFactory"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("instance")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("keyProvider"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("private_key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" account"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("account_name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("network"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"wss://testnet.gxchain.org"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// set broadcast to false so we could calculate the fee before broadcasting")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" broadcast "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//Sending 15GXS to gxb456 with memo "GXChain NB"')]),t._v("\nclient"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("transfer")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"gxb456"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GXChain NB"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"15 GXC"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" broadcast"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("resp "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" transaction "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" broadcast "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" resp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("trx "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" resp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" txid "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" broadcast "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" resp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("transaction"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"txid:"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" txid"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"fee:"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" transaction"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("operations0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fee"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("amount "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("pow")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" asset_precicion"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// > txid: f28d27ac74649a76f58c9b84fb7ea700163e31c4 fee: 0.0118")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Since gxchain implemented dpos consensus, the transaction will be confirmed until the block becomes irreversible")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// You can find the logic when a transfer operation was confirmed in the example of detectTransaction")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ex "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ex"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"other"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#other","aria-hidden":"true"}},[this._v("#")]),this._v(" Other")])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("It's very welcome for developers to translate this project into different programing languages")]),this._v(" "),a("li",[this._v("We are looking forward to your pull requests")])])}],!1,null,null,null);a.default=e.exports}}]);