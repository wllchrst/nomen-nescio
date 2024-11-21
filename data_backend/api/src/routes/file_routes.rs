use rocket::form::Form;
use rocket::fs::TempFile;
use rocket::response::status;
use std::path::Path;
use tokio::fs;

#[derive(FromForm)]
pub struct Upload<'f> {
    file: TempFile<'f>,
}

#[post("/upload", format = "multipart/form-data", data = "<form>")]
pub async fn upload_file(
    form: Form<Upload<'_>>,
) -> Result<status::Accepted<String>, status::Custom<String>> {
    // Ensure the "storage" directory exists
    if !Path::new("storage").exists() {
        if let Err(err) = fs::create_dir("storage").await {
            return Err(status::Custom(
                rocket::http::Status::InternalServerError,
                format!("Failed to create storage directory: {}", err),
            ));
        }
    }

    // Use the original file name as is
    let original_name = form.file.name().unwrap_or("default");

    // Build the destination path
    let destination = Path::new("storage").join(original_name);

    // Get the temporary file path
    let file_path = form.file.path().ok_or_else(|| {
        status::Custom(
            rocket::http::Status::BadRequest,
            "No file path provided.".to_string(),
        )
    })?;

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
