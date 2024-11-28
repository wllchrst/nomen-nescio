import { ICreateEmailData, IFileData } from "../interfaces/create-email";
import { IEmail } from "../interfaces/email-interface";
import { IPredictImage } from "../interfaces/predict-image";
import { IResponse } from "../interfaces/response-interface";
import { IUser } from "../interfaces/user-interface";
import { uploadFileFromUser } from "./file-service";
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

  async compareSignature(user: IUser, file: File) {
    const date = new Date();
    const filePath = await uploadFileFromUser(date.toString(), file);
    const predictData: IPredictImage = {
      first_image_path: `./${filePath}`,
      second_image_path: `./${user.signature_file_path}`,
    };
    console.log(predictData);

    const result = await this.post<IResponse<boolean>>("/predict", predictData);
    console.log(result);
    return result;
  }
}
