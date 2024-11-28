import React, { useState } from "react";
import Label from "./label";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextFieldProps {
  title: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant: "email" | "username";
  className?: string;
  labelSize?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  title,
  placeholder,
  onChange,
  variant,
  className,
  register,
  labelSize,
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

  return (
    <div className="relative">
      {title != "" && (
        <Label text={title} className={clsx("text-sm", labelSize)} />
      )}
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
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
    </div>
  );
};

export default TextField;
