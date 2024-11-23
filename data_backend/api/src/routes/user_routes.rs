use std::fmt::format;

use crate::models::request::create_user::CreateUserData;
use crate::models::response::response::Response;
use chrono::Utc;
use entity::user;
use rocket::State;
use rocket::{form::Form, serde::json::Json};
use sea_orm::DatabaseConnection;
use serde_json::{json, Value};
use service::user::UserMutation;
use uuid::Uuid;

#[post("/user", data = "<input>")]
pub async fn create_user(
    database: &State<DatabaseConnection>,
    input: Json<CreateUserData>,
) -> Json<Value> {
    let data = input.into_inner();

    let user_data = user::Model {
        email: data.email,
        name: data.name,
        password: data.password,
        created_at: Utc::now().naive_utc(),
        id: 0,
        signature_file_path: data.signature_file_path,
        secret_key: Uuid::new_v4().to_string(),
    };

    let result = UserMutation::create_user(&database, user_data).await;

    let response = match result {
        Ok(active_model) => Response {
            success: true,
            message: "Success creating user".to_string(),
            data: Some(true),
        },
        Err(error) => Response {
            success: false,
            message: format!("Something went wrong creating the user {}", error),
            data: Some(false),
        },
    };

    Json(json!(response))
}
