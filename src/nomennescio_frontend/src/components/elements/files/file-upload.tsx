import React, { useState, useEffect } from 'react';

interface FileUploadProps {
    width?: string;
    height?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ width = 'w-96', height = 'h-56' }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            setIsDragging(true);
        };

        const handleDragLeave = () => {
            setIsDragging(false);
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) {
                appendUniqueFiles(files); 
            }
        };

        window.addEventListener('dragover', (e) => handleDragOver(e as unknown as DragEvent));
        window.addEventListener('dragleave', handleDragLeave);
        window.addEventListener('drop', (e) => handleDrop(e as unknown as DragEvent));

        return () => {
            window.removeEventListener('dragover', (e) => handleDragOver(e as unknown as DragEvent));
            window.removeEventListener('dragleave', handleDragLeave);
            window.removeEventListener('drop', (e) => handleDrop(e as unknown as DragEvent));
        };
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            appendUniqueFiles(files);
        }
    };

    const appendUniqueFiles = (newFiles: File[]) => {
        setSelectedFiles((prevFiles) => {
            const existingFileNames = new Set(prevFiles.map((file) => file.name));
            const uniqueFiles = newFiles.filter((file) => !existingFileNames.has(file.name));
            return [...prevFiles, ...uniqueFiles];
        });
    };

    const handleTapClick = () => {
        document.getElementById('fileInput')?.click();
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-900 text-white">
            <div
                className={`${width} ${height} border ${isDragging ? 'border-blue-400 bg-gray-800' : 'border-gray-700 bg-gray-800'
                    } rounded-md flex flex-col items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl overflow-y-auto p-4`}
                onClick={handleTapClick}
            >
                <input
                    type="file"
                    className="hidden"
                    id="fileInput"
                    multiple 
                    onChange={handleFileChange}
                />
                {selectedFiles.length > 0 ? (
                    <ul className="w-full text-left space-y-1">
                        {selectedFiles.map((file, index) => (
                            <li key={index} className="text-gray-400 text-sm truncate">
                                {file.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <label
                        htmlFor="fileInput"
                        className="flex flex-col items-center justify-center cursor-pointer text-gray-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-gray-500 mb-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 16l4-4m0 0l4-4m-4 4h18M13 10V3l9 9-9 9v-6H4"
                            />
                        </svg>
                        <span className="text-sm text-gray-400">
                            Drag and drop files here or <span className="text-blue-400 font-semibold">click to upload</span>
                        </span>
                    </label>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
