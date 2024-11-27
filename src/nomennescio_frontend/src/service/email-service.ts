import { ICreateEmailData } from "../interfaces/create-email";
import { IEmail } from "../interfaces/email-interface";
import { IResponse } from "../interfaces/response-interface";
import { Service } from "./service";

export class EmailService extends Service {
    constructor() {
        super();
    }

    async createEmail(createEmailData: ICreateEmailData) {
        const result = await this.post("/email", createEmailData);
        return result;
    }

    async getUserEmail(id: string): Promise<IEmail[]> {
        const result = await this.get<IResponse<IEmail[]>>(`/user/email/${id}`)

        if(!result) throw Error("Failed to fetch emails")

        return result.data
    }

    async getEmailDetail(email_id: string): Promise<object[]> {
        const result = await this.get<IResponse<object[]>>(`/email/${email_id}`)

        if(!result) throw Error("Failed to fetch email");
        return result.data
    }
}