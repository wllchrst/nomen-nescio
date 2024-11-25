import { Service } from "./service";

export class GeneralService extends Service {
  constructor() {
    super();
  }

  async uploadFile(file: File, url: string): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const path = await this.uploadFileToBackend(formData, url);

    return path;
  }
}
