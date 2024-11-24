import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import TypingEffect from 'react-typing-effect';

const words = ["Search Users", "Find Friends", "Discover People"];

interface UserItem {
    id: number;
    image?: string;
    name?: string;
    email?: string;
    link: string;
}

interface SearchProps {
    data: UserItem[];
    onUserSelect?: (user: UserItem) => void;
}

const Search: React.FC<SearchProps> = ({ data, onUserSelect }) => {
    const [query, setQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState<UserItem[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        const results = data.filter(
            (item) =>
                (item.name && item.name.toLowerCase().includes(value.toLowerCase())) ||
                (item.email && item.email.toLowerCase().includes(value.toLowerCase()))
        );
        setFilteredResults(results);
    };

    const handleUserClick = (user: UserItem) => {
        if (onUserSelect) {
            onUserSelect(user);
        }
        setQuery(''); // Clear the search input
        setFilteredResults([]); // Clear the search results
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

    return (
        <div className="relative flex justify-items-center z-50">
            <input
                type="text"
                ref={searchInputRef}
                value={query}
                onChange={handleSearch}
                placeholder={"Search Users.... "}
                className="w-96 p-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AnimatePresence>
                {query && (
                    <motion.div
                        className="absolute top-12 left-0 bg-[#161b22] border border-gray-700 rounded-md shadow-lg w-full z-50 max-h-60 overflow-y-auto"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {filteredResults.length > 0 ? (
                            filteredResults.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => handleUserClick(user)}
                                    className="flex w-full items-center p-3 hover:bg-[#0d1117] transition-all duration-200 cursor-pointer"
                                >
                                    {user.image && (
                                        <img
                                            src={user.image}
                                            alt={user.name || ''}
                                            className="w-12 h-12 rounded-full mr-2 flex-shrink-0"
                                        />
                                    )}
                                    <div className="text-left flex-grow">
                                        <p className="font-medium text-white">{user.name}</p>
                                        <p className="text-sm text-gray-400">{user.email}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="p-3 text-gray-500">No results found</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Search;
