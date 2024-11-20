import React from 'react';
import { Button, Box } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import { ButtonProps } from '@chakra-ui/react';
import clsx from 'clsx';

interface IconButtonProps extends ButtonProps {
    icon: IconType;
    hoverText?: string;
    onClick?: () => void;
    direction?: 'left' | 'right' | 'top' | 'bottom';
    innerText?: string;
    bg?: string;
    className?: string;
    to?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
    to,
    className,
    icon: Icon,
    hoverText,
    onClick,
    direction = 'bottom',
    innerText,
    bg = 'none',
    ...buttonProps
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        } else if (onClick) {
            onClick();
        }
    };

    const getTextPositionClasses = () => {
        switch (direction) {
            case 'left':
                return 'right-full mr-2';
            case 'right':
                return 'left-full ml-2';
            case 'top':
                return 'bottom-full mb-2';
            case 'bottom':
                return 'top-full mt-2';
            default:
                return 'top-full mt-2';
        }
    };

    return (
        <div className="relative group flex items-center m-2 w-full">
            <Button
                bg={bg}
                color="white"
                _hover={{ bg: 'gray.700' }}
                className={clsx("p-2 rounded-md flex items-center", className)}
                onClick={handleClick}
                {...buttonProps}
            >
                <Icon className="text-white mr-2" /> {innerText}
            </Button>
            {hoverText && (
                <Box
                    className={`absolute ${getTextPositionClasses()} bg-gray-900 text-white px-2 py-1 rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
                >
                    {hoverText}
                </Box>
            )}
        </div>
    );
};

export default IconButton;
