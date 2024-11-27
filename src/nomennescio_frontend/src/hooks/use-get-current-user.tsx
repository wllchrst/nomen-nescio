import { useState, useEffect } from "react";
import { IUser } from "../interfaces/user-interface";
import { UserService } from "../service/user-service";
import useProfileSource from "./use-get-profile-source";



const useGetCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [profilePic, setProfilePic] = useState<string>(''); 

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const userService = new UserService();
            const user = await userService.getCurrentUser();

            if (!user?.profile_picture_path || user.profile_picture_path.trim() === '') {
                user.profile_picture_path = 'dummy_profile.png';
            }

            const processedProfilePic = useProfileSource(user.profile_picture_path);
            setProfilePic(processedProfilePic);

            setCurrentUser({
                ...user,
                profile_picture_path: processedProfilePic,
            });
        };

        fetchCurrentUser();
    }, []);

    return currentUser;
};

export default useGetCurrentUser;
