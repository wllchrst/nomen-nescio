use ::entity::{
    group::{self, Entity as Group},
    group_member,
    group_member::Entity as GroupMember,
    user::{self, Entity as User},
};
use sea_orm::*;
use serde::Serialize;

pub struct GroupQuery {}

#[derive(Serialize)]
pub struct IGroup {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub members: Vec<IGroupMember>,
}

#[derive(Serialize)]
pub struct IGroupMember {
    pub id: i32,
    pub group_id: i32,
    pub user_id: i32,
    pub role: String,
    pub email: String,
    pub name: String,
    pub password: String,
    pub signature_file_path: String,
    pub profile_picture_path: Option<String>,
    pub secret_key: String,
}

impl GroupQuery {
    pub async fn get_group_by_id(db: &DbConn, id: i32) -> Result<Option<group::Model>, DbErr> {
        Group::find_by_id(id).one(db).await
    }

    pub async fn get_all_group(db: &DbConn) -> Result<Vec<group::Model>, DbErr> {
        Group::find().all(db).await
    }


    pub async fn get_user_groups_with_members(
    db: &DbConn,
    user_id: i32,
) -> Result<Vec<IGroup>, DbErr> {
    // Find all groups the user belongs to
    let groups: Vec<(group_member::Model, Option<group::Model>)> = GroupMember::find()
        .filter(group_member::Column::UserId.eq(user_id))
        .find_also_related(Group)
        .all(db)
        .await?;
    
    let mut result = Vec::new();

    for (_, group) in groups {
        if let Some(group) = group {
            // Fetch all members of the group
            let members: Vec<(group_member::Model, Option<user::Model>)> = GroupMember::find()
                .filter(group_member::Column::GroupId.eq(group.id))
                .find_also_related(User)
                .all(db)
                .await?;

            // Map the group and members into IGroup and IGroupMember
            result.push(IGroup {
                id: group.id,
                name: group.name,
                description: group.description,
                members: members
                    .into_iter()
                    .filter_map(|(member, user)| {
                        user.map(|user| IGroupMember {
                            id: member.id,
                            group_id: member.group_id,
                            user_id: member.user_id,
                            role: member.role,
                            email: user.email,
                            name: user.name,
                            password: user.password,
                            signature_file_path: user.signature_file_path,
                            profile_picture_path: user.profile_picture_path,
                            secret_key: user.secret_key,
                        })
                    })
                    .collect(),
            });
        }
    }

    Ok(result)
}

}
