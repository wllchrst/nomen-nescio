import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface DropdownValueProps {
    to?: string;
    text: string;
    icon?: ReactNode;
    image?: string;
    onClick?: () => void;
}

const DropdownValue: React.FC<DropdownValueProps> = ({ to = "#", text, icon, onClick, image }) => {
    return (
        <Link
            to={to}
            className="z-50 flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-150 rounded-md"
            onClick={onClick}
        >
            {image ? (
                <img src={image} alt="" className="mr-4 w-6 h-6" />
            ) : (
                icon && <span className="mr-4">{icon}</span>
            )}
            {text}
        </Link>
    );
};

export default DropdownValue;
