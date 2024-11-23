import { ILogin } from "../interfaces/login-interface";
import { IRegister } from "../interfaces/register-interface";
import { IResponse } from "../interfaces/response-interface";
import Cookie from "js-cookie";
import { Service } from "./service";

export class UserService extends Service {
  constructor() {
    super();
  }

  async registerUser(register: IRegister): Promise<boolean> {
    console.log(register);
    const result = await this.post<IResponse<boolean>>("user", register);
    if (result == null) return false;
    else if (!result.success) console.error(result.message);

    return result.success;
  }

  async loginUser(login: ILogin): Promise<boolean> {
    const result = await this.post<IResponse<string>>("user-login", login);

    if (result == null) return false;

    if (result.success && result.data != "") {
      Cookie.set("user", result.data);
      return true;
    }

    return false;
  }

  async getUserInformation(id: string) {
    
  }

  async logOut() {
    try {
      Cookie.remove("user");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
