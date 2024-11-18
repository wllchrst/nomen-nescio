use ::entity::{
    email, email::Entity as Email, email_file, email_file::Entity as EmailFile, receiver,
    receiver::Entity as Receiver,
};
use sea_orm::*;

struct EmailQuery {}

impl EmailQuery {
    async fn get_email_by_id(
        db: &DbConn,
        id: i32,
    ) -> Result<(email::Model, Vec<receiver::Model>, Vec<email_file::Model>), DbErr> {
        let email: Option<email::Model> = Email::find_by_id(id).one(db).await?;
        let email = email.unwrap();

        let receivers: Vec<receiver::Model> = email.find_related(Receiver).all(db).await?;
        let files: Vec<email_file::Model> = email.find_related(EmailFile).all(db).await?;

        return Ok((email, receivers, files));
    }
}
