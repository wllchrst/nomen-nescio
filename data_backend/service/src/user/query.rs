use ::entity::{user, user::Entity as User};
use sea_orm::*;

pub struct UserQuery;

impl UserQuery {
    pub async fn get_user_by_id(db: &DbConn, id: i32) -> Result<Option<user::Model>, DbErr> {
        let user = User::find_by_id(id).one(db).await?;
        return Ok(user);
    }

    pub async fn get_user_by_email(
        db: &DbConn,
        email: String,
    ) -> Result<Option<user::Model>, DbErr> {
        User::find()
            .filter(user::Column::Email.contains(email))
            .one(db)
            .await
    }

    pub async fn get_all_user(db: &DbConn) -> Result<Vec<user::Model>, DbErr> {
        User::find().all(db).await
    }
}
