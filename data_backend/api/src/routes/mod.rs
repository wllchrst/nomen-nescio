pub mod email_routes;
pub mod file_routes;
pub mod group_routes;
pub mod user_routes;

#[get("/")]
pub async fn test() -> &'static str {
    return "HELLO, THE APPLICATION IS RUNNING";
}
