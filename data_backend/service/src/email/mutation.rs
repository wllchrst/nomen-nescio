use ::entity::{email, email_file, receiver};
use sea_orm::*;

pub struct EmailMutation {}

impl EmailMutation {
    pub async fn create_email(
        db: &DbConn,
        email_data: email::Model,
        receivers: Vec<receiver::Model>,
        file_data: Vec<email_file::Model>,
    ) -> Result<(), DbErr> {
        // Start a transaction
        let transaction = db.begin().await?;

        // Save the email data
        let saved_email = email::ActiveModel {
            description: Set(email_data.description.to_owned()),
            title: Set(email_data.title.to_owned()),
            sender_id: Set(email_data.sender_id.to_owned()),
            ..Default::default()
        }
        .save(&transaction)
        .await?;

        // Extract the email ID from the saved email
        let email_id = saved_email.id.unwrap(); // Ensure `id` is populated (use `unwrap` safely)

        // Prepare and save the receiver data
        for r in receivers {
            let r_active_model = receiver::ActiveModel {
                user_id: Set(r.user_id.to_owned()),
                email_id: Set(email_id), // Use `email_id` from saved email
                ..Default::default()
            };
            r_active_model.save(&transaction).await?;
        }

        // Prepare and save the file data
        for f in file_data {
            let f_active_model = email_file::ActiveModel {
                file_path: Set(f.file_path.to_owned()),
                file_name: Set(f.file_name.to_owned()),
                email_id: Set(email_id), // Use `email_id` from saved email
                ..Default::default()
            };
            f_active_model.save(&transaction).await?;
        }

        // Commit the transaction
        transaction.commit().await?;

        Ok(())
    }
}
