use std::env;

use dotenv::dotenv;
use rocket_cors::{AllowedOrigins, CorsOptions};
use sea_orm::{Database, DatabaseConnection};

use crate::routes::{file_routes::upload_file, test, user_routes::{create_user, handle_login}};

#[tokio::main]
pub async fn start() -> Result<(), rocket::Error> {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE URL must be set");

    let database: DatabaseConnection = Database::connect(database_url)
        .await
        .expect("Failed to connect to database");

    let cors = CorsOptions::default()
        .allowed_origins(AllowedOrigins::all())
        .to_cors()
        .expect("Failed to create cors config");

    rocket::build()
        .attach(cors)
        .manage(database)
        .mount("/", routes![test, create_user, upload_file, handle_login])
        .launch()
        .await
        .map(|_| ())
}
