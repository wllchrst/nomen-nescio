import React, { useState, useEffect } from 'react';
import useAlert from '../../../hooks/use-alert';

interface AlertProps {
    title: string;
    desc: string;
}

const Alert: React.FC<AlertProps> = ({ title, desc}) => {
    const { showAlert, closeAlert, isClosing} = useAlert(4000, 500);

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            {showAlert && (
                <div
                    className={`mb-4 p-4 max-w-sm mx-auto bg-gray-800 text-white rounded-b-lg shadow-md transition-all duration-500 ease-out transform ${isClosing
                        ? 'translateY-[-20px] opacity-0'
                        : 'translateY-0 opacity-100'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold text-sm">{ title }</h2>
                            <p className="text-xs">{ desc }</p>
                        </div>

                        <button
                            onClick={closeAlert}
                            className="text-white text-4xl hover:text-gray-300"
                        >
                            &times;
                        </button>   
                    </div>

                    <div
                        className={`absolute bottom-0 left-0 w-full h-1 bg-red-500 ${isClosing ? 'opacity-0' : 'animate-progress-bar'}`}
                    ></div>
                </div>
            )}

            <style jsx>{`
                @keyframes progress-bar {
                    0% {
                        width: 0;
                    }
                    100% {
                        width: 100%;
                    }
                }

                .animate-progress-bar {
                    animation: progress-bar 4s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Alert;
