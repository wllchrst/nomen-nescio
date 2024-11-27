import axios, { AxiosRequestConfig } from "axios";
export class Service {
  // ganti pake .env kalau mau lebih rapih
  backendUrl: string = "http://127.0.0.1:8000/";

  async post<T>(url: string, data: any) {
    try {
      const response = await axios.post<T>(`${this.backendUrl}${url}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async put<T>(url: string, data: any) {
    try {
      const response = await axios.put<T>(`${this.backendUrl}${url}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async get<T>(url: string, data: any = null) {
    try {
      const response = await axios.get<T>(`${this.backendUrl}${url}`, data);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async uploadFileToBackend(formData: FormData, _url: string): Promise<string> {
    try {
      const url = `${this.backendUrl}${_url}`;
      console.log(`URL: ${url}`);
      const response = await axios.post<string>(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return "";
    }
  }
}
