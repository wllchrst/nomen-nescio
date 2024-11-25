use crate::models::request::{add_group_member::AddGroupMemberData, create_group::CreateGroupData};
use crate::models::response::response::Response;
use entity::{group, group_member};
use rocket::serde::json::Json;
use rocket::State;
use sea_orm::DatabaseConnection;
use serde_json::{json, Value};
use service::group::{GroupMutation, GroupQuery};

#[post("/group", data = "<input>")]
pub async fn create_group(
    database: &State<DatabaseConnection>,
    input: Json<CreateGroupData>,
) -> Json<Value> {
    let group_data = input.into_inner();

    let group = group::Model {
        id: 0,
        name: group_data.name,
        description: group_data.description,
    };

    let result = GroupMutation::create_group(database, group).await;

    let response = match result {
        Ok(active_model) => Response {
            success: true,
            message: "Success creating group".to_string(),
            data: Some(true),
        },
        Err(error) => Response {
            success: false,
            message: format!("Something went wrong creating the user {}", error),
            data: Some(false),
        },
    };

    Json(json!(response))
}

#[post("/group-member", data = "<input>")]
pub async fn add_group_member(
    database: &State<DatabaseConnection>,
    input: Json<AddGroupMemberData>,
) -> Json<Value> {
    let data = input.into_inner();

    let mut group_members = Vec::new();

    for member in data.members {
        let gm = group_member::Model {
            group_id: data.group_id,
            user_id: member.user_id,
            role: member.role,
            id: 0,
        };

        group_members.push(gm);
    }

    let result = GroupMutation::add_group_members(database, group_members).await;

    let response = match result {
        Ok(active_model) => Response {
            success: true,
            message: "Success adding group member".to_string(),
            data: Some(true),
        },
        Err(error) => Response {
            success: false,
            message: format!("Something went wrong creating the group {}", error),
            data: Some(false),
        },
    };

    Json(json!(response))
}

#[get("/group/<id>")]
pub async fn get_group_by_id(database: &State<DatabaseConnection>, id: String) -> Json<Value> {
    let group_id: i32 = match id.parse::<i32>() {
        Ok(parsed_id) => parsed_id,
        Err(_) => {
            return Json(json!(Response::<Option<group::Model>> {
                data: None,
                message: "Invalid user ID".to_string(),
                success: false,
            }));
        }
    };

    let result: Result<Option<group::Model>, sea_orm::DbErr> =
        GroupQuery::get_group_by_id(database, group_id).await;

    let response = match result {
        Ok(Some(group)) => Response {
            data: Some(group),
            message: "User Information".to_string(),
            success: true,
        },
        Ok(None) => Response {
            data: None,
            message: "Group not found".to_string(),
            success: false,
        },
        Err(e) => Response {
            data: None,
            message: format!("Something went wrong: {}", e),
            success: false,
        },
    };

    Json(json!(response))
}

#[get("/user/group/<id>")]
pub async fn get_user_group(database: &State<DatabaseConnection>, id: String) -> Json<Value> {
    let user_id: i32 = match id.parse::<i32>() {
        Ok(parsed_id) => parsed_id,
        Err(_) => {
            return Json(json!(Response::<Option<group::Model>> {
                data: None,
                message: "Invalid user ID".to_string(),
                success: false,
            }));
        }
    };

    let result: Result<Vec<(group_member::Model, Option<group::Model>)>, sea_orm::DbErr> =
        GroupQuery::get_user_groups(database, user_id).await;

    let response = match result {
        Ok(users) if !users.is_empty() => Response {
            data: Some(users),
            message: "All user info".to_string(),
            success: true,
        },
        Ok(_) => Response {
            data: None,
            message: "There is no user".to_string(),
            success: false,
        },
        Err(e) => Response {
            data: None,
            message: format!("Something went wrong: {}", e),
            success: false,
        },
    };

    Json(json!(response))
}