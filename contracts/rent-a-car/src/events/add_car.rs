 use soroban_sdk::{Address, Env, Symbol};

pub(crate) fn car_added(env: &Env, owner: Address, price_per_day: i128) {
    let topics = (Symbol::new(env, "car_added"), owner.clone());
    
    env.events().publish(
        topics,
        price_per_day
    );
}
