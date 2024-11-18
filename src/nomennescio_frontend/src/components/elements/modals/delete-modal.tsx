import React from 'react';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative">
                <h2 className="text-lg font-semibold mb-3 text-red-500">Delete File</h2>
                <p className="text-sm text-gray-400 mb-4">
                    Are you sure you want to delete this file? This action <strong>cannot</strong> be undone.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 text-sm bg-gray-600 text-gray-300 rounded hover:bg-gray-500 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-all"
                    >
                        Delete Permanently
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
