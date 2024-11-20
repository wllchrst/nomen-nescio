import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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

interface SearchDropdownProps {
    data: SearchItem[];
    onItemClick?: (item: SearchItem) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ data, onItemClick }) => {
    const [query, setQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState<SearchItem[]>([]); 
    const searchInputRef = useRef<HTMLInputElement>(null);

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
    };

    const handleItemClick = (item: SearchItem) => {
        if (onItemClick) {
            onItemClick(item);
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

    return (
        <div className="relative w-80 m-2 flex justify-items-center z-50">
            <input
                type="text"
                ref={searchInputRef}
                value={query}
                onChange={handleSearch}
                placeholder="(ctrl + k) to search..."
                className="w-full p-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            filteredResults.map((item) => (
                                <Link
                                    to={item.link}
                                    key={item.id}
                                    onClick={() => handleItemClick(item)}
                                >
                                    <div className="flex w-full items-center p-3 hover:bg-[#0d1117] transition-all duration-200 cursor-pointer">
                                        {item.icon && (
                                            <div className="flex w-8 h-8 invert items-center justify-center mr-2">
                                                {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                                            </div>
                                        )}
                                        {item.image && !item.icon && (
                                            <img
                                                src={item.image}
                                                alt={item.name || ''}
                                                className="w-12 h-12 rounded-full mr-2 flex-shrink-0"
                                            />
                                        )}
                                        <div className="text-left flex-grow">
                                            {item.title ? (
                                                <p className="font-bold text-white">{item.title}</p>
                                            ) : (
                                                <>
                                                    <p className="font-medium text-white">{item.name}</p>
                                                    <p className="text-sm text-gray-400">{item.email}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Link>
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

export default SearchDropdown;
