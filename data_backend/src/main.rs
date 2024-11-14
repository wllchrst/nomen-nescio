mod facade;
mod repositories;

use dotenv::dotenv;
use entity::user::{self, ActiveModel};
use sea_orm::{sqlx::types::chrono::Utc, Database, DatabaseConnection, Set};
use tokio;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let db: DatabaseConnection = Database::connect()
    let user_model: ActiveModel = user::ActiveModel {
        name: Set("William Christian".to_owned()),
        email: Set("williamqwerty3@gmail.com".to_owned()),
        password: Set("password".to_owned()),
        created_at: Set(Utc::now().naive_utc().to_owned()),
        ..Default::default()
    };


}
