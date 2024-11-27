use crate::models::request::{create_user::CreateUserData, login_user::LoginUser};
use crate::models::{response::response::Response, User};
use chrono::Utc;
use entity::user;
use rocket::serde::json::Json;
use rocket::State;
use sea_orm::{DatabaseConnection, DbErr};
use serde_json::{json, Value};
use service::user::{UserMutation, UserQuery};
use uuid::Uuid;

#[post("/user", data = "<input>")]
pub async fn create_user(
    database: &State<DatabaseConnection>,
    input: Json<CreateUserData>,
) -> Json<Value> {
    let data = input.into_inner();

    print!(
        "{} {} {} {} ",
        data.email, data.name, data.password, data.signature_file_path
    );

    let user_data = user::Model {
        email: data.email,
        name: data.name,
        password: data.password,
        created_at: Utc::now().naive_utc(),
        id: 0,
        signature_file_path: data.signature_file_path,
        secret_key: Uuid::new_v4().to_string(),
        profile_picture_path: data.profile_picture_path,
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

    let response: Response<User>;

    let mut data = User {
        id: "".to_string(),
        email: "".to_string(),
        name: "".to_string(),
    };

    match result {
        Ok(Some(user)) => {
            let mut message: String = "".to_string();
            let mut successful: bool = false;

            if user.password == login_data.password {
                message = "Login Successful".to_string();
                successful = true;
                data = User {
                    id: user.id.to_string(),
                    email: user.email,
                    name: user.name,
                };
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
                data: data,
                message: "Incorrect Credeetials".to_string(),
                success: false,
            }
        }
        Err(e) => {
            response = Response {
                data: data,
                message: format!("Something went wrong {}", e),
                success: false,
            }
        }
    }

    Json(json!(response))
}

#[put("/user/<id>", data = "<input>")]
pub async fn update_user(
    database: &State<DatabaseConnection>,
    input: Json<CreateUserData>,
    id: String,
) -> Json<Value> {
    let user_id: i32 = match id.parse::<i32>() {
        Ok(parsed_id) => parsed_id,
        Err(_) => {
            return Json(json!(Response::<Option<user::Model>> {
                data: None,
                message: "Invalid user ID".to_string(),
                success: false,
            }));
        }
    };

    let data = input.into_inner();

    let user_data = user::Model {
        email: data.email,
        name: data.name,
        password: data.password,
        created_at: Utc::now().naive_utc(),
        id: 0,
        signature_file_path: data.signature_file_path,
        profile_picture_path: data.profile_picture_path,
        secret_key: Uuid::new_v4().to_string(),
    };

    let result: Result<user::ActiveModel, DbErr> =
        UserMutation::update_user_data(database, user_data, user_id).await;

    let response = match result {
        Ok(updated_user) => Response {
            data: true,
            success: true,
            message: "Success updating user".to_string(),
        },
        Err(e) => Response {
            data: false,
            success: false,
            message: format!("Failed to update user: {}", e),
        },
    };

    Json(json!(response))
}

#[get("/user/<id>")]
pub async fn get_user_information(database: &State<DatabaseConnection>, id: String) -> Json<Value> {
    let user_id: i32 = match id.parse::<i32>() {
        Ok(parsed_id) => parsed_id,
        Err(_) => {
            return Json(json!(Response::<Option<user::Model>> {
                data: None,
                message: "Invalid user ID".to_string(),
                success: false,
            }));
        }
    };

    let result: Result<Option<user::Model>, DbErr> =
        UserQuery::get_user_by_id(database, user_id).await;

    let response = match result {
        Ok(Some(user)) => Response {
            data: Some(user),
            message: "User Information".to_string(),
            success: true,
        },
        Ok(None) => Response {
            data: None,
            message: "User not found".to_string(),
            success: false,
        },
        Err(e) => Response {
            data: None,
            message: format!("Something went wrong: {}", e),
            success: false,
        },
    };

    Json(json!(response))
}

#[get("/user")]
pub async fn get_all_user(database: &State<DatabaseConnection>) -> Json<Value> {
    let result: Result<Vec<user::Model>, DbErr> = UserQuery::get_all_user(database).await;

    let response = match result {
        Ok(users) if !users.is_empty() => Response {
            data: Some(users),
            message: "All user info".to_string(),
            success: true,
        },
        Ok(_) => Response {
            data: None,
            message: "There is no user".to_string(),
            success: false,
        },
        Err(e) => Response {
            data: None,
            message: format!("Something went wrong: {}", e),
            success: false,
        },
    };

    Json(json!(response))
}
