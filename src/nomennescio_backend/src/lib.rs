use ic_cdk_macros::{init, query, update};
use std::collections::HashMap;
use std::sync::RwLock;
use std::sync::LazyLock;
use uuid::Uuid;
use sha2::{Sha256, Digest};

static KEY: RwLock<Option<String>> = RwLock::new(None);
static USER: LazyLock<RwLock<HashMap<String, (String, String)>>> = LazyLock::new(|| RwLock::new(HashMap::new()));

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
fn set_user(email: String, password: String) -> bool {
    let mut db = USER.write().unwrap();
    if db.contains_key(&email) {
        return false;
    }
    let hashed_password = hash_password(&password);
    let user_id = Uuid::new_v5(&(Uuid::NAMESPACE_DNS), email.as_bytes()).to_string();
    db.insert(email, (hashed_password, user_id));
    true
}

#[query]
fn get_user(email: String, password: String) -> Option<String> {
    let db = USER.read().unwrap();
    if let Some((stored_hashed_password, user_id)) = db.get(&email) {
        if verify_password(&password, stored_hashed_password) {
            return Some(user_id.clone());
        }
    }
    None
}

#[update]
fn remove_user(email: String, password: String) -> bool {
    let mut db = USER.write().unwrap();
    if let Some((stored_hashed_password, _)) = db.get(&email) {
        if verify_password(&password, stored_hashed_password) {
            db.remove(&email);
            return true;
        }
    }
    false
}

fn hash_password(password: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(password.as_bytes());
    format!("{:x}", hasher.finalize())
}

fn verify_password(password: &str, hashed_password: &str) -> bool {
    hash_password(password) == hashed_password
}

ic_cdk::export_candid!();