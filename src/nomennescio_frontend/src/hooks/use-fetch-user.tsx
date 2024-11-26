import { useState, useEffect} from "react";
import { IUser } from "../interfaces/user-interface";
import { UserService } from "../service/user-service";

const useFetchUsers = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const userService = new UserService();
            const data = await userService.getAllUser();
            setUsers(data);
        };
        fetchData();
    }, []);

    return users;
};

export default useFetchUsers;