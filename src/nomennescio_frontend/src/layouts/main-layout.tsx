import { useEffect, useState } from "react";
import { IChildren } from "../interfaces/children-interface";
import { UserService } from "../service/user-service";
import { useNavigate } from "react-router-dom";
import { UserContextProvider, useUserContext } from "../context/user-context";

export default function MainLayout({ children }: IChildren) {
  const [userId, setUserId] = useState<string>("");
  const [tried, setTried] = useState(false);
  const { user, setUserData } = useUserContext();
  const userService = new UserService();
  const navigate = useNavigate();

  useEffect(() => {
    const id = userService.getUserIdFromCookie();
    setUserId(id);
    setTried(true);
  }, []);

  async function getUserInformation() {
    const result = await userService.getUserInformation(userId);
    if (result) setUserData(result.data);
    else navigate("/");
  }

  useEffect(() => {
    if (tried && userId === "") {
      navigate("/");
    } else if (tried && userId) {
      getUserInformation();
    }
  }, [tried, userId]);

  return <UserContextProvider>{children}</UserContextProvider>;
}
