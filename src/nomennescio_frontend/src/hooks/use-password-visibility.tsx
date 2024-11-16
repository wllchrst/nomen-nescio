import { useState } from "react";

const usePasswordVisibility = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    return { showPassword, togglePasswordVisibility };
};

export default usePasswordVisibility;