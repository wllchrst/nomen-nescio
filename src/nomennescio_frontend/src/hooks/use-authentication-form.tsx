import { useState } from 'react';

function useAuthForm() {
    const [isRegister, setIsRegister] = useState(true);

    const toggleForm = () => {
        setIsRegister((prev) => !prev);
    };

    return {
        isRegister,
        toggleForm,
    };
}

export default useAuthForm;
