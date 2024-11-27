import { ICreateEmailData } from "../interfaces/create-email";
import { IEmail } from "../interfaces/email-interface";
import { IPredictImage } from "../interfaces/predict-image";
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

  async getUserEmail(id: string): Promise<IEmail[]> {
    const result = await this.get<IResponse<IEmail[]>>(`/user/email/${id}`);

    if (!result) throw Error("Failed to fetch emails");
    // console.log("hasil result data", result.data);
    return result.data;
  }

  async getEmailDetail(email_id: string): Promise<object[]> {
    const result = await this.get<IResponse<object[]>>(`/email/${email_id}`);

    if (!result) throw Error("Failed to fetch email");

    // console.log("hasil result data email detail", result.data);
    return result.data;
  }

  async compareSignature(predictData: IPredictImage) {
    const result = await this.post("/predict", predictData);
    return result;
  }
}
