export interface IGroupData {
  id: number;
  name: string;
  description: string;
  members: IGroupMember[];
}

export interface IGroupMember {
  id: number;
  group_id: number;
  user_id: number;
  role: string;
  email: string;
  name: string;
  password: string;
  signature_file_path: string;
  profile_picture_path: string | null;
  secret_key: string;
}
