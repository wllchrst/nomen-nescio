import React from 'react';
import useAlert from '../../../hooks/use-alert';

interface AlertProps {
    title: string;
    desc: string;
}

const Alert: React.FC<AlertProps> = ({ title, desc }) => {
    const { showAlert, closeAlert, isClosing } = useAlert(4000, 500);

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            {showAlert && (
                <div
                    className={`mb-4 p-4 max-w-sm mx-auto bg-gray-800 text-white rounded-lg shadow-md transition-transform duration-500 ease-out ${isClosing ? '-translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold text-sm">{title}</h2>
                            <p className="text-xs">{desc}</p>
                        </div>
                        <button
                            onClick={closeAlert}
                            className="text-white text-xl hover:text-gray-300"
                        >
                            &times;
                        </button>
                    </div>

                    <div
                        className={`absolute bottom-0 left-0 w-full h-1 bg-red-500 transition-all duration-4000 ease-out ${isClosing ? 'opacity-0' : 'animate-progress-bar'
                            }`}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default Alert;
