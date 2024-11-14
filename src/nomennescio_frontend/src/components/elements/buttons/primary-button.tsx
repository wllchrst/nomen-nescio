import React from 'react';
import { Button } from '@chakra-ui/react';

interface ButtonProps {
    text: string;
    onClick?: () => void;
}

const PrimaryButton: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <Button
            bg="gray.800"
            color="white"
            _hover={{ bg: 'gray.700' }}
            className="font-semibold p-2"
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default PrimaryButton;
