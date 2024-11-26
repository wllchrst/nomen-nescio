use crate::user::UserQuery;
use ::entity::{
    group::{self, Entity as Group},
    group_member,
    prelude::GroupMember,
    user,
};
use sea_orm::*;

use super::GroupQuery;

pub struct GroupMutation {}

impl GroupMutation {
    pub async fn create_group(
        database: &DatabaseConnection,
        group_data: group::Model,
    ) -> Result<group::Model, sea_orm::DbErr> {
        let new_group = group::ActiveModel {
            name: Set(group_data.name.to_owned()),
            description: Set(group_data.description.to_owned()),
            ..Default::default()
        };

        let result = new_group.insert(database).await?;

        let inserted_group = group::Entity::find_by_id(result.id)
            .one(database)
            .await?
            .ok_or_else(|| sea_orm::DbErr::Custom("Failed to fetch inserted group".to_string()))?;

        // diganti dari return Active Model jadi return Model
        Ok(inserted_group)
    }

    pub async fn add_group_members(
        db: &DbConn,
        group_member_data_list: Vec<group_member::Model>,
    ) -> Result<Vec<group_member::Model>, DbErr> {
        let mut active_models = Vec::new();

        for group_member_data in group_member_data_list {
            let user = UserQuery::get_user_by_id(db, group_member_data.user_id).await?;
            if user.is_none() {
                return Err(DbErr::Custom("User was not found".to_owned()));
            }

            let group = GroupQuery::get_group_by_id(db, group_member_data.group_id).await?;
            if group.is_none() {
                return Err(DbErr::Custom("Group not found.".to_owned()));
            }

            let active_model = group_member::ActiveModel {
                user_id: Set(group_member_data.user_id.to_owned()),
                group_id: Set(group_member_data.group_id.to_owned()),
                role: Set(group_member_data.role.to_owned()),
                ..Default::default()
            };

            active_models.push(active_model);
        }

        let insert_result = GroupMember::insert_many(active_models).exec(db).await?;

        let inserted_records = GroupMember::find()
            .filter(group_member::Column::Id.gte(insert_result.last_insert_id)) // Assuming `Id` is an auto-incrementing primary key
            .all(db)
            .await?;

        Ok(inserted_records)
    }

    pub async fn update_group(
        db: &DbConn,
        id: i32,
        group_data: group::Model,
    ) -> Result<group::Model, DbErr> {
        let group: group::ActiveModel = Group::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::Custom("Cannot find group.".to_owned()))
            .map(Into::into)?;

        group::ActiveModel {
            id: group.id,
            name: Set(group_data.name.to_owned()),
            description: Set(group_data.description.to_owned()),
        }
        .update(db)
        .await
    }
}
