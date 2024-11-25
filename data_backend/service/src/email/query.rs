use ::entity::{
    email, email::Entity as Email, email_file, email_file::Entity as EmailFile, receiver,
    receiver::Entity as Receiver,
};
use sea_orm::*;

struct EmailQuery {}

impl EmailQuery {
    pub async fn get_email_by_id(
        db: &DbConn,
        id: i32,
    ) -> Result<(email::Model, Vec<receiver::Model>, Vec<email_file::Model>), DbErr> {
        let email: Option<email::Model> = Email::find_by_id(id).one(db).await?;
        let email = email.unwrap();

        let receivers: Vec<receiver::Model> = email.find_related(Receiver).all(db).await?;
        let files: Vec<email_file::Model> = email.find_related(EmailFile).all(db).await?;

        return Ok((email, receivers, files));
    }

    pub async fn get_user_email(db: &DbConn, user_id: i32) -> Result<Vec<email::Model>, DbErr> {
        // Join `receiver` with `email` to filter by user_id
        let emails = email::Entity::find()
            .join(
                JoinType::InnerJoin,
                receiver::Entity::belongs_to(email::Entity)
                    .from(receiver::Column::EmailId)
                    .to(email::Column::Id)
                    .into(),
            )
            .filter(receiver::Column::UserId.eq(user_id))
            .all(db)
            .await?;

        Ok(emails)
    }
}
