import React from 'react';
import { Button } from '@chakra-ui/react';

interface ButtonProps {
    text: string;
    onClick?: () => void;
}

const DangerButton: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <Button
            bg="red.600"
            color="white"
            _hover={{ bg: 'red.500' }}
            className="font-semibold"
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default DangerButton;
