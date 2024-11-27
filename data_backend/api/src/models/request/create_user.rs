use serde::Deserialize;

#[derive(FromForm, Deserialize)]
pub struct CreateUserData {
    pub name: String,
    pub email: String,
    pub password: String,
    pub signature_file_path: String,
    pub profile_picture_path: Option<String>,
}
