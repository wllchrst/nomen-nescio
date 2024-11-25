use ic_cdk_macros::{init, query, update};
use std::collections::HashMap;
use std::sync::{RwLock, LazyLock};
use uuid::Uuid;
use sha2::{Sha256, Digest};

static USER: LazyLock<RwLock<HashMap<String, (String, String)>>> = LazyLock::new(|| RwLock::new(HashMap::new()));
static KEY: LazyLock<RwLock<HashMap<String, String>>> = LazyLock::new(|| RwLock::new(HashMap::new()));

#[init]
fn init() {
    let mut user_db = USER.write().unwrap();
    let mut key_db = KEY.write().unwrap();
    
    user_db.clear();
    key_db.clear();
}

#[query]
fn get_user_key(user_id: String) -> Option<String> {
    let db = KEY.read().unwrap();
    db.get(&user_id).cloned()
}

#[update]
fn set_user(email: String, password: String) -> bool {
    let mut user_db = USER.write().unwrap();
    let mut key_db = KEY.write().unwrap();
    
    if user_db.contains_key(&email) {
        return false;
    }

    let hashed_password = hash_password(&password);
    let user_id = Uuid::new_v5(&(Uuid::NAMESPACE_DNS), email.as_bytes()).to_string();
    let user_key = Uuid::new_v5(&(Uuid::NAMESPACE_DNS), user_id.as_bytes()).to_string();
    
    user_db.insert(email.clone(), (hashed_password, user_id.clone()));
    key_db.insert(user_id.clone(), user_key);
    true
}

#[query]
fn get_user_id(email: String, password: String) -> Option<String> {
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
    let mut user_db = USER.write().unwrap();
    let mut key_db = KEY.write().unwrap();
    
    if let Some((stored_hashed_password, user_id)) = user_db.get(&email) {
        if verify_password(&password, stored_hashed_password) {
            key_db.remove(user_id);
            user_db.remove(&email);
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