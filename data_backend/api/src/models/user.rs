use rocket::serde::Serialize;

#[derive(Serialize)]
pub struct User {
    pub name: String,
    pub id: String,
    pub email: String
}