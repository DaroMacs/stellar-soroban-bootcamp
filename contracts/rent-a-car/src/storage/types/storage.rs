use soroban_sdk::{contracttype, Address};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,                       // dirección del administrador del contrato
    Token,                       // dirección del token de pago aceptado
    Car(Address),                // auto asociado a un owner
    Rental(Address, Address),    // registro de alquiler entre renter y owner
    ContractBalance,            // balance del contrato
}
