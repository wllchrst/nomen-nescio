import React, { useState } from 'react';
import {
    faFile,
    faFileImage,
    faFileVideo,
    faFilePdf,
    faFileWord,
    faEyeSlash,
    faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownValue from '../dropdowns/dropdown-value';
import DeleteModal from '../modals/delete-modal';
import RenameModal from '../modals/rename-modal';
import FilePreview from './file-preview';
import { useFileActions } from '../../../hooks/use-file-action';

interface FileDownloadProps {
    fileUrl: string;
    uploadedDate: string;
    profileUrl?: string;
    onRename?: (newName: string) => void;
    onDelete?: () => void;
    className?: string;
    needPreview?: boolean;
}

const FileDownload: React.FC<FileDownloadProps> = ({ fileUrl, uploadedDate, profileUrl, onRename, onDelete, className, needPreview = true }) => {
    const {
        isModalOpen,
        setIsModalOpen,
        isContextMenuVisible,
        setIsContextMenuVisible, 
        handleDoubleClick,
        handleCloseContextMenu,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        isRenameModalOpen,
        setIsRenameModalOpen,
        handleThreeDotsClick
    } = useFileActions();

    const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);

    const fileName = fileUrl.split('/').pop() || 'Unnamed File';
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    const handleDownloadFile = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = () => {
        onDelete?.();
        setIsDeleteModalOpen(false);
    };

    const handleRename = (newName: string) => {
        onRename?.(newName);
        setIsRenameModalOpen(false);
    };

    const getFileIcon = () => {
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '')) {
            return <FontAwesomeIcon icon={faFileImage} className="text-blue-400 mr-2" />;
        } else if (['mp4', 'webm', 'ogg'].includes(fileExtension || '')) {
            return <FontAwesomeIcon icon={faFileVideo} className="text-red-400 mr-2" />;
        } else if (['pdf'].includes(fileExtension || '')) {
            return <FontAwesomeIcon icon={faFilePdf} className="text-red-600 mr-2" />;
        } else if (['doc', 'docx'].includes(fileExtension || '')) {
            return <FontAwesomeIcon icon={faFileWord} className="text-blue-600 mr-2" />;
        } else {
            return <FontAwesomeIcon icon={faFile} className="text-gray-400 mr-2" />;
        }
    };

    const renderModalContent = () => {
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '')) {
            return <img src={fileUrl} alt={fileName} className="w-full h-full object-contain rounded-md" />;
        } else if (['mp4', 'webm', 'ogg'].includes(fileExtension || '')) {
            return (
                <video controls className="w-full h-full rounded-md">
                    <source src={fileUrl} type={`video/${fileExtension}`} />
                    webnya gk support
                </video>
            );
        } else if (fileExtension === 'pdf') {
            return <iframe src={fileUrl} className="w-full h-full rounded-md" title="PDF Preview"></iframe>;
        } else if (['doc', 'docx'].includes(fileExtension || '')) {
            return (
                <iframe
                    src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`}
                    className="w-full h-full rounded-md"
                    title="Word Document Preview"
                ></iframe>
            );
        } else if (['txt'].includes(fileExtension || '')) {
            return (
                <iframe
                    src={fileUrl}
                    className="w-full h-full rounded-md"
                    title="Text File Preview"
                ></iframe>
            );
        } else {
            return (
                <div className="flex items-center justify-center w-full h-full">
                    <FontAwesomeIcon icon={faEyeSlash} size="3x" color="gray" />
                </div>
            );
        }
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        const { clientX: x, clientY: y } = event;
        setIsContextMenuVisible(true);
        setContextMenu({ x, y });
    };

    const handlePreviewClick = () => {
        setIsModalOpen(true);
    };

    const containerClass = needPreview ? `bg-gray-800 text-white rounded-lg shadow-lg p-4 max-w-sm mx-auto relative transition-colors duration-300 hover:bg-gray-700 ${className}` : `bg-gray-800 text-white rounded-lg shadow-lg p-4 w-96 h-10 mx-auto relative flex items-center transition-colors duration-300 hover:bg-gray-700 ${className}`;

    return (
        <div className={containerClass} onContextMenu={handleContextMenu}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    {getFileIcon()}
                    <h3 className="text-sm font-medium truncate">{fileName}</h3>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                    {profileUrl ? (
                        <img src={profileUrl} alt="Profile" className="h-7 rounded-full mr-2 m-0" />
                    ) : (
                        <img src="https://via.placeholder.com/50" alt="Placeholder" className=" h-7  rounded-full mr-2 m-0" />
                    )}
                    <p className="truncate">Upload on • {uploadedDate}</p>
                </div>
                <div className="ml-2 text-gray-400 cursor-pointer" onClick={handleThreeDotsClick}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </div>
            </div>

            {needPreview && (
                <div className="my-4 cursor-pointer" onClick={handlePreviewClick}>
                    <FilePreview fileUrl={fileUrl} fileName={fileName} fileExtension={fileExtension} onDoubleClick={handleDoubleClick} />
                </div>
            )}

            {isContextMenuVisible && (
                <div className="fixed p-2 z-50" style={{ top: contextMenu.y, left: contextMenu.x }} onMouseLeave={handleCloseContextMenu}>
                    <div className="bg-gray-800 text-white rounded-md shadow-md w-40 p-2">
                        <DropdownValue text="Open File" onClick={() => window.open(fileUrl, '_blank')} />
                        <DropdownValue text="Download File" onClick={handleDownloadFile} />
                        <DropdownValue text="Rename File" onClick={() => setIsRenameModalOpen(true)} />
                        <DropdownValue text="Delete File" onClick={() => setIsDeleteModalOpen(true)} />
                        <DropdownValue text="Share File" onClick={onDelete} />
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
                    <button onClick={() => setIsModalOpen(false)} className="fixed top-4 right-4 text-white font-bold text-3xl z-50">
                        ×
                    </button>
                    <div className="bg-white rounded-lg shadow-lg w-10/12 md:w-2/3 lg:w-1/2 h-4/5 relative overflow-auto" onClick={(e) => e.stopPropagation()}>
                        {renderModalContent()}
                    </div>
                </div>
            )}

            <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDelete} />
            <RenameModal isOpen={isRenameModalOpen} onClose={() => setIsRenameModalOpen(false)} onRename={handleRename} />
        </div>
    );
};

export default FileDownload;
