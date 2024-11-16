#[macro_use]
extern crate rocket;

use rocket::fairing::{self, AdHoc};
use rocket::form::{Context, Form};
use rocket::fs::{relative, FileServer};
use rocket::request::FlashMessage;
use rocket::response::{Flash, Redirect};
use rocket::{Build, Request, Rocket};
use rocket::data::{ByteUnit, Data};
use rocket::fs::TempFile;
use rocket::tokio::fs::File;
use rocket::tokio::io::AsyncWriteExt;
use rocket::routes;
use std::path::{Path, PathBuf};
use tokio::fs;

#[derive(FromForm)]
struct Upload<'f> {
    file: TempFile<'f>
}

#[post("/upload", format = "multipart/form-data", data = "<form>")]
async fn upload_file(form: Form<Upload<'_>>) -> std::io::Result<()> {
    let file_name = form.file.name().unwrap();

    let destination = Path::new("storage").join(file_name);

    let file_path = form.file.path().unwrap();
    fs::copy(file_path, destination).await?;

    Ok(())
}

#[tokio::main]
async fn start() -> Result<(), rocket::Error> {
    rocket::build()
        .mount(
            "/",
            routes![upload_file],
        )
        .launch()
        .await
        .map(|_| ())
}

pub fn main() {
    let result = start();

    println!("Rocket: deorbit.");

    if let Some(err) = result.err() {
        println!("Error: {err}");
    }
}