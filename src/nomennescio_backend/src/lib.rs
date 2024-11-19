use ic_cdk_macros::{init, query, update};
use std::sync::RwLock;

static KEY: RwLock<Option<String>> = RwLock::new(None);

#[init]
fn init() {
    let mut key = KEY.write().unwrap();
    *key = None;
}

#[update]
fn set_key(key: String) {
    let mut key = KEY.write().unwrap();
    *key = Some(key);
}

#[query]
fn get_key() -> Option<String> {
    let key = KEY.read().unwrap();
    key.clone();
}

ic_cdk::export_candid!();