export interface IUser {
  email: string;
  name: string;
  password: string;
  signature_file_path: string;
  profile_picture_path: string | null;
  secret_key: string;
}
// pub struct Model {
//     #[sea_orm(primary_key)]
//     pub id: i32,
//     pub name: String,
//     #[sea_orm(unique)]
//     pub email: String,
//     pub password: String,
//     pub created_at: DateTime,
//     pub signature_file_path: String,
// }
