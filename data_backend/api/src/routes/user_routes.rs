use std::fmt::format;

use crate::models::request::{create_user::CreateUserData, login_user::LoginUser};
use crate::models::response::response::Response;
use chrono::Utc;
use entity::user;
use rocket::serde::json::Json;
use rocket::State;
use sea_orm::{DatabaseConnection, DbErr};
use serde_json::{json, Value};
use service::user::{UserMutation, UserQuery};

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

#[post("/user-login", data = "<input>")]
pub async fn handle_login(
    database: &State<DatabaseConnection>,
    input: Json<LoginUser>,
) -> Json<Value> {
    let login_data = input.into_inner();

    let result: Result<Option<user::Model>, DbErr> =
        UserQuery::get_user_by_email(database, login_data.email).await;

    let response: Response<String>;

    match result {
        Ok(Some(user)) => {
            let mut message: String = "".to_string();
            let mut successful: bool = false;
            let mut data: String = "".to_string();

            if user.password == login_data.password {
                message = "Login Successful".to_string();
                successful = true;
                data = user.id.to_string();
            } else {
                message = "Incorrect Credentials".to_string();
                successful = false;
            }

            response = Response {
                data: data,
                message: message,
                success: successful,
            }
        }
        Ok(None) => {
            response = Response {
                data: "".to_string(),
                message: "Incorrect Credeetials".to_string(),
                success: false,
            }
        }
        Err(e) => {
            response = Response {
                data: "".to_string(),
                message: format!("Something went wrong {}", e),
                success: false,
            }
        }
    }

    Json(json!(response))
}
