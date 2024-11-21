import { Service } from "./service";

export class GeneralService extends Service {
  constructor() {
    super();
  }

  async uploadFile(file: File): Promise<string> {
    return "";
  }
}
