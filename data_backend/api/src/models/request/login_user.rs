// export interface ILogin {
//   email: string;
//   password: string;
// }

use serde::Deserialize;

#[derive(FromForm, Deserialize)]
pub struct LoginUser {
    pub email: String,
    pub password: String,
}
