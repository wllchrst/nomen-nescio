#[derive(FromForm)]
pub struct CreateUserData {
    pub name: String,
    pub email: String,
    pub password: String,
}
