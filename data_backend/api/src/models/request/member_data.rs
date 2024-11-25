use serde::Deserialize;

#[derive(FromForm, Deserialize)]
pub struct MemberData{
    pub user_id: i32,
    pub role: String,
}
