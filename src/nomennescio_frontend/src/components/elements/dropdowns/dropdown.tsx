import { useState, useEffect, ReactNode, useRef } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import clsx from 'clsx';

interface DropdownProps {
    text: string;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
    size?: string;
    image?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ image, text, icon, children, className, size = "text-xl" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownStyles, setDropdownStyles] = useState({});
    const dropdownRef = useRef<HTMLDivElement>(null);
    let timer: NodeJS.Timeout;

    const handleMouseEnter = () => {
        clearTimeout(timer);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timer = setTimeout(() => setIsOpen(false), 200);
    };

    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            const windowWidth = window.innerWidth;

            if (dropdownRect.right > windowWidth) {
                setDropdownStyles({ right: 0 });
            } else {
                setDropdownStyles({});
            }
        }
    }, [isOpen]);

    return (
        <div
            className={clsx("relative inline-block", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="flex items-center px-4 py-2 text-gray-300 hover:text-white focus:outline-none">
                {icon ? (
                    <span className="mr-2">{icon}</span>
                ) : (
                    image && <img src={image} alt="" className='mr-2 w-8 h-8 rounded-full' />
                )}
                <p className={size}>{text}</p>
                {(!icon && !image) && <AiFillCaretDown className="ml-2 text-gray-400" />}
            </button>
            <div
                ref={dropdownRef}
                style={dropdownStyles}
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
