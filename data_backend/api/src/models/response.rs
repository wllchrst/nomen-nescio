#[derive(Serialize)] // Add Serialize if you want to serialize it to JSON
pub struct Response<T> {
    pub success: bool,
    pub message: String,
    pub data: Option<T>, // Use `Option` if the data might be absent
}
