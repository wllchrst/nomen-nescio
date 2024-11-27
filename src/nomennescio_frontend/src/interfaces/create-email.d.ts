export interface ICreateEmailData {
    title: String,
    description: String,
    sender_id: number,
    files: FileData[],
    receivers: number[],
}

export interface IFileData {
    file_name: string,
    file_path: string,
}
