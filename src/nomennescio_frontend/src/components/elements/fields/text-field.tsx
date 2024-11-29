import React, { useState } from "react";
import Label from "./label";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface TextFieldProps {
  title: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant: "email" | "username";
  className?: string;
  labelSize?: string;
  showValidationOnHover?: boolean;
  needValidationMessage?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  title,
  placeholder,
  onChange,
  variant,
  className,
  register,
  labelSize,
  showValidationOnHover = false,
  needValidationMessage = false,
}) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange?.(e);

    if (variant === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValid(emailRegex.test(value));
    } else if (variant === "username") {
      setIsValid(value.trim() !== "");
    }
  };

  const validationMessages = {
    email: "Please enter a valid email address.",
    username: "Full Name cannot be empty."
  };

  return (
    <div className="relative">
      {title != "" && (
        <Label text={title} className={clsx("text-sm", labelSize)} />
      )}
      <div className="relative group">
        <input
          type="text"
          placeholder={placeholder}
          onChangeCapture={handleChange}
          {...register}
          className={clsx(
            "text-sm w-full border p-2 rounded-md bg-[#0d1117] text-white focus:outline-none",
            {
              "border-gray-600": isValid === null,
              "border-green-500": isValid === true,
              "border-red-500": isValid === false,
            },
            className
          )}
        />
        {isValid !== null && (
          <div className="absolute inset-y-0 right-3 flex items-center text-white">
            {isValid ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
          </div>
        )}
        {/* {isValid === false && !showValidationOnHover && (
          <div className="absolute top-0 left-0 mt-8 text-xs text-red-500">
            {validationMessages[variant]}
          </div>
        )} */}
        {showValidationOnHover && needValidationMessage && (
          <div className="absolute top-[-40px] left-0 text-xs text-gray-400 bg-[#0d1117] p-2 rounded-md shadow-lg hidden group-hover:block transition-all duration-300 ease-in-out transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center">
              {isValid ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-red-500 mr-2" />}
              {validationMessages[variant]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextField;
