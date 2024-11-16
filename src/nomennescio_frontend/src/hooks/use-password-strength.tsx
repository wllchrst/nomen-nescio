import { useState } from "react";


const usePasswordStrength = () => {
    const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | null>(null);

    const evaluatePasswordStrength = (password: string) => {
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

    return { passwordStrength, evaluatePasswordStrength };
};

export default usePasswordStrength;