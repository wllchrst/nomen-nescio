import { ILogin } from "../interfaces/login-interface";
import { IRegister } from "../interfaces/register-interface";
import { IResponse } from "../interfaces/response-interface";
import Cookie from "js-cookie";
import { Service } from "./service";
import { IUser } from "../interfaces/user-interface";

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

  async loginUser(login: ILogin): Promise<IUser> {
    const result = await this.post<IResponse<IUser>>("user-login", login);

    if (result == null) {
      throw new Error("Fail")
    }

    if (result.success && result.data.email != "") {
      Cookie.set("user", result.data);
      return result.data;
    }

    throw new Error("Fail")
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
