use ::entity::{
    email, email::Entity as Email, email_file, email_file::Entity as EmailFile, receiver,
    receiver::Entity as Receiver,
};
use sea_orm::*;

pub struct EmailQuery {}

impl EmailQuery {
    pub async fn get_email_by_id(
        db: &DbConn,
        id: i32,
    ) -> Result<Option<(email::Model, Vec<receiver::Model>, Vec<email_file::Model>)>, DbErr> {
        // Fetch the email
        let email: Option<email::Model> = Email::find_by_id(id).one(db).await?;

        // If no email is found, return Ok(None)
        if let Some(email_data) = email {
            // Fetch related receivers
            let receivers: Vec<receiver::Model> = email_data.find_related(Receiver).all(db).await?;

            // Fetch related files
            let files: Vec<email_file::Model> = email_data.find_related(EmailFile).all(db).await?;

            Ok(Some((email_data, receivers, files)))
        } else {
            Ok(None) // Email not found
        }
    }

    pub async fn get_user_email(db: &DbConn, user_id: i32) -> Result<Vec<email::Model>, DbErr> {
            // Write the raw SQL query
        let sql = "SELECT email.* FROM email INNER JOIN receiver ON receiver.email_id = email.id WHERE receiver.user_id = $1";

        let emails: Vec<email::Model> = db
            .query_all(Statement::from_sql_and_values(
                sea_orm::DatabaseBackend::Postgres, 
                sql,
                vec![user_id.into()],
            ))
            .await?
            .into_iter()
            .map(|result| email::Model::from_query_result(&result, "").unwrap())
            .collect();

        Ok(emails)
    }
}
