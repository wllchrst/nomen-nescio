use rocket::form::Form;
use rocket::fs::TempFile;
use rocket::response::status;
use rocket::serde::json::Json;
use serde::Deserialize;
use rocket::request::{FromRequest, Outcome, Request};
use std::path::{Path, PathBuf};
use tokio::fs;
use uuid::Uuid;
use service::user::UserQuery;
use crate::models::{User, UserId};
use sea_orm::{DbErr, DatabaseConnection};
use entity::user;
use rocket::State;
use rocket::fs::NamedFile;
use rocket::tokio::fs::File;
#[derive(FromForm)]
pub struct Upload<'f> {
    file: TempFile<'f>,
}

#[derive(FromForm)]
pub struct UploadWithName<'f> {
    file: TempFile<'f>,
    file_name: String,
}

async fn create_folder_if_not_exist(folder_name: &str) -> Result<(), status::Custom<String>> {
    if !Path::new(folder_name).exists() {
        match fs::create_dir_all(folder_name).await {
            Ok(_) => Ok(()),
            Err(err) => Err(status::Custom(
                rocket::http::Status::InternalServerError,
                format!("Failed to create storage directory: {}", err)))
        };
    }

    Ok(())
}

async fn copy_file_to(source: &Path, target: &Path) -> Result<(), status::Custom<String>> {
    match fs::copy(source, target).await {
        Ok(_) => Ok(()),
        Err(err) => Err(status::Custom(
            rocket::http::Status::InternalServerError,
            format!("Failed to create directory: {}", err),
        ))
    }
}

fn extract_file_name(file_path: &str) -> Option<String> {
    let path = Path::new(file_path);

    path.file_name()
        .and_then(|name| name.to_str()) 
        .map(|s| s.to_string())          
}

#[post("/upload", format = "multipart/form-data", data = "<form>")]
pub async fn upload_file(
    form: Form<UploadWithName<'_>>,
    user_id: UserId,
) -> Result<status::Accepted<String>, status::Custom<String>> {
    create_folder_if_not_exist("storage").await?;

    let destination_dir = format!("storage/raw/{}", user_id.0);
    let destination = Path::new(&destination_dir).join(form.file_name.to_string());

    let file_path = form.file.path().ok_or_else(|| {
        status::Custom(
            rocket::http::Status::BadRequest,
            "No file path provided.".to_string(),
        )
    })?;

    if let Err(err) = fs::create_dir_all(destination_dir).await {
        return Err(status::Custom(
            rocket::http::Status::InternalServerError,
            format!("Failed to create directory: {}", err),
        ));
    }

    if let Err(err) = fs::copy(file_path, &destination).await {
        return Err(status::Custom(
            rocket::http::Status::InternalServerError,
            format!("Failed to save file: {}", err),
        ));
    }

    Ok(status::Accepted(destination.to_string_lossy().to_string()))
}

#[post("/upload-signature", format="multipart/form-data", data = "<form>")]
pub async fn upload_signature(
    form: Form<Upload<'_>>,
) -> Result<status::Accepted<String>, status::Custom<String>> {
     create_folder_if_not_exist("storage").await?;
 
     let destination_dir = format!("storage/signature");
     let destination = Path::new(&destination_dir).join(format!("{}.jpg", Uuid::new_v4()));
 
     let file_path = form.file.path().ok_or_else(|| {
         status::Custom(
             rocket::http::Status::BadRequest,
             "No file path provided.".to_string(),
         )
     })?;
 
     if let Err(err) = fs::create_dir_all(destination_dir).await {
         return Err(status::Custom(
             rocket::http::Status::InternalServerError,
             format!("Failed to create directory: {}", err),
         ));
     }
 
     if let Err(err) = fs::copy(file_path, &destination).await {
         return Err(status::Custom(
             rocket::http::Status::InternalServerError,
             format!("Failed to save file: {}", err),
         ));
     }

     Ok(status::Accepted(destination.to_string_lossy().to_string()))
}

#[derive(Deserialize)]
struct GetFileInput {
    file_path: String,
    secret_key: String,
}

#[post("/get-file", data = "<input>")]
pub async fn get_file( database: &State<DatabaseConnection>, input: Json<GetFileInput>, user_id: UserId,) -> Result<status::Accepted<String>, status::Custom<String>> {
    create_folder_if_not_exist("storage/temp").await?;

    let file_path = &input.file_path;
    let secret_key = &input.secret_key;
    let user_id = user_id.0;

    if file_path.is_empty() {
        return Err(status::Custom(
            rocket::http::Status::BadRequest,
            "File path cannot be empty.".to_string(),
        ));
    }

    if secret_key.is_empty() {
        return Err(status::Custom(
            rocket::http::Status::BadRequest,
            "Secret token cannot be empty.".to_string(),
        ));
    }

    let result: user::Model =
    UserQuery::get_user_by_id(database, user_id.parse::<i32>().unwrap()).await.unwrap().expect("User not found");

    if result.secret_key != *secret_key {
        return Err(status::Custom(
            rocket::http::Status::InternalServerError,
            "Failed to save file:".to_owned()));
    }
    
    let destination_dir = format!("storage/temp");
    let destination = Path::new(&destination_dir).join(extract_file_name(file_path).unwrap());

    if let Err(err) = fs::copy(file_path, &destination).await {
        return Err(status::Custom(
            rocket::http::Status::InternalServerError,
            format!("Failed to save file: {}", err),
        ));
    }

    Ok(status::Accepted(extract_file_name(file_path).unwrap()))
}

#[get("/files/<file_name>")]
pub async fn serve_file(file_name: String) -> Option<NamedFile> {
    let base_path = "storage/temp";  
    let file_path = Path::new(base_path).join(file_name);
    if file_path.exists() {
        NamedFile::open(file_path).await.ok()
    } else {
        None 
    }
}