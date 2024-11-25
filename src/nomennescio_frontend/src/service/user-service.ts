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
    const result = await this.get<IResponse<IUser>>(`/user/${id}`);

    return result;
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

  getUserIdFromCookie(): string {
    try {
      const id = Cookie.get("user");
      if (id == undefined) return "";
      return id;
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  async getAllUser(): Promise<IUser[]> {
    try {
      const result = await this.get<IResponse<IUser[]>>("user");
      if (result && result.success) {
        return result.data;
      } else {
        console.error("Failed to fetch users");
        return [];
      }
    } catch (error) {
      console.error("Error fetching users: " + error);
      return [];
    }
  }

  async getCurrentUser(): Promise<IUser | null> {
    const userId = this.getUserIdFromCookie();
    if (!userId) return null;

    const result = await this.get<IResponse<IUser>>(`/user/${userId}`);
    if (result && result.success) {
      return result.data;
    } else {
      console.error("gk dapet current user");
      return null;
    }
  }
}
