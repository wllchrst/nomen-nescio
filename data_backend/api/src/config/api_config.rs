use std::env;

use dotenv::dotenv;
use rocket_cors::{AllowedOrigins, CorsOptions};
use sea_orm::{Database, DatabaseConnection};

use crate::routes::{
    file_routes::upload_file,
    group_routes::{add_group_member, create_group, get_group_by_id, get_user_group},
    test,
    user_routes::{create_user, get_all_user, get_user_information, handle_login},
};

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
        .mount(
            "/",
            routes![
                test,
                create_user,
                upload_file,
                handle_login,
                get_user_information,
                get_all_user,
                create_group,
                add_group_member,
                get_group_by_id,
                get_user_group
            ],
        )
        .launch()
        .await
        .map(|_| ())
}
