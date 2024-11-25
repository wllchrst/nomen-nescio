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
        db: &DbConn,
        group_data: group::Model,
    ) -> Result<group::ActiveModel, DbErr> {
        group::ActiveModel {
            name: Set(group_data.name.to_owned()),
            description: Set(group_data.description.to_owned()),
            ..Default::default()
        }
        .save(db)
        .await
    }

    pub async fn add_group_members(
        db: &DbConn,
        group_member_data_list: Vec<group_member::Model>, // Accept a vector of group member data
    ) -> Result<InsertResult<group_member::ActiveModel>, DbErr> {
        let mut active_models = Vec::new();

        // Iterate over the vector of group_member::Model and process each item
        for group_member_data in group_member_data_list {
            let user: Option<user::Model> =
                UserQuery::get_user_by_id(db, group_member_data.user_id).await?;

            let group: Option<group::Model> =
                GroupQuery::get_group_by_id(db, group_member_data.group_id).await?;

            match user {
                Some(user) => {
                    println!("User found: {:?}", user);
                }
                None => {
                    println!("No user found.");
                    return Err(DbErr::Custom("User was not found".to_owned()));
                }
            }

            match group {
                Some(group) => {
                    println!("Group found: {:?}", group);
                }
                None => {
                    println!("No group found.");
                    return Err(DbErr::Custom("Group not found.".to_owned()));
                }
            }

            // Create ActiveModel for each group member data
            let active_model = group_member::ActiveModel {
                user_id: Set(group_member_data.user_id.to_owned()),
                group_id: Set(group_member_data.group_id.to_owned()),
                role: Set(group_member_data.role.to_owned()),
                ..Default::default()
            };

            // Add the active model to the list
            active_models.push(active_model);
        }

        let results = GroupMember::insert_many(active_models).exec(db).await?;

        Ok(results)
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
