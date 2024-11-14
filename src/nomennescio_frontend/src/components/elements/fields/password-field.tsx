import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Label from './label';

interface PasswordFieldProps {
    title: string;
    placeholder?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ title, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false); // State to track input focus/hover

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <div>
            <Label text={title} />

            <div
                className="relative"
                onMouseEnter={() => setIsFocused(true)}
                onMouseLeave={() => setIsFocused(false)}
            >
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    className="text-base w-full border border-gray-600 rounded-md p-4 bg-[#0d1117] text-white focus:border-blue-500 focus:outline-none"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />

                {/* AnimatePresence and motion.div for animation */}
                <AnimatePresence>
                    {(isFocused || showPassword) && (
                        <motion.button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 flex items-center text-white focus:outline-none"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PasswordField;
