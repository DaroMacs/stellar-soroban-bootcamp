use soroban_sdk::Env;

use crate::storage::types::storage::DataKey;

pub fn read_contract_balance(env: &Env) -> i128 {
    env.storage()
        .persistent()
        .get(&DataKey::ContractBalance)
        .unwrap_or(0)
}

pub fn write_contract_balance(env: &Env, amount: &i128) {
    env.storage()
        .persistent()
        .set(&DataKey::ContractBalance, amount);
}
