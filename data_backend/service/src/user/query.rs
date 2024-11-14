use ::entity::{user, user::Entity as User};
use sea_orm::*;

struct UserQuery {}

impl UserQuery {
    async fn get_user_by_id(db: &DbConn, id: i32) -> Result<Option<user::Model>, DbErr> {
        let user = User::find_by_id(id).one(db).await?;
        return Ok(user);
    }
}
