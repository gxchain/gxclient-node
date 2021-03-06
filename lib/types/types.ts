export interface transfer_operation_fee_parameters {
	fee: number | string
	price_per_kbyte: number
}

export interface limit_order_create_operation_fee_parameters {
	fee: number | string
}

export interface limit_order_cancel_operation_fee_parameters {
	fee: number | string
}

export interface call_order_update_operation_fee_parameters {
	fee: number | string
}

export interface fill_order_operation_fee_parameters {
}

export interface account_create_operation_fee_parameters {
	basic_fee: number | string
	premium_fee: number | string
	price_per_kbyte: number
}

export interface account_update_operation_fee_parameters {
	fee: number | string
	price_per_kbyte: number
}

export interface account_whitelist_operation_fee_parameters {
	fee: number | string
}

export interface account_upgrade_operation_fee_parameters {
	membership_annual_fee: number | string
	membership_lifetime_fee: number | string
}

export interface account_transfer_operation_fee_parameters {
	fee: number | string
}

export interface asset_create_operation_fee_parameters {
	symbol3: number | string
	symbol4: number | string
	long_symbol: number | string
	price_per_kbyte: number
}

export interface asset_update_operation_fee_parameters {
	fee: number | string
	price_per_kbyte: number
}

export interface asset_update_bitasset_operation_fee_parameters {
	fee: number | string
}

export interface asset_update_feed_producers_operation_fee_parameters {
	fee: number | string
}

export interface asset_issue_operation_fee_parameters {
	fee: number | string
	price_per_kbyte: number
}

export interface asset_reserve_operation_fee_parameters {
	fee: number | string
}

export interface asset_fund_fee_pool_operation_fee_parameters {
	fee: number | string
}

export interface asset_settle_operation_fee_parameters {
	fee: number | string
}

export interface asset_global_settle_operation_fee_parameters {
	fee: number | string
}

export interface asset_publish_feed_operation_fee_parameters {
	fee: number | string
}

export interface witness_create_operation_fee_parameters {
	fee: number | string
}

export interface witness_update_operation_fee_parameters {
	fee: number | string
}

export interface proposal_create_operation_fee_parameters {
	fee: number | string
	price_per_kbyte: number
}

export interface proposal_update_operation_fee_parameters {
	fee: number | string
	price_per_kbyte: number
}

export interface proposal_delete_operation_fee_parameters {
	fee: number | string
}

export interface withdraw_permission_create_operation_fee_parameters {
	fee: number | string
}

export interface withdraw_permission_update_operation_fee_parameters {
	fee: number | string
}

export interface withdraw_permission_claim_operation_fee_parameters {
	fee: number | string
	price_per_kbyte: number
}

export interface withdraw_permission_delete_operation_fee_parameters {
	fee: number | string
}

export interface committee_member_create_operation_fee_parameters {
	fee: number | string
}

export interface committee_member_update_operation_fee_parameters {
	fee: number | string
}

export interface committee_member_update_global_parameters_operation_fee_parameters {
	fee: number | string
}

export interface vesting_balance_create_operation_fee_parameters {
	fee: number | string
}

export interface vesting_balance_withdraw_operation_fee_parameters {
	fee: number | string
}

export interface worker_create_operation_fee_parameters {
	fee: number | string
}

export interface custom_operation_fee_parameters {
	fee: number | string
	price_per_kbyte: number
}

export interface assert_operation_fee_parameters {
	fee: number | string
}

export interface balance_claim_operation_fee_parameters {
}

export interface override_transfer_operation_fee_parameters {
	fee: number | string
	price_per_kbyte: number
}

export interface transfer_to_blind_operation_fee_parameters {
	fee: number | string
	price_per_output: number
}

export interface blind_transfer_operation_fee_parameters {
	fee: number | string
	price_per_output: number
}

export interface transfer_from_blind_operation_fee_parameters {
	fee: number | string
}

export interface asset_settle_cancel_operation_fee_parameters {
}

export interface asset_claim_fees_operation_fee_parameters {
	fee: number | string
}

export interface fba_distribute_operation_fee_parameters {
}

export interface account_upgrade_merchant_operation_fee_parameters {
	fee: number | string
}

export interface account_upgrade_datasource_operation_fee_parameters {
	fee: number | string
}

export interface stale_data_market_category_create_operation_fee_parameters {
	fee: number | string
}

export interface stale_data_market_category_update_operation_fee_parameters {
	fee: number | string
}

export interface stale_free_data_product_create_operation_fee_parameters {
	fee: number | string
}

export interface stale_free_data_product_update_operation_fee_parameters {
	fee: number | string
}

export interface stale_league_data_product_create_operation_fee_parameters {
	fee: number | string
}

export interface stale_league_data_product_update_operation_fee_parameters {
	fee: number | string
}

export interface stale_league_create_operation_fee_parameters {
	fee: number | string
}

export interface stale_league_update_operation_fee_parameters {
	fee: number | string
}

export interface data_transaction_create_operation_fee_parameters {
	fee: number | string
}

export interface data_transaction_update_operation_fee_parameters {
	fee: number | string
}

export interface pay_data_transaction_operation_fee_parameters {
	fee: number | string
}

export interface account_upgrade_data_transaction_member_operation_fee_parameters {
	fee: number | string
}

export interface data_transaction_datasource_upload_operation_fee_parameters {
	fee: number | string
}

export interface data_transaction_datasource_validate_error_operation_fee_parameters {
	fee: number | string
}

export interface data_market_category_create_operation_fee_parameters {
	fee: number | string
}

export interface data_market_category_update_operation_fee_parameters {
	fee: number | string
}

export interface free_data_product_create_operation_fee_parameters {
	fee: number | string
}

export interface free_data_product_update_operation_fee_parameters {
	fee: number | string
}

export interface league_data_product_create_operation_fee_parameters {
	fee: number | string
}

export interface league_data_product_update_operation_fee_parameters {
	fee: number | string
}

export interface league_create_operation_fee_parameters {
	fee: number | string
}

export interface league_update_operation_fee_parameters {
	fee: number | string
}

export interface datasource_copyright_clear_operation_fee_parameters {
	fee: number | string
}

export interface data_transaction_complain_operation_fee_parameters {
	fee: number | string
}

export interface balance_lock_operation_fee_parameters {
}

export interface balance_unlock_operation_fee_parameters {
}

export interface proxy_transfer_operation_fee_parameters {
	fee: number | string
}

export interface contract_deploy_operation_fee_parameters {
	fee: number | string
	price_per_kbyte: number | string
}

export interface contract_call_operation_fee_parameters {
	fee: number | string
	price_per_kbyte_ram: number | string
	price_per_ms_cpu: number | string
}

export interface contract_update_operation_fee_parameters {
	fee: number | string
	price_per_kbyte: number | string
}

export interface trust_node_pledge_withdraw_operation_fee_parameters {
	fee: number | string
}

export interface inline_transfer_operation_fee_parameters {
	fee: number | string
	price_per_kbyte: number
}

export interface inter_contract_call_operation_fee_parameters {
	fee: number | string
}

export interface staking_create_operation_fee_parameters {
	fee: number | string
}

export interface staking_update_operation_fee_parameters {
	fee: number | string
}

export interface staking_claim_operation_fee_parameters {
	fee: number | string
}

export interface witness_set_commission_operation_fee_parameters {
	fee: number | string
}

export interface witness_unbanned_operation_fee_parameters {
	fee: number | string
}

export interface fee_schedule {
	parameters: Array<[number, any]>
	scale: number
}

export interface void_result {
}

export interface asset {
	amount: number | string
	asset_id: number | string
}

export interface processed_transaction {
	ref_block_num: number
	ref_block_prefix: number
	expiration: number | string
	operations: operations
	extensions: Array<any>
	signatures: Array<string>
	operation_results: Array<[number, any]>
}

export interface signed_block {
	previous: string
	timestamp: number | string
	witness: number | string
	transaction_merkle_root: string
	extensions: Array<any>
	witness_signature: string
	transactions: Array<processed_transaction>
}

export interface block_header {
	previous: string
	timestamp: number | string
	witness: number | string
	transaction_merkle_root: string
	extensions: Array<any>
}

export interface signed_block_header {
	previous: string
	timestamp: number | string
	witness: number | string
	transaction_merkle_root: string
	extensions: Array<any>
	witness_signature: string
}

export interface memo_data {
	from: string
	to: string
	nonce: number | string
	message: string
}

export interface transfer {
	fee: asset
	from: number | string
	to: number | string
	amount: asset
	memo?: memo_data
	extensions: Array<any>
}

export interface limit_order_create {
	fee: asset
	seller: number | string
	amount_to_sell: asset
	min_to_receive: asset
	expiration: number | string
	fill_or_kill: boolean
	extensions: Array<any>
}

export interface limit_order_cancel {
	fee: asset
	fee_paying_account: number | string
	order: number | string
	extensions: Array<any>
}

export interface call_order_update {
	fee: asset
	funding_account: number | string
	delta_collateral: asset
	delta_debt: asset
	extensions: Array<any>
}

export interface fill_order {
	fee: asset
	order_id: string
	account_id: number | string
	pays: asset
	receives: asset
}

export interface authority {
	weight_threshold: number
	account_auths: Array<[number | string, number]>
	key_auths: Array<[string, number]>
	address_auths: Array<[string, number]>
}

export interface account_options {
	memo_key: string
	voting_account: number | string
	num_witness: number
	num_committee: number
	votes: Array<string>
	extensions: Array<any>
}

export interface account_create {
	fee: asset
	registrar: number | string
	referrer: number | string
	referrer_percent: number
	name: string
	owner: authority
	active: authority
	options: account_options
	extensions: Array<any>
}

export interface account_update {
	fee: asset
	account: number | string
	owner?: authority
	active?: authority
	new_options?: account_options
	extensions: Array<any>
}

export interface account_whitelist {
	fee: asset
	authorizing_account: number | string
	account_to_list: number | string
	new_listing: number
	extensions: Array<any>
}

export interface account_upgrade {
	fee: asset
	account_to_upgrade: number | string
	upgrade_to_lifetime_member: boolean
	extensions: Array<any>
}

export interface fba_distribute_operation {
	fee: asset
	extensions: Array<any>
}

export interface account_transfer {
	fee: asset
	account_id: number | string
	new_owner: number | string
	extensions: Array<any>
}

export interface price {
	base: asset
	quote: asset
}

export interface asset_options {
	max_supply: number | string
	market_fee_percent: number
	max_market_fee: number | string
	issuer_permissions: number
	flags: number
	core_exchange_rate: price
	whitelist_authorities: Array<number | string>
	blacklist_authorities: Array<number | string>
	whitelist_markets: Array<number | string>
	blacklist_markets: Array<number | string>
	description: string
	extensions: Array<any>
}

export interface bitasset_options {
	feed_lifetime_sec: number
	minimum_feeds: number
	force_settlement_delay_sec: number
	force_settlement_offset_percent: number
	maximum_force_settlement_volume: number
	short_backing_asset: number | string
	extensions: Array<any>
}

export interface asset_create {
	fee: asset
	issuer: number | string
	symbol: string
	precision: number
	common_options: asset_options
	bitasset_opts?: bitasset_options
	is_prediction_market: boolean
	extensions: Array<any>
}

export interface asset_update {
	fee: asset
	issuer: number | string
	asset_to_update: number | string
	new_issuer?: number | string
	new_options: asset_options
	extensions: Array<any>
}

export interface asset_update_bitasset {
	fee: asset
	issuer: number | string
	asset_to_update: number | string
	new_options: bitasset_options
	extensions: Array<any>
}

export interface asset_update_feed_producers {
	fee: asset
	issuer: number | string
	asset_to_update: number | string
	new_feed_producers: Array<number | string>
	extensions: Array<any>
}

export interface asset_issue {
	fee: asset
	issuer: number | string
	asset_to_issue: asset
	issue_to_account: number | string
	memo?: memo_data
	extensions: Array<any>
}

export interface asset_reserve {
	fee: asset
	payer: number | string
	amount_to_reserve: asset
	extensions: Array<any>
}

export interface asset_fund_fee_pool {
	fee: asset
	from_account: number | string
	asset_id: number | string
	amount: number | string
	extensions: Array<any>
}

export interface asset_settle {
	fee: asset
	account: number | string
	amount: asset
	extensions: Array<any>
}

export interface asset_global_settle {
	fee: asset
	issuer: number | string
	asset_to_settle: number | string
	settle_price: price
	extensions: Array<any>
}

export interface price_feed {
	settlement_price: price
	maintenance_collateral_ratio: number
	maximum_short_squeeze_ratio: number
	core_exchange_rate: price
}

export interface asset_publish_feed {
	fee: asset
	publisher: number | string
	asset_id: number | string
	feed: price_feed
	extensions: Array<any>
}

export interface witness_create {
	fee: asset
	witness_account: number | string
	url: string
	block_signing_key: string
}

export interface witness_update {
	fee: asset
	witness: number | string
	witness_account: number | string
	new_url?: string
	new_signing_key?: string
}

export interface op_wrapper {
	op: [number, any]
}

export interface proposal_create {
	fee: asset
	fee_paying_account: number | string
	expiration_time: number | string
	proposed_ops: Array<op_wrapper>
	review_period_seconds?: number
	extensions: Array<any>
}

export interface proposal_update {
	fee: asset
	fee_paying_account: number | string
	proposal: number | string
	active_approvals_to_add: Array<number | string>
	active_approvals_to_remove: Array<number | string>
	owner_approvals_to_add: Array<number | string>
	owner_approvals_to_remove: Array<number | string>
	key_approvals_to_add: Array<string>
	key_approvals_to_remove: Array<string>
	extensions: Array<any>
}

export interface proposal_delete {
	fee: asset
	fee_paying_account: number | string
	using_owner_authority: boolean
	proposal: number | string
	extensions: Array<any>
}

export interface withdraw_permission_create {
	fee: asset
	withdraw_from_account: number | string
	authorized_account: number | string
	withdrawal_limit: asset
	withdrawal_period_sec: number
	periods_until_expiration: number
	period_start_time: number | string
}

export interface withdraw_permission_update {
	fee: asset
	withdraw_from_account: number | string
	authorized_account: number | string
	permission_to_update: number | string
	withdrawal_limit: asset
	withdrawal_period_sec: number
	period_start_time: number | string
	periods_until_expiration: number
}

export interface withdraw_permission_claim {
	fee: asset
	withdraw_permission: number | string
	withdraw_from_account: number | string
	withdraw_to_account: number | string
	amount_to_withdraw: asset
	memo?: memo_data
}

export interface withdraw_permission_delete {
	fee: asset
	withdraw_from_account: number | string
	authorized_account: number | string
	withdrawal_permission: number | string
}

export interface committee_member_create {
	fee: asset
	committee_member_account: number | string
	url: string
}

export interface committee_member_update {
	fee: asset
	committee_member: number | string
	committee_member_account: number | string
	new_url?: string
}

export interface chain_parameters {
	current_fees: fee_schedule
	block_interval: number
	maintenance_interval: number
	maintenance_skip_slots: number
	committee_proposal_review_period: number
	maximum_transaction_size: number
	maximum_block_size: number
	maximum_time_until_expiration: number
	maximum_proposal_lifetime: number
	maximum_asset_whitelist_authorities: number
	maximum_asset_feed_publishers: number
	maximum_witness_count: number
	maximum_committee_count: number
	maximum_authority_membership: number
	reserve_percent_of_fee: number
	network_percent_of_fee: number
	lifetime_referrer_percent_of_fee: number
	cashback_vesting_period_seconds: number
	cashback_vesting_threshold: number | string
	count_non_member_votes: boolean
	allow_non_member_whitelists: boolean
	witness_pay_per_block: number | string
	worker_budget_per_day: number | string
	max_predicate_opcode: number
	fee_liquidation_threshold: number | string
	accounts_per_fee_scale: number
	account_fee_scale_bitshifts: number
	max_authority_depth: number
	extensions: Array<any>
}

export interface committee_member_update_global_parameters {
	fee: asset
	new_parameters: chain_parameters
}

export interface linear_vesting_policy_initializer {
	begin_timestamp: number | string
	vesting_cliff_seconds: number
	vesting_duration_seconds: number
}

export interface cdd_vesting_policy_initializer {
	start_claim: number | string
	vesting_seconds: number
}

export interface vesting_balance_create {
	fee: asset
	creator: number | string
	owner: number | string
	amount: asset
	policy: [number, any]
}

export interface vesting_balance_withdraw {
	fee: asset
	vesting_balance: number | string
	owner: number | string
	amount: asset
}

export interface refund_worker_initializer {
}

export interface vesting_balance_worker_initializer {
	pay_vesting_period_days: number
}

export interface burn_worker_initializer {
}

export interface worker_create {
	fee: asset
	owner: number | string
	work_begin_date: number | string
	work_end_date: number | string
	daily_pay: number | string
	name: string
	url: string
	initializer: [number, any]
}

export interface custom {
	fee: asset
	payer: number | string
	required_auths: Array<number | string>
	id: number
	data: string
}

export interface account_name_eq_lit_predicate {
	account_id: number | string
	name: string
}

export interface asset_symbol_eq_lit_predicate {
	asset_id: number | string
	symbol: string
}

export interface block_id_predicate {
	id: string
}

export interface assert {
	fee: asset
	fee_paying_account: number | string
	predicates: Array<[number, any]>
	required_auths: Array<number | string>
	extensions: Array<any>
}

export interface balance_claim {
	fee: asset
	deposit_to_account: number | string
	balance_to_claim: number | string
	balance_owner_key: string
	total_claimed: asset
}

export interface override_transfer {
	fee: asset
	issuer: number | string
	from: number | string
	to: number | string
	amount: asset
	memo?: memo_data
	extensions: Array<any>
}

export interface stealth_confirmation {
	one_time_key: string
	to?: string
	encrypted_memo: string
}

export interface blind_output {
	commitment: string
	range_proof: string
	owner: authority
	stealth_memo?: stealth_confirmation
}

export interface transfer_to_blind {
	fee: asset
	amount: asset
	from: number | string
	blinding_factor: string
	outputs: Array<blind_output>
}

export interface blind_input {
	commitment: string
	owner: authority
}

export interface blind_transfer {
	fee: asset
	inputs: Array<blind_input>
	outputs: Array<blind_output>
}

export interface transfer_from_blind {
	fee: asset
	amount: asset
	to: number | string
	blinding_factor: string
	inputs: Array<blind_input>
}

export interface asset_settle_cancel {
	fee: asset
	settlement: number | string
	account: number | string
	amount: asset
	extensions: Array<any>
}

export interface asset_claim_fees {
	fee: asset
	issuer: number | string
	amount_to_claim: asset
	extensions: Array<any>
}

export interface type_def {
	new_type_name: string
	type: string
}

export interface field_def {
	name: string
	type: string
}

export interface struct_def {
	name: string
	base: string
	fields: Array<field_def>
}

export interface action_def {
	name: string
	type: string
	payable: boolean
}

export interface table_def {
	name: string
	index_type: string
	key_names: Array<string>
	key_types: Array<string>
	type: string
}

export interface clause_pair {
	id: string
	body: string
}

export interface error_message {
	error_code: number | string
	error_msg: string
}

export interface abi_def {
	version: string
	types: Array<type_def>
	structs: Array<struct_def>
	actions: Array<action_def>
	tables: Array<table_def>
	error_messages: Array<error_message>
	abi_extensions: Array<any>
}

export interface contract_asset {
	amount: number | string
	asset_id: number | string
}

export interface create_contract {
	fee: asset
	name: string
	account: number | string
	vm_type: string
	vm_version: string
	code: string
	abi: abi_def
	extensions: Array<any>
}

export interface call_contract {
	fee: asset
	account: number | string
	contract_id: number | string
	amount?: asset
	method_name: string
	data: string
	extensions: Array<any>
}

export interface update_contract {
	fee: asset
	owner: number | string
	new_owner?: number | string
	contract: number | string
	code: string
	abi: abi_def
	extensions: Array<any>
}

export interface trust_node_pledge_withdraw {
	fee: asset
	witness_account: number | string
}

export interface inline_transfer {
	fee: asset
	from: number | string
	to: number | string
	amount: asset
	memo: string
	extensions: Array<any>
}

export interface inter_contract_call {
	fee: asset
	sender_contract: number | string
	contract_id: number | string
	amount: asset
	method_name: string
	data: string
	extensions: Array<any>
}

export interface staking_create {
	fee: asset
	owner: number | string
	trust_node: number | string
	amount: asset
	program_id: string
	weight: number
	staking_days: number
	extensions: Array<any>
}

export interface staking_update {
	fee: asset
	owner: number | string
	trust_node: number | string
	staking_id: number | string
	extensions: Array<any>
}

export interface staking_claim {
	fee: asset
	owner: number | string
	staking_id: number | string
	extensions: Array<any>
}

export interface witness_set_commission {
	fee: asset
	witness: number | string
	witness_account: number | string
	commission_rate: number
	extensions: Array<any>
}

export interface witness_unbanned {
	fee: asset
	witness: number | string
	witness_account: number | string
	extensions: Array<any>
}

export interface account_upgrade_merchant {
}

export interface account_upgrade_datasource {
}

export interface account_upgrade_data_transaction_member {
}

export interface stale_data_market_category_create {
}

export interface stale_ata_market_category_update {
}

export interface stale_free_data_product_create {
}

export interface stale_free_data_product_update {
}

export interface stale_league_data_product_create {
}

export interface stale_league_data_product_update {
}

export interface stale_league_create {
}

export interface stale_league_update {
}

export interface data_market_category_create {
}

export interface data_market_category_update {
}

export interface free_data_product_create {
}

export interface free_data_product_update {
}

export interface league_data_product_create {
}

export interface league_data_product_update {
}

export interface league_create {
}

export interface league_update {
}

export interface datasource_copyright_clear {
}

export interface data_transaction_complain {
}

export interface balance_lock {
	fee: asset
	account: number | string
	create_date_time: number | string
	program_id: string
	amount: asset
	lock_days: number
	interest_rate: number
	memo: string
	extensions: Array<any>
}

export interface balance_unlock {
	fee: asset
	account: number | string
	lock_id: number | string
	extensions: Array<any>
}

export interface data_transaction_create {
	request_id: string
	product_id: string
	version: string
	params: string
	fee: asset
	requester: number | string
	create_date_time: number | string
	league_id?: number | string
	extensions: Array<any>
}

export interface data_transaction_update {
	request_id: string
	new_status: number
	fee: asset
	new_requester: number | string
	memo: string
	extensions: Array<any>
}

export interface data_transaction_pay {
	fee: asset
	from: number | string
	to: number | string
	amount: asset
	request_id: string
	extensions: Array<any>
}

export interface data_transaction_datasource_upload {
	request_id: string
	requester: number | string
	datasource: number | string
	fee: asset
	extensions: Array<any>
}

export interface data_transaction_datasource_validate_error {
	request_id: string
	datasource: number | string
	fee: asset
	extensions: Array<any>
}

export interface proxy_transfer_params {
	from: number | string
	to: number | string
	proxy_account: number | string
	amount: asset
	percentage: number
	memo: string
	expiration: number | string
}

export interface signed_proxy_transfer_params {
	from: number | string
	to: number | string
	proxy_account: number | string
	amount: asset
	percentage: number
	memo: string
	expiration: number | string
	signatures: Array<string>
}

export interface proxy_transfer {
	proxy_memo: string
	fee: asset
	request_params: signed_proxy_transfer_params
	extensions: Array<any>
}

export interface transaction {
	ref_block_num: number
	ref_block_prefix: number
	expiration: number | string
	operations: operations
	extensions: Array<any>
}

export interface signed_transaction {
	ref_block_num: number
	ref_block_prefix: number
	expiration: number | string
	operations: operations
	extensions: Array<any>
	signatures: Array<string>
}

export interface stealth_memo_data {
	from?: string
	amount: asset
	blinding_factor: string
	commitment: string
	check: number
}

export type operation = [GXChainOperation.transfer, transfer] | [GXChainOperation.limit_order_create, limit_order_create] | [GXChainOperation.limit_order_cancel, limit_order_cancel] | [GXChainOperation.call_order_update, call_order_update] | [GXChainOperation.fill_order, fill_order] | [GXChainOperation.account_create, account_create] | [GXChainOperation.account_update, account_update] | [GXChainOperation.account_whitelist, account_whitelist] | [GXChainOperation.account_upgrade, account_upgrade] | [GXChainOperation.account_transfer, account_transfer] | [GXChainOperation.asset_create, asset_create] | [GXChainOperation.asset_update, asset_update] | [GXChainOperation.asset_update_bitasset, asset_update_bitasset] | [GXChainOperation.asset_update_feed_producers, asset_update_feed_producers] | [GXChainOperation.asset_issue, asset_issue] | [GXChainOperation.asset_reserve, asset_reserve] | [GXChainOperation.asset_fund_fee_pool, asset_fund_fee_pool] | [GXChainOperation.asset_settle, asset_settle] | [GXChainOperation.asset_global_settle, asset_global_settle] | [GXChainOperation.asset_publish_feed, asset_publish_feed] | [GXChainOperation.witness_create, witness_create] | [GXChainOperation.witness_update, witness_update] | [GXChainOperation.proposal_create, proposal_create] | [GXChainOperation.proposal_update, proposal_update] | [GXChainOperation.proposal_delete, proposal_delete] | [GXChainOperation.withdraw_permission_create, withdraw_permission_create] | [GXChainOperation.withdraw_permission_update, withdraw_permission_update] | [GXChainOperation.withdraw_permission_claim, withdraw_permission_claim] | [GXChainOperation.withdraw_permission_delete, withdraw_permission_delete] | [GXChainOperation.committee_member_create, committee_member_create] | [GXChainOperation.committee_member_update, committee_member_update] | [GXChainOperation.committee_member_update_global_parameters, committee_member_update_global_parameters] | [GXChainOperation.vesting_balance_create, vesting_balance_create] | [GXChainOperation.vesting_balance_withdraw, vesting_balance_withdraw] | [GXChainOperation.worker_create, worker_create] | [GXChainOperation.custom, custom] | [GXChainOperation.assert, assert] | [GXChainOperation.balance_claim, balance_claim] | [GXChainOperation.override_transfer, override_transfer] | [GXChainOperation.transfer_to_blind, transfer_to_blind] | [GXChainOperation.blind_transfer, blind_transfer] | [GXChainOperation.transfer_from_blind, transfer_from_blind] | [GXChainOperation.asset_settle_cancel, asset_settle_cancel] | [GXChainOperation.asset_claim_fees, asset_claim_fees] | [GXChainOperation.fba_distribute_operation, fba_distribute_operation] | [GXChainOperation.account_upgrade_merchant, account_upgrade_merchant] | [GXChainOperation.account_upgrade_datasource, account_upgrade_datasource] | [GXChainOperation.stale_data_market_category_create, stale_data_market_category_create] | [GXChainOperation.stale_ata_market_category_update, stale_ata_market_category_update] | [GXChainOperation.stale_free_data_product_create, stale_free_data_product_create] | [GXChainOperation.stale_free_data_product_update, stale_free_data_product_update] | [GXChainOperation.stale_league_data_product_create, stale_league_data_product_create] | [GXChainOperation.stale_league_data_product_update, stale_league_data_product_update] | [GXChainOperation.stale_league_create, stale_league_create] | [GXChainOperation.stale_league_update, stale_league_update] | [GXChainOperation.data_transaction_create, data_transaction_create] | [GXChainOperation.data_transaction_update, data_transaction_update] | [GXChainOperation.data_transaction_pay, data_transaction_pay] | [GXChainOperation.account_upgrade_data_transaction_member, account_upgrade_data_transaction_member] | [GXChainOperation.data_transaction_datasource_upload, data_transaction_datasource_upload] | [GXChainOperation.data_transaction_datasource_validate_error, data_transaction_datasource_validate_error] | [GXChainOperation.data_market_category_create, data_market_category_create] | [GXChainOperation.data_market_category_update, data_market_category_update] | [GXChainOperation.free_data_product_create, free_data_product_create] | [GXChainOperation.free_data_product_update, free_data_product_update] | [GXChainOperation.league_data_product_create, league_data_product_create] | [GXChainOperation.league_data_product_update, league_data_product_update] | [GXChainOperation.league_create, league_create] | [GXChainOperation.league_update, league_update] | [GXChainOperation.datasource_copyright_clear, datasource_copyright_clear] | [GXChainOperation.data_transaction_complain, data_transaction_complain] | [GXChainOperation.balance_lock, balance_lock] | [GXChainOperation.balance_unlock, balance_unlock] | [GXChainOperation.proxy_transfer, proxy_transfer] | [GXChainOperation.create_contract, create_contract] | [GXChainOperation.call_contract, call_contract] | [GXChainOperation.update_contract, update_contract] | [GXChainOperation.trust_node_pledge_withdraw, trust_node_pledge_withdraw] | [GXChainOperation.inline_transfer, inline_transfer] | [GXChainOperation.inter_contract_call, inter_contract_call] | [GXChainOperation.staking_create, staking_create] | [GXChainOperation.staking_update, staking_update] | [GXChainOperation.staking_claim, staking_claim] | [GXChainOperation.witness_set_commission, witness_set_commission] | [GXChainOperation.witness_unbanned, witness_unbanned]
export type operations = Array<operation>;

export enum GXChainOperation {
	transfer,
	limit_order_create,
	limit_order_cancel,
	call_order_update,
	fill_order,
	account_create,
	account_update,
	account_whitelist,
	account_upgrade,
	account_transfer,
	asset_create,
	asset_update,
	asset_update_bitasset,
	asset_update_feed_producers,
	asset_issue,
	asset_reserve,
	asset_fund_fee_pool,
	asset_settle,
	asset_global_settle,
	asset_publish_feed,
	witness_create,
	witness_update,
	proposal_create,
	proposal_update,
	proposal_delete,
	withdraw_permission_create,
	withdraw_permission_update,
	withdraw_permission_claim,
	withdraw_permission_delete,
	committee_member_create,
	committee_member_update,
	committee_member_update_global_parameters,
	vesting_balance_create,
	vesting_balance_withdraw,
	worker_create,
	custom,
	assert,
	balance_claim,
	override_transfer,
	transfer_to_blind,
	blind_transfer,
	transfer_from_blind,
	asset_settle_cancel,
	asset_claim_fees,
	fba_distribute_operation,
	account_upgrade_merchant,
	account_upgrade_datasource,
	stale_data_market_category_create,
	stale_ata_market_category_update,
	stale_free_data_product_create,
	stale_free_data_product_update,
	stale_league_data_product_create,
	stale_league_data_product_update,
	stale_league_create,
	stale_league_update,
	data_transaction_create,
	data_transaction_update,
	data_transaction_pay,
	account_upgrade_data_transaction_member,
	data_transaction_datasource_upload,
	data_transaction_datasource_validate_error,
	data_market_category_create,
	data_market_category_update,
	free_data_product_create,
	free_data_product_update,
	league_data_product_create,
	league_data_product_update,
	league_create,
	league_update,
	datasource_copyright_clear,
	data_transaction_complain,
	balance_lock,
	balance_unlock,
	proxy_transfer,
	create_contract,
	call_contract,
	update_contract,
	trust_node_pledge_withdraw,
	inline_transfer,
	inter_contract_call,
	staking_create,
	staking_update,
	staking_claim,
	witness_set_commission,
	witness_unbanned
};