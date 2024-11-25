import { useEffect, useState } from "react";
import { IUser } from "../interfaces/user-interface";
import { UserService } from "../service/user-service";

const userService = new UserService();

export default function useGetUsersWithFilter() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");

  async function getUsers() {
    const result = await userService.getAllUser();
    if (result) setUsers(result.data);

    setIsLoading(false);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return { users, isLoading };
}
