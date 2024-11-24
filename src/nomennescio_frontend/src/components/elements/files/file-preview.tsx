import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface FilePreviewProps {
    fileUrl: string;
    fileName: string;
    fileExtension: string | undefined;
    onDoubleClick: () => void;
    className?: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileUrl, fileName, fileExtension, onDoubleClick, className }) => {
    const baseClass = "rounded-md";
    const combinedClass = `${baseClass} ${className || ''}`;

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '')) {
        return <img src={fileUrl} alt={fileName} className={`object-cover ${combinedClass}`} onDoubleClick={onDoubleClick} />;
    } else if (['mp4', 'webm', 'ogg'].includes(fileExtension || '')) {
        return (
            <video className={combinedClass} onDoubleClick={onDoubleClick}>
                <source src={fileUrl} type={`video/${fileExtension}`} />
            </video>
        );
    } else if (['pdf'].includes(fileExtension || '')) {
        return (
            <div className={`bg-gray-700 overflow-hidden ${combinedClass}`} onDoubleClick={onDoubleClick}>
                <iframe src={fileUrl} className="w-full h-full rounded-md pointer-events-none" title="PDF Preview" style={{ border: 'none', height: '100%' }}></iframe>
            </div>
        );
    } else if (['doc', 'docx'].includes(fileExtension || '')) {
        return (
            <div className={`bg-gray-700 ${combinedClass}`} onDoubleClick={onDoubleClick}>
                <iframe
                    src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`}
                    className="w-full h-full rounded-md"
                    title="Word Document Preview"
                    style={{ border: 'none', height: '100%' }}
                ></iframe>
            </div>
        );
    } else {
        return (
            <div className={`flex items-center justify-center bg-gray-700 ${combinedClass}`} onDoubleClick={onDoubleClick}>
                <FontAwesomeIcon icon={faEyeSlash} size="3x" color="gray" />
            </div>
        );
    }
};

export default FilePreview;
