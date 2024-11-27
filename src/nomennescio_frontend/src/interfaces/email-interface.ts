export interface IEmail {
    id: number;
    sender: string;
    title: string;
    description: string;
    content: string;
    file_url: string[];
}

export interface IEmailFile {
    email_id: number,
    file_name: string,
    file_path: string,
    id: number
}