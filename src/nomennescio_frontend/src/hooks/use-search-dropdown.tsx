import { useState, useEffect, useRef } from 'react';
import { IUser } from '../interfaces/user-interface';
import { UserService } from '../service/user-service';
import { GroupService } from '../service/group-service';

interface SearchItem {
    id: number;
    image?: string;
    name?: string;
    email?: string;
    icon?: React.ReactNode;
    title?: string;
    link: string;
    variant?: string;
}

const useSearchDropdown = (data: SearchItem[], searchForUser: boolean, searchForGroup: boolean, onUserClick?: (user: IUser) => void, onGroupClick?: (group: IGroupData) => void) => {
    const [query, setQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState<SearchItem[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [chosenUsers, setChosenUsers] = useState<IUser[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<IGroupData[]>([]);
    const [allGroups, setAllGroups] = useState<IGroupData[]>([]);
    const [chosenGroups, setChosenGroups] = useState<IGroupData[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Fetch all users and groups if searchForUser or searchForGroup is true
    useEffect(() => {
        const fetchUsersAndGroups = async () => {
            if (searchForUser) {
                const userService = new UserService();
                const users = await userService.getAllUser();
                setFilteredUsers(users);
                setAllUsers(users);
            }
            if (searchForGroup) {
                const groupService = new GroupService();
                const userService = new UserService();
                const userId = userService.getUserIdFromCookie();
                const groups = await groupService.getUserGroup(userId);
                setFilteredGroups(groups.data);
                setAllGroups(groups.data);
            }
        };
        fetchUsersAndGroups();
    }, [searchForUser, searchForGroup]);

    // Handle search input changes
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        const results = data.filter(
            (item) =>
                (item.name && item.name.toLowerCase().includes(value.toLowerCase())) ||
                (item.email && item.email.toLowerCase().includes(value.toLowerCase())) ||
                (item.title && item.title.toLowerCase().includes(value.toLowerCase()))
        );
        setFilteredResults(results);

        if (searchForUser) {
            if (value === '') {
                setFilteredUsers(allUsers.filter(user => !chosenUsers.includes(user)));
            } else {
                const userResults = allUsers.filter(
                    (user) =>
                        user.name.toLowerCase().includes(value.toLowerCase()) ||
                        user.email.toLowerCase().includes(value.toLowerCase())
                ).filter(user => !chosenUsers.includes(user));
                setFilteredUsers(userResults);
            }
        }

        if (searchForGroup) {
            if (value === '') {
                setFilteredGroups(allGroups.filter(group => !chosenGroups.includes(group)));
            } else {
                const groupResults = allGroups.filter(
                    (group) =>
                        group.name.toLowerCase().includes(value.toLowerCase()) ||
                        group.description.toLowerCase().includes(value.toLowerCase())
                ).filter(group => !chosenGroups.includes(group));
                setFilteredGroups(groupResults);
            }
        }
    };

    // Handle input click to show all users if query is empty
    const handleInputClick = () => {
        if (query === '') {
            setFilteredUsers(allUsers.filter(user => !chosenUsers.includes(user)));
            setFilteredGroups(allGroups.filter(group => !chosenGroups.includes(group)));
        }
    };

    // Handle keyboard shortcut for focusing the search input
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Handle user click to add to chosen users and reset query
    const handleUserClick = (user: IUser) => {
        if (onUserClick) {
            onUserClick(user);
        }
        setChosenUsers([...chosenUsers, user]);
        setQuery('');
    };

    // Remove user from chosen users
    const handleRemoveUser = (user: IUser) => {
        setChosenUsers(chosenUsers.filter(u => u.id !== user.id));
    };

    const handleGroupClick = (group: IGroupData) => {
        if (onGroupClick) {
            onGroupClick(group);
        }
        setChosenGroups([...chosenGroups, group]);
        setQuery('');
    };

    const handleRemoveGroup = (group: IGroupData) => {
        setChosenGroups(chosenGroups.filter(g => g.id !== group.id));
    };

    return {
        query,
        filteredResults,
        filteredUsers,
        chosenUsers,
        searchInputRef,
        handleSearch,
        handleUserClick,
        handleInputClick,
        handleRemoveUser,
        filteredGroups,
        handleGroupClick,
        chosenGroups,
        handleRemoveGroup,
    };
};

export default useSearchDropdown;