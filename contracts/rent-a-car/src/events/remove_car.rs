use soroban_sdk::{Address, Env, Symbol};

pub(crate) fn car_removed(env: &Env, owner: Address) {
    let topics = (Symbol::new(env, "car_removed"), owner.clone());

    env.events().publish(
        topics,
        ()
    );
}
