export interface IRegister {
  email: string;
  name: string;
  password: string;
  signature_file_path: string;
  profile_picture_path: string | null;
  secret_key: string;
}
