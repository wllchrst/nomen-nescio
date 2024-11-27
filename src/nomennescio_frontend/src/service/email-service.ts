import { ICreateEmailData } from "../interfaces/create-email";
import { IResponse } from "../interfaces/response-interface";
import { Service } from "./service";

export class EmailService extends Service {
  constructor() {
    super();
  }

  async createEmail(createEmail: ICreateEmailData) {
    const response = await this.post<IResponse<{}>>("email", createEmail);
    return response;
  }
}
