use serde::Serialize;

#[derive(Serialize)]
pub struct Response<T> {
    pub success: bool,
    pub message: String,
    pub data: Option<T>,
}
