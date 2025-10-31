use soroban_sdk::{Address, Env};

pub trait RentACarContractTrait {
    fn __constructor(env: &Env, admin: Address, token: Address);
    fn get_admin(env: &Env) -> Address;
}
