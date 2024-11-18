use ::entity::{
    group::{self, Entity as Group},
    group_member,
    group_member::Entity as GroupMember,
    user::{self, Entity as User},
};
use sea_orm::*;

pub struct GroupQuery {}

impl GroupQuery {
    pub async fn get_group_by_id(db: &DbConn, id: i32) -> Result<Option<group::Model>, DbErr> {
        Group::find_by_id(id).one(db).await
    }

    pub async fn get_all_group(db: &DbConn) -> Result<Vec<group::Model>, DbErr> {
        Group::find().all(db).await
    }

    pub async fn get_user_groups(
        db: &DbConn,
        user_id: i32,
    ) -> Result<Vec<(group_member::Model, Option<group::Model>)>, DbErr> {
        let user: Option<user::Model> = User::find_by_id(user_id).one(db).await?;
        let user: user::Model = user.unwrap();
        let members: Vec<(group_member::Model, Option<group::Model>)> = user
            .find_related(GroupMember)
            .find_also_related(Group)
            .all(db)
            .await?;

        return Ok(members);
    }
}
