import { Service } from "./service";

export class GeneralService extends Service {
  constructor() {
    super();
  }

  async uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const path = await this.uploadFileToBackend(formData);

    return path;
  }
}
