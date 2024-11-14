import React from 'react';
import { Button } from '@chakra-ui/react';

interface ButtonProps {
    text: string;
    onClick?: () => void;
}

const SecondaryButton: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <Button
            bg="white"
            color="gray.800"
            border="1px"
            borderColor="gray.300"
            _hover={{ bg: 'gray.100' }}
            className="font-semibold"
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default SecondaryButton;
