import { useState, useEffect, ReactNode } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import clsx from 'clsx';

interface DropdownProps {
    text: string;
    children: ReactNode;
    className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ children, text, className }) => {
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
            className={clsx("relative inline-block", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="flex items-center px-4 py-2 text-gray-300 hover:text-white focus:outline-none">
                {text}
                <AiFillCaretDown className="ml-2 text-gray-400" />
            </button>
            <div
                className={clsx(
                    "absolute mt-2 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg transform transition-all duration-300 ease-out",
                    isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default Dropdown;
