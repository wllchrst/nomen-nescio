import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface FilePreviewProps {
    fileUrl: string;
    fileName: string;
    fileExtension: string | undefined;
    onDoubleClick: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileUrl, fileName, fileExtension, onDoubleClick }) => {
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '')) {
        return <img src={fileUrl} alt={fileName} className="rounded-md object-cover w-full h-40" onDoubleClick={onDoubleClick} />;
    } else if (['mp4', 'webm', 'ogg'].includes(fileExtension || '')) {
        return (
            <video controls className="rounded-md w-full h-40" onDoubleClick={onDoubleClick}>
                <source src={fileUrl} type={`video/${fileExtension}`} />
            </video>
        );
    } else if (['pdf'].includes(fileExtension || '')) {
        return (
            <div className="w-full h-40 rounded-md bg-gray-700 overflow-hidden" onDoubleClick={onDoubleClick}>
                <iframe src={fileUrl} className="w-full h-full rounded-md pointer-events-none" title="PDF Preview" style={{ border: 'none' }}></iframe>
            </div>
        );
    } else if (['doc', 'docx'].includes(fileExtension || '')) {
        return (
            <div className="w-full h-40 rounded-md bg-gray-700">
                <iframe
                    src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`}
                    className="w-full h-full rounded-md"
                    title="Word Document Preview"
                    style={{ border: 'none' }}
                    onDoubleClick={onDoubleClick}
                ></iframe>
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-center bg-gray-700 rounded-md w-full h-40" onDoubleClick={onDoubleClick}>
                <FontAwesomeIcon icon={faEyeSlash} size="3x" color="gray" />
            </div>
        );
    }
};

export default FilePreview;
