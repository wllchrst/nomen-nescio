import { useState } from "react";

const usePasswordStrength = () => {
  const [passwordStrength, setPasswordStrength] = useState<{
    lengthValid: boolean;
    caseValid: boolean;
    numberValid: boolean;
    specialCharValid: boolean;
    strongValid: boolean;
    overall: "weak" | "medium" | "strong" | null;
  } | null>(null);

  const evaluatePasswordStrength = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const lengthValid = password.length >= 6;
    const caseValid = hasUpperCase && hasLowerCase;
    const numberValid = hasNumber;
    const specialCharValid = hasSpecialChar;
    const strongValid = password.length >= 10;

    let overall: "weak" | "medium" | "strong" | null = "weak";
    if (lengthValid && caseValid && numberValid && specialCharValid) {
      overall = strongValid ? "strong" : "medium";
    }

    setPasswordStrength({ lengthValid, caseValid, numberValid, specialCharValid, strongValid, overall });
  };

  return { passwordStrength, evaluatePasswordStrength };
};

export default usePasswordStrength;