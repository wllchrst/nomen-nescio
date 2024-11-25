import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
            <button onClick={onClose} className="fixed top-4 right-4 text-white font-bold text-3xl z-50">
                ×
            </button>
            <div className="rounded-lg shadow-lg w-10/12 md:w-2/3 lg:w-1/2 h-4/5 relative flex items-center justify-center overflow-auto" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
