 use soroban_sdk::{Address, Env, Symbol};

pub(crate) fn contract_initialized(env: &Env, admin: Address, token: Address) {
    let topics = (Symbol::new(env, "contract_initialized"),);

    env.events().publish(
        topics,
        (admin, token)
    );
}
