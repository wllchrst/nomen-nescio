use crate::models::request::create_email::CreateEmailData;
use crate::models::response::response::Response;
use entity::{email, email_file, receiver};
use rocket::serde::json::Json;
use rocket::State;
use sea_orm::{DatabaseConnection, DbErr};
use serde_json::{json, Value};
use service::email::{EmailMutation, EmailQuery};

#[post("/email", data = "<input>")]
pub async fn create_email(
    database: &State<DatabaseConnection>,
    input: Json<CreateEmailData>,
) -> Json<Response<Value>> {
    let email_data = input.into_inner();

    // Prepare the email model
    let email_model = email::Model {
        title: email_data.title.clone(),
        description: email_data.description.clone(),
        id: 0,
        sender_id: email_data.sender_id.clone(),
    };

    // Prepare the receiver models
    let receiver_models: Vec<receiver::Model> = email_data
        .receivers
        .into_iter()
        .map(|user_id| receiver::Model {
            user_id,
            email_id: 0,
            id: 0,
        })
        .collect();

    // Prepare the file models
    let file_models: Vec<email_file::Model> = email_data
        .files
        .into_iter()
        .map(|file| email_file::Model {
            file_path: file.file_path,
            file_name: file.file_name,
            email_id: 0,
            id: 0,
        })
        .collect();

    // Call the `create_email` function
    match EmailMutation::create_email(database, email_model, receiver_models, file_models).await {
        Ok(_) => Json(Response {
            success: true,
            message: "Email created successfully".to_string(),
            data: json!({}),
        }),
        Err(err) => Json(Response {
            success: false,
            message: err.to_string(),
            data: json!({}),
        }),
    }
}

#[get("/email/<id>")]
pub async fn get_email_by_id(db: &State<DatabaseConnection>, id: String) -> Json<Value> {
    let email_id: i32 = match id.parse::<i32>() {
        Ok(parsed_id) => parsed_id,
        Err(_) => {
            return Json(json!(Response::<Option<email::Model>> {
                success: false,
                message: "Invalid email ID".to_string(),
                data: None,
            }));
        }
    };

    // Retrieve the email data
    let result: Result<
        Option<(
            entity::email::Model,
            Vec<entity::receiver::Model>,
            Vec<entity::email_file::Model>,
        )>,
        DbErr,
    > = EmailQuery::get_email_by_id(db, email_id).await;

    let response = match result {
        Ok(Some(email_data)) => Response {
            success: true,
            message: "Email information retrieved successfully".to_string(),
            data: Some(email_data),
        },
        Ok(None) => Response {
            data: None,
            message: "Email not found".to_string(),
            success: false,
        },
        Err(e) => Response {
            success: false,
            message: format!("Something went wrong: {}", e),
            data: None,
        },
    };

    Json(json!(response))
}

#[get("/user/email/<id>")]
pub async fn get_user_email(
    db: &State<DatabaseConnection>,
    id: String,
) -> Json<Response<Vec<email::Model>>> {
    let user_id: i32 = match id.parse::<i32>() {
        Ok(parsed_id) => parsed_id,
        Err(_) => {
            return Json(Response {
                success: false,
                message: "Invalid user ID".to_string(),
                data: vec![], // Empty data for invalid user ID
            });
        }
    };

    match EmailQuery::get_user_email(db, user_id).await {
        Ok(emails) => Json(Response {
            success: true,
            message: "User emails retrieved successfully".to_string(),
            data: emails, // Return the list of emails
        }),
        Err(e) => Json(Response {
            success: false,
            message: format!("Failed to retrieve user emails: {}", e),
            data: vec![], // Empty data on error
        }),
    }
}
