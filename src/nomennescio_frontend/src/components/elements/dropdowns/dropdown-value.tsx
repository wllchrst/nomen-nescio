import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface DropdownValueProps {
    to?: string;
    text: string;
    icon?: ReactNode;
    onClick?: () => void;
}

const DropdownValue: React.FC<DropdownValueProps> = ({ to = "#", text, icon, onClick }) => {
    return (
        <Link
            to={to}
            className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-150 rounded-md"
            onClick={onClick} 
        >
            {icon && <span className="mr-4">{icon}</span>}
            {text}
        </Link>
    );
};

export default DropdownValue;
