use serde::Deserialize;

use super::member_data::MemberData;

#[derive(FromForm, Deserialize)]
pub struct AddGroupMemberData {
    pub group_id: i32,
    pub members: Vec<MemberData>,
}
