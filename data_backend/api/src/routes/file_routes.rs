use rocket::form::Form;
use rocket::fs::TempFile;
use std::path::Path;
use tokio::fs;

#[derive(FromForm)]
pub struct Upload<'f> {
    file: TempFile<'f>,
}

#[post("/upload", format = "multipart/form-data", data = "<form>")]
pub async fn upload_file(form: Form<Upload<'_>>) -> std::io::Result<()> {
    let file_name = form.file.name().unwrap();

    let destination = Path::new("storage").join(file_name);

    let file_path = form.file.path().unwrap();
    fs::copy(file_path, destination).await?;

    Ok(())
}
