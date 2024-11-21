use ic_cdk_macros::{init, query, update};
use std::collections::HashMap;
use std::sync::RwLock;
use std::sync::LazyLock;

static KEY: RwLock<Option<String>> = RwLock::new(None);
static USER: LazyLock<RwLock<HashMap<String, String>>> = LazyLock::new(|| RwLock::new(HashMap::new()));

#[init]
fn init() {
    let mut key = KEY.write().unwrap();
    *key = None;
    let mut db = USER.write().unwrap();
    db.clear();
}

#[update]
fn set_key(new_key: String) {
    let mut key = KEY.write().unwrap();
    *key = Some(new_key);
}

#[query]
fn get_key() -> Option<String> {
    let key = KEY.read().unwrap();
    key.clone()
}

#[update]
fn set_user(password: String, user_id: String) {
    let mut db = USER.write().unwrap();
    db.insert(password, user_id);
}

#[query]
fn get_user(password: String) -> Option<String> {
    let db = USER.read().unwrap();
    db.get(&password).cloned()
}

#[update]
fn remove_user(password: String) -> bool {
    let mut db = USER.write().unwrap();
    db.remove(&password).is_some()
}

ic_cdk::export_candid!();