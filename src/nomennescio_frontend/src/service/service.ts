import axios from "axios";
export class Service {
  // ganti pake .env kalau mau lebih rapih
  backendUrl: string = "http://127.0.0.1:8000/";

  async post(url: string, data: any) {
    axios.post(`${this.backendUrl}`)
  }
}
