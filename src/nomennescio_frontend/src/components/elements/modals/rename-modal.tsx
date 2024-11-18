import React, { useState } from 'react';

interface RenameModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRename: (newName: string) => void;
}

const RenameModal: React.FC<RenameModalProps> = ({ isOpen, onClose, onRename }) => {
    const [newName, setNewName] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative">
                <h2 className="text-lg font-semibold mb-3">Rename File</h2>
                <p className="text-sm text-gray-400 mb-4">
                    Please enter a new name for your file. This will update the file name instantly.
                </p>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-4 focus:outline-none focus:border-blue-500"
                    placeholder="New file name"
                />
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 text-sm bg-gray-600 text-gray-300 rounded hover:bg-gray-500 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onRename(newName)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                    >
                        Rename
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RenameModal;
