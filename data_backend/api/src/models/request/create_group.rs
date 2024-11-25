use serde::Deserialize;

#[derive(FromForm, Deserialize)]
pub struct CreateGroupData {
    pub name: String,
    pub description: String,
}
