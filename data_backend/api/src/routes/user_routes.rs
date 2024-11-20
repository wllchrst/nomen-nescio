use chrono::Utc;
use entity::user;
use rocket::form::Form;
use sea_orm::{sqlx::types::Json, DatabaseConnection};
use serde_json::json;
use service::user::UserMutation;

use crate::models::{request::create_user::CreateUserData, response::Response};
use rocket::State;

#[post("/user", data = "<input>")]
async fn create_user(
    database: &State<DatabaseConnection>,
    input: Form<CreateUserData>,
) -> Json<JsonValue> {
    let data = input.into_inner();

    let user_data = user::Model {
        email: data.email,
        name: data.name,
        password: data.password,
        created_at: Utc::now().naive_utc(),
        id: 0,
    };

    let result = UserMutation::create_user(&database, user_data).await;

    match result {
        Ok(active_model) => {
            // Successfully inserted the user
            Json(Response {
                success: true,
                message: "Success creating user".to_string(),
                data: Some(active_model),
            })
        }
        Err(error) => Json(Response {
            success: false,
            message: "Something went wrong creating the user".to_string(),
            data: None,
        }),
    }
}
