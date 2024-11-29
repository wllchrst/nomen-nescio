import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Label from './label';
import usePasswordStrength from '../../../hooks/use-password-strength';
import usePasswordVisibility from '../../../hooks/use-password-visibility';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

interface PasswordFieldProps {
    title: string;
    placeholder?: string;
    register?: UseFormRegisterReturn;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showError?: boolean;
    variant: 'password' | 'normal';
    className?: string;
    showValidationOnHover?: boolean;
    needValidationMessage?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ title, register, placeholder, onChange, showError, variant, className, showValidationOnHover = false, needValidationMessage = false }) => {
    const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
    const { passwordStrength, evaluatePasswordStrength } = usePasswordStrength();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (variant === 'normal') return;

        const password = e.target.value;
        onChange?.(e);
        evaluatePasswordStrength(password);
    };

    const validationMessages = [
        { message: "At least 6 characters", isValid: passwordStrength?.lengthValid },
        { message: "Contains uppercase and lowercase", isValid: passwordStrength?.caseValid },
        { message: "Contains a number", isValid: passwordStrength?.numberValid },
        { message: "Contains a special character", isValid: passwordStrength?.specialCharValid },
        { message: "At least 10 characters for strong password", isValid: passwordStrength?.strongValid }
    ];

    return (
        <div className="relative">
            <Label text={title} className="text-sm" />
            <div className="relative group">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    onChangeCapture={handlePasswordChange}
                    {...register}
                    className={clsx(
                        "text-sm w-full border rounded-md p-2 bg-[#0d1117] text-white focus:outline-none",
                        {
                            "border-gray-600": passwordStrength === null,
                            "border-red-500": passwordStrength?.overall === "weak",
                            "border-yellow-500": passwordStrength?.overall === "medium",
                            "border-green-500": passwordStrength?.overall === "strong",
                        },
                        className
                    )}
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
                {passwordStrength !== null && (
                    <div className="absolute inset-y-0 right-10 flex items-center text-white">
                        {passwordStrength.overall === "strong" ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                    </div>
                )}
                {showValidationOnHover && needValidationMessage && (
                    <div className="absolute top-[-120px] left-0 text-xs text-gray-400 bg-[#0d1117] p-2 rounded-md shadow-lg hidden group-hover:block transition-all duration-300 ease-in-out transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        {validationMessages.map((validation, index) => (
                            <div key={index} className="flex items-center">
                                {validation.isValid ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-red-500 mr-2" />}
                                {validation.message}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {showError && passwordStrength?.overall === "weak" && (
                <p className="text-red-500 text-sm mt-2">Password is too weak</p>
            )}
        </div>
    );
};

export default PasswordField;
