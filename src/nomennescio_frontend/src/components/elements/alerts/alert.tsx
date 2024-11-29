import React, { useEffect, useState } from 'react';
import IAlert from '../../../interfaces/alert-interface';

const Alert: React.FC<IAlert> = ({ title, desc, type = 'info', showAlert, closeAlert, isClosing }) => {
    const alertTypeClasses = {
        success: 'bg-green-600 border-green-800',
        error: 'bg-red-600 border-red-800',
        warning: 'bg-yellow-600 border-yellow-800',
        info: 'bg-blue-600 border-blue-800',
    };

    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let interval: number;
        let hideTimeout: number;

        if (showAlert && !isClosing) {
            setVisible(true);
            setProgress(0);

            interval = window.setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        window.clearInterval(interval);
                        return 100;
                    }
                    return prevProgress + 2;
                });
            }, 10);

            hideTimeout = window.setTimeout(() => {
                closeAlert();
            }, 2000);

        } else {
            setVisible(false);
        }

        return () => {
            window.clearInterval(interval);
            window.clearTimeout(hideTimeout);
        };
    }, [showAlert, isClosing, closeAlert]);

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            {showAlert && visible && (
                <div
                    className={`mb-4 p-4 max-w-xs mx-auto ${alertTypeClasses[type]} text-white rounded-lg shadow-xl border-2 transition-all duration-500 ease-out transform ${isClosing ? '-translate-y-4 opacity-0' : 'translate-y-0 opacity-100'} animate__animated animate__fadeIn animate__faster`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold text-lg">{title}</h2>
                            <p className="text-sm opacity-80">{desc}</p>
                        </div>
                        <button
                            onClick={closeAlert}
                            className="text-white text-2xl hover:text-gray-300 focus:outline-none transition-all duration-300 ease-in-out"
                        >
                            &times;
                        </button>
                    </div>

                    <div
                        className={`absolute bottom-0 left-0 w-full h-1 ${alertTypeClasses[type].replace('600', '800')} transition-all duration-500 ease-in-out`}
                    >
                        <div
                            className="h-full bg-white transition-all duration-500 ease-in-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Alert;
