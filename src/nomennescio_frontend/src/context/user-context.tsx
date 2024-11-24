import { createContext, useContext, useState } from "react";
import { IUserContext } from "../interfaces/user-context-interface";
import { IUser } from "../interfaces/user-interface";
import { IChildren } from "../interfaces/children-interface";

const userContext = createContext<IUserContext>({} as IUserContext);

export function useUserContext() {
  return useContext(userContext);
}

export function UserContextProvider({ children }: IChildren) {
  const [user, setUser] = useState<IUser | null>(null);

  function setUserData(userData: IUser | null) {
    setUser(userData);
  }

  const value: IUserContext = {
    user: user,
    setUserData: setUserData,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
