import React from 'react';
import { useFileUpload } from '../../../hooks/use-file-upload';
import { useDragAndDrop } from '../../../hooks/use-drag-and-drop';

interface FileUploadProps {
    width?: string;
    height?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ width = 'w-96', height = 'h-56' }) => {
    const { selectedFiles, startUploading } = useFileUpload();
    const { isDragging } = useDragAndDrop(startUploading);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            startUploading(files);
        }
    };

    const handleTapClick = () => {
        document.getElementById('fileInput')?.click();
    };

    return (
        <div className="">
            <div
                className={`${width} ${height} border ${isDragging ? 'border-blue-400 bg-gray-800' : 'border-gray-700 bg-gray-800'
                    } rounded-md flex flex-col items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl p-4`}
                onClick={handleTapClick}
            >
                <input
                    type="file"
                    className="hidden"
                    id="fileInput"
                    multiple
                    onChange={handleFileChange}
                />
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
            </div>

            <div className={`${width} mt-4 space-y-2`}>
                {selectedFiles.map((fileObj, index) => (
                    <div key={index} className="bg-gray-800 p-3 rounded-md shadow-md">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-300 text-base truncate">{fileObj.file.name}</span>
                            <span className="text-sm text-gray-400">
                                {fileObj.status === 'uploading'
                                    ? `Uploading... ${fileObj.progress}%`
                                    : 'Uploaded'}
                            </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                            <div
                                className="bg-green-500 h-1.5 rounded-full"
                                style={{ width: `${fileObj.progress}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUpload;
