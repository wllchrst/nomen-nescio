export interface ICreateEmailData {
  title: String;
  description: String;
  sender_id: number;
  files: IFileData[];
  receivers: number[];
}

export interface IFileData {
  file_name: string;
  file_path: string;
}
