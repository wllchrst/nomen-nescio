import React, { useState } from 'react';
import Label from './label';
import clsx from 'clsx';

interface TextFieldProps {
    title: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    variant: "email" | "username";
    className?: string;
    labelSize: string;
}

const TextField: React.FC<TextFieldProps> = ({ title, placeholder, onChange, variant, className, labelSizes }) => {
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange(e);

        if (variant === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsValid(emailRegex.test(value));
        } else if (variant === "username") {
            setIsValid(value.trim() !== "");
        }
    };

    return (
        <div className="relative">
            <Label text={title} className={clsx("text-sm", $labelSize)} />
            <input
                type="text"
                placeholder={placeholder}
                onChange={handleChange}
                className={`text-sm w-full border p-2 rounded-md bg-[#0d1117] text-white focus:outline-none ${isValid === null
                        ? 'border-gray-600'
                        : isValid
                            ? 'border-green-500'
                            : 'border-red-500'
                    } ${className}`}
            />
        </div>
    );
};

export default TextField;
