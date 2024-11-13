import React from 'react';
import { Input, InputProps } from '@chakra-ui/react';
import Label from './label';

interface TextFieldProps extends InputProps {
    title: string;
    placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({ title, placeholder }) => {
    return (
        <div>
            <Label text={title}></Label>
            <input
                type="text"
                placeholder={placeholder}
                className="text-base w-full border border-gray-600 rounded-md p-4 bg-[#0d1117] text-white focus:border-blue-500 focus:outline-none"
            />
        </div>
    );
};

export default TextField;
