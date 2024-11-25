export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  signature_file_path: string;
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
