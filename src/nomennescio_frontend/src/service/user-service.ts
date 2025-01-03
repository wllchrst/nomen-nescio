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

  async loginUser(login: ILogin): Promise<{ success: boolean; data: IUser | null }> {
    const result = await this.post<IResponse<IUser>>("user-login", login);

    if (result == null) {
      return { success: false, data: null };
    }

    console.log(result);

    if (result.success && result.data.email != "") {
      Cookie.set("user", result.data.id.toString());
      console.log("INI RESULT DATA", result.data);
      return { success: true, data: result.data };
    }

    return { success: false, data: null };
  }

  async updateUser(register: IRegister, userId: number) {
    const result = await this.put(`user/${userId}`, register);
    return result;
  }

  async getUserInformation(id: string) {
    const result = await this.get<IResponse<IUser>>(`/user/${id}`);

    return result;
  }

  async logOut(): Promise<boolean> {
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
      const currentUser = await this.getCurrentUser();
      const result = await this.get<IResponse<IUser[]>>("user");
      // disini aku ganti getAllUser kecuali current user
      if (result && result.success) {
        return result.data.filter((user) => user.id !== currentUser?.id);
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
      result.data.profile_picture_path = `${this.backendUrl}${result.data.profile_picture_path}`;
      return result.data;
    } else {
      console.error("gk dapet current user");
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!Cookie.get("user");
  }
}
