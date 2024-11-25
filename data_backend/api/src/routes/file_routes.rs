use rocket::form::Form;
use rocket::fs::TempFile;
use rocket::response::status;
use rocket::request::{FromRequest, Outcome, Request};
use std::path::Path;
use tokio::fs;
use crate::models::UserId;
use uuid::Uuid;

#[derive(FromForm)]
pub struct Upload<'f> {
    file: TempFile<'f>,
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

#[post("/upload", format = "multipart/form-data", data = "<form>")]
pub async fn upload_file(
    form: Form<Upload<'_>>,
    user_id: UserId,
) -> Result<status::Accepted<String>, status::Custom<String>> {
    // Ensure the "storage" directory exists
    create_folder_if_not_exist("storage").await?;

    // Use the original file name as is
    let original_name = form.file.name().unwrap_or("default");

    let new_name = format!("{}_{}", original_name, Uuid::new_v4());

    // Build the destination path
    let destination_dir = format!("storage/raw/{}", user_id.0);
    let destination = Path::new(&destination_dir).join(original_name);

    // Get the temporary file path
    let file_path = form.file.path().ok_or_else(|| {
        status::Custom(
            rocket::http::Status::BadRequest,
            "No file path provided.".to_string(),
        )
    })?;

    // Ensure the directory exists
    if let Err(err) = fs::create_dir_all(destination_dir).await {
        return Err(status::Custom(
            rocket::http::Status::InternalServerError,
            format!("Failed to create directory: {}", err),
        ));
    }

    // Copy the file to the destination
    if let Err(err) = fs::copy(file_path, &destination).await {
        return Err(status::Custom(
            rocket::http::Status::InternalServerError,
            format!("Failed to save file: {}", err),
        ));
    }

    // Return the path of the saved file
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