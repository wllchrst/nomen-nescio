import axios from "axios";

export async function uploadFileFromUser(user_id: string, file: File) : Promise<string> {
    const formData = new FormData()

    formData.append("file", file)
    formData.append("file_name", file.name)

    try {
        const url = `http://127.0.0.1:8000/upload`;

        const response = await axios.post<string>(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "User-Id": user_id,
          },
        });
        return response.data;
      } catch (error) {
        console.error("gabisa euy error", error);
        return "";
      }
}

export async function getFile(user_id: string, file_path: string, secret_key: string) {
  try {
    const url = `http://127.0.0.1:8000/get-file`;

    const response = await axios.post<string>(url, {
      file_path: file_path,
      secret_key: secret_key
    },{
      headers: {
        "Content-Type": "application/json",
        "User-Id": user_id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return "";
  }
}

export function getFileUrl(path: string) : string {
  return `http://localhost:8000/files/${path}`
}