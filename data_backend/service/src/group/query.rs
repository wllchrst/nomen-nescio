use ::entity::{group, group::Entity as Group};
use sea_orm::*;

pub struct GroupQuery {}

impl GroupQuery {
    pub async fn get_group_by_id(db: &DbConn, id: i32) -> Result<Option<group::Model>, DbErr> {
        Group::find_by_id(id).one(db).await
    }

    pub async fn get_all_group(db: &DbConn) -> Result<Vec<group::Model>, DbErr> {
        Group::find().all(db).await
    }

    pub async fn get_user_groups(db: &DbConn, user_id: i32) {
        Group::find().filter(group::Relation::GroupMember)
    }
}
