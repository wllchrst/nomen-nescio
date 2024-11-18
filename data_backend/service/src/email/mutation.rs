use ::entity::{
    email, email::Entity as Email, email_file, email_file::Entity as EmailFile, receiver,
    receiver::Entity as Receiver,
};
use sea_orm::*;

struct EmailMutation {}

impl EmailMutation {
    async fn create_email(
        db: &DbConn,
        email_data: email::Model,
        receiver_data: receiver::Model,
        file_data: email_file::Model,
    ) -> Result<(), DbErr> {
        let transaction = db.begin().await?;

        email::ActiveModel {
            description: Set(email_data.description.to_owned()),
            title: Set(email_data.title.to_owned()),
            ..Default::default()
        }
        .save(&transaction)
        .await?;

        receiver::ActiveModel {
            user_id: Set(receiver_data.user_id.to_owned()),
            email_id: Set(receiver_data.email_id.to_owned()),
            ..Default::default()
        }
        .save(&transaction)
        .await?;

        email_file::ActiveModel {
            file_name: Set(file_data.file_name.to_owned()),
            file_path: Set(file_data.file_path.to_owned()),
            email_id: Set(file_data.email_id.to_owned()),
            ..Default::default()
        }
        .save(&transaction)
        .await?;

        transaction.commit().await?;

        Ok(())
    }
}
