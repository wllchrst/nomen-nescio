import { IUser } from "./user-interface";

export interface IUserContext {
  user: IUser | null;
  setUserData: (userData: IUser | null) => void;
}
