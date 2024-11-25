import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

interface UploadedFilesProps {
    selectedFiles: {
        file: File;
        progress: number;
        status: 'uploading' | 'completed';
    }[];
    width?: string;
}

const UploadedFiles: React.FC<UploadedFilesProps> = ({ selectedFiles, width }) => {
    return (
        <div className={`overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${selectedFiles.length > 4 ? 'overflow-y-scroll max-h-64' : ''}`}>
            {selectedFiles.map((fileObj, index) => (
                <div key={index} className="bg-gray-800 p-3 rounded-md shadow-md flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-base truncate">{fileObj.file.name}</span>
                        <span className="text-sm text-gray-400 flex items-center">
                            {fileObj.status === 'uploading'
                                ? `${fileObj.progress}%`
                                : (
                                    <AiOutlineCheck className="text-green-500 ml-2 rotate360 .rotate-animation text-xl font-bold" />
                                )}
                        </span>
                    </div>
                    {fileObj.status === 'uploading' && (
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div
                                className="bg-green-500 h-1.5 rounded-full"
                                style={{ width: `${fileObj.progress}%` }}
                            ></div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UploadedFiles;