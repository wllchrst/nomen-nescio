import { useState, useEffect } from "react";
import { IUser } from "../interfaces/user-interface";
import { UserService } from "../service/user-service";

const useGetCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const userService = new UserService();
            const user = await userService.getCurrentUser();
            setCurrentUser(user);
            console.log("Current User:", user);
        };
        fetchCurrentUser();
    }, []);

    return currentUser;
};

export default useGetCurrentUser;
