use serde::Deserialize;

#[derive(FromForm, Deserialize)]
pub struct CreateEmailData {
    pub title: String,
    pub description: String,
    pub sender_id: i32,
    pub files: Vec<FileData>,
    pub receivers: Vec<i32>,
}

#[derive(FromForm, Deserialize)]
pub struct FileData {
    pub file_name: String,
    pub file_path: String,
}
