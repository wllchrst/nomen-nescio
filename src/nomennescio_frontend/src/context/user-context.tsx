import { createContext, useContext, useEffect, useState } from "react";
import { IUserContext } from "../interfaces/user-context-interface";
import { IUser } from "../interfaces/user-interface";
import { IChildren } from "../interfaces/children-interface";
import Cookie from "js-cookie";
import { redirect, useNavigate } from "react-router-dom";
import { UserService } from "../service/user-service";
import { DUMMY_PROFILE } from "../constants/image-constants";
import useProfileSource from "../hooks/use-get-profile-source";

const userContext = createContext<IUserContext>({} as IUserContext);

export function useUserContext() {
  return useContext(userContext);
}

const userService = new UserService();

export function UserContextProvider({ children }: IChildren) {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  function setUserData(userData: IUser | null) {
    setUser(userData);
  }

  const value: IUserContext = {
    user: user,
    setUserData: setUserData,
  };

  useEffect(() => {
    const wait = async () => {
      const userId = Cookie.get("user");

      if (!userId) {
        navigate("/");
        return;
      }

      const user = await userService.getUserInformation(userId);

      if (user == null) {
        setUserData(null);
        return;
      }

      if (user.data.profile_picture_path == null)
        user.data.profile_picture_path = DUMMY_PROFILE;
      else {
        user.data.profile_picture_path = useProfileSource(
          user.data.profile_picture_path
        );
      }

      setUserData(user!.data);
    };
    wait();
  }, []);

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
