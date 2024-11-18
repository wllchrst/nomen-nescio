import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Label from './label';
import usePasswordStrength from '../../../hooks/use-password-strength';
import usePasswordVisibility from '../../../hooks/use-password-visibility';

interface PasswordFieldProps {
    title: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showError?: boolean;
    variant: 'password' | 'normal';
    className?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ title, placeholder, onChange, showError, variant, className }) => {
    const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
    const { passwordStrength, evaluatePasswordStrength } = usePasswordStrength();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (variant === 'normal') return; 

        const password = e.target.value;
        onChange?.(e);
        evaluatePasswordStrength(password);
    };

    return (
        <div>
            <Label text={title} className="text-sm" />
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    onChange={handlePasswordChange}
                    className={`text-sm w-full border rounded-md p-2 bg-[#0d1117] text-white focus:outline-none ${variant === 'password' ? (
                            passwordStrength === "weak"
                                ? "border-red-500"
                                : passwordStrength === "medium"
                                    ? "border-yellow-500"
                                    : passwordStrength === "strong"
                                        ? "border-green-500"
                                        : "border-gray-600"
                        ) : "border-gray-600" 
                        }`}
                />
                <AnimatePresence>
                    {(passwordStrength || showPassword) && (
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
            {showError && passwordStrength === "weak" && (
                <p className="text-red-500 text-sm mt-2">Password is too weak</p>
            )}
        </div>
    );
};

export default PasswordField;