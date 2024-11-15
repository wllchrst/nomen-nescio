import { useState, useEffect, ReactNode } from 'react';
import { AiFillCaretDown } from 'react-icons/ai'; // Importing an icon

interface DropdownProps {
    text: string;
    children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ children, text }) => {
    const [isOpen, setIsOpen] = useState(false);
    let timer: NodeJS.Timeout;

    const handleMouseEnter = () => {
        clearTimeout(timer); 
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timer = setTimeout(() => setIsOpen(false), 200); 
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="flex items-center px-4 py-2 text-gray-300 hover:text-white focus:outline-none">
                {text}
                <AiFillCaretDown className="ml-2 text-gray-400" /> {/* Adding the icon */}
            </button>
            <div
                className={`absolute mt-2 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg transform transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                {children}
            </div>
        </div>
    );
};

export default Dropdown;
