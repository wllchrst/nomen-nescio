import { useState, useEffect, useRef } from 'react';
import { IUser } from '../interfaces/user-interface';
import { UserService } from '../service/user-service';

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

const useSearchDropdown = (data: SearchItem[], searchForUser: boolean, onUserClick?: (user: IUser) => void) => {
    const [query, setQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState<SearchItem[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchForUser) {
            const fetchUsers = async () => {
                const userService = new UserService();
                const users = await userService.getAllUser();
                setFilteredUsers(users);
                setAllUsers(users);
            };
            fetchUsers();
        }
    }, [searchForUser]);

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
                setFilteredUsers(allUsers);
            } else {
                const userResults = allUsers.filter(
                    (user) =>
                        user.name.toLowerCase().includes(value.toLowerCase()) ||
                        user.email.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredUsers(userResults);
            }
        }
    };

    const handleInputClick = () => {
        if (query === '') {
            setFilteredUsers(allUsers);
        }
    };

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

    const handleUserClick = (user: IUser) => {
        if (onUserClick) {
            onUserClick(user);
        }
        setQuery('');
    };

    return {
        query,
        filteredResults,
        filteredUsers,
        searchInputRef,
        handleSearch,
        handleUserClick,
        handleInputClick,
    };
};

export default useSearchDropdown;