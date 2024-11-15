mod facade;
mod repositories;

use dotenv::dotenv;
use entity::user::{self, ActiveModel};
use sea_orm::{sqlx::types::chrono::Utc, Database, DatabaseConnection, Set};
use tokio;

#[tokio::main]
async fn main() {
    dotenv().ok();
}
