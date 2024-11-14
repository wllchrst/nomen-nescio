import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Label from './label';

interface PasswordFieldProps {
    title: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showError?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ title, placeholder, onChange, showError }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | null>(null);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        onChange?.(e);

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < 6) {
            setPasswordStrength("weak");
        } else if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            setPasswordStrength("medium");
        } else if (password.length >= 10) {
            setPasswordStrength("strong");
        } else {
            setPasswordStrength("medium");
        }
    };


    return (
        <div>
            <Label text={title} className='text-sm'/>
            <div
                className="relative"
                onMouseEnter={() => setPasswordStrength(passwordStrength)}
                onMouseLeave={() => setPasswordStrength(passwordStrength)}
            >
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    onChange={handlePasswordChange}
                    className={`text-sm w-full border rounded-md p-2 bg-[#0d1117] text-white focus:outline-none ${passwordStrength === "weak"
                            ? "border-red-500"
                            : passwordStrength === "medium"
                                ? "border-yellow-500"
                                : passwordStrength === "strong"
                                    ? "border-green-500"
                                    : "border-gray-600"
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
