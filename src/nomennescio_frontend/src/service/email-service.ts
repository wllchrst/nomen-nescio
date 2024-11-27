import { ICreateEmailData } from "../interfaces/create-email";
import { Service } from "./service";

export class EmailService extends Service {
    constructor() {
        super();
    }

    async createEmail(createEmailData: ICreateEmailData) {
        const result = await this.post("/email", createEmailData);
        return result;
    }
}