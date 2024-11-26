import axios from "axios";

export async function uploadFileFromUser(user_id: string, file: File) : Promise<String> {
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
        console.error(error);
        return "";
      }
}