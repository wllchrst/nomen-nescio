use ::entity::{user, user::ActiveModel as User};
use sea_orm::*;

pub struct UserMutation {}

impl UserMutation {
    async fn create_user(db: &DbConn, user_data: user::Model) -> Result<user::ActiveModel, DbErr> {
        user::ActiveModel {
            email: Set(user_data.email.to_owned()),
            name: Set(user_data.name.to_owned()),
            password: Set(user_data.password.to_owned()),
            ..Default::default()
        }
        .save(db)
        .await
    }

    async fn update_user_data(
        db: &DbConn,
        user_data: user::Model,
        id: i32,
    ) -> Result<user::ActiveModel, DbErr> {
        let user: user::ActiveModel = User::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::Custom("Cannot find group.".to_owned()))
            .map(Into::into)?;

        user::ActiveModel {
            id: user.id,
            email: Set(user_data.email.to_owned()),
            name: Set(user_data.email.to_owned()),
            password: Set(user_data.password.to_owned()),
            created_at: user.created_at,
        }
        .save(db)
        .await
    }
}
