import React from 'react';
import { Button, Box } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import clsx from 'clsx';

interface IconButtonProps {
    icon: IconType;
    hoverText?: string; // text yang bakalan muncul pas buttonnya dihovert
    onClick?: () => void;
    direction?: 'left' | 'right' | 'top' | 'bottom';
    innerText?: string; // text disebelah button 
    bg?: string;    
    className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ className, icon: Icon, hoverText, onClick, direction = 'bottom', innerText, bg = 'none' }) => {
    // ini directionnya kalau misalkan dihovert nanti textnya bakalan sesuai dengan directionnya
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
        <div className="relative group flex justify-items-start m-2 w-full">
            <Button
                bg={bg}
                color="white"
                _hover={{ bg: 'gray.700' }}
                className={clsx("p-2 rounded-md", className)}
                onClick={onClick}

            >
                <Icon className="text-white" /> {innerText}
            </Button>
            {hoverText && (
                <Box
                    className={`absolute ${getTextPositionClasses()}w-full bg-gray-900 text-white px-2 py-1 rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
                >
                    {hoverText}
                </Box>)}
        </div>
    );
};

export default IconButton;
