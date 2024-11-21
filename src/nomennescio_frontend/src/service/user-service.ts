import { Service } from "./service";

export class UserService extends Service {
  constructor() {
    super();
  }

  async registerUser(): Promise<boolean> {
    return true;
  }
}
