use std::env;

use dotenv::dotenv;
use sea_orm::{Database, DatabaseConnection};

use crate::routes::{file_routes::upload_file, test, user_routes::create_user};

#[tokio::main]
pub async fn start() -> Result<(), rocket::Error> {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE URL must be set");

    let database: DatabaseConnection = Database::connect(database_url)
        .await
        .expect("Failed to connect to database");

    rocket::build()
        .manage(database)
        .mount("/", routes![test, create_user, upload_file])
        .launch()
        .await
        .map(|_| ())
}
