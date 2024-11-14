import { useState, useEffect } from 'react';

const useAlert = (autoCloseDuration = 4000, closeAnimationDuration = 500) => {
    const [showAlert, setShowAlert] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    const closeAlert = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowAlert(false);
        }, closeAnimationDuration);
    };

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                closeAlert();
            }, autoCloseDuration);

            return () => clearTimeout(timer);
        }
    }, [showAlert, autoCloseDuration]);

    return { showAlert, isClosing, closeAlert };
};

export default useAlert;
