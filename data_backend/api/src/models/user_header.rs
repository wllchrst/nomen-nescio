use rocket::http::Status;
use rocket::request::{FromRequest, Outcome, Request};

pub struct UserId(pub String);


#[rocket::async_trait]
impl<'r> FromRequest<'r> for UserId {
    type Error = ();

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        if let Some(user_id) = request.headers().get_one("User-Id") {
            Outcome::Success(UserId(user_id.to_string()))
        } else {
            Outcome::Error((Status::BadRequest, ()))
        }
    }
}