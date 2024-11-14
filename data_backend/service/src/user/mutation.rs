use entity::user::{self, ActiveModel, Entity as User};
use sea_orm::{sqlx::types::chrono::Utc, DbConn, DbErr, EntityTrait, InsertResult, Set};

struct UserMutation {}

impl UserMutation {
    async fn create_user(
        db: &DbConn,
        user_data: user::Model,
    ) -> Result<InsertResult<ActiveModel>, DbErr> {
        let active_model = user::ActiveModel {
            name: Set(user_data.name.to_owned()),
            email: Set(user_data.email.to_owned()),
            password: Set(user_data.password.to_owned()),
            created_at: Set(Utc::now().naive_utc()),
            ..Default::default()
        };

        let res = user::Entity::insert(active_model).exec(db).await;
        return res;
    }

    async fn update_user_data(
        db: &DbConn,
        user_data: user::Model,
        id: i32,
    ) -> Result<user::Model, DbErr> {
        let user: Option<user::Model> = User::find_by_id(id).one(db).await?;
        let mut user: user::ActiveModel = user.unwrap().into();

        user.email = Set(user_data.email.to_owned());
        user.name = Set(user_data.name.to_owned());
        user.password = Set(user_data.password.to_owned());

        let res = user::Entity::update(user).exec(db).await;
        return res;
    }
}
