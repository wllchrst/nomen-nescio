import React from 'react';
import {
    faFile,
    faFileImage,
    faFileVideo,
    faFilePdf,
    faFileWord,
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
    onRename?: (newName: string) => void;
    onDelete?: () => void;
}

const FileDownload: React.FC<FileDownloadProps> = ({ fileUrl, uploadedDate, onRename, onDelete }) => {
    const {
        isModalOpen,
        setIsModalOpen,
        contextMenu,
        isContextMenuVisible,
        handleDoubleClick,
        handleRightClick,
        handleCloseContextMenu,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        isRenameModalOpen,
        setIsRenameModalOpen,
    } = useFileActions();

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

    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 max-w-sm mx-auto relative" onContextMenu={handleRightClick}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {getFileIcon()}
                    <h3 className="text-sm font-medium truncate">{fileName}</h3>
                </div>
            </div>

            <div className="my-4">
                <FilePreview fileUrl={fileUrl} fileName={fileName} fileExtension={fileExtension} onDoubleClick={handleDoubleClick} />
            </div>

            <div className="flex items-center text-sm text-gray-400">
                <span className="material-icons text-green-500 mr-2">person</span>
                <p className="truncate">Opened • {uploadedDate}</p>
            </div>

            {contextMenu && isContextMenuVisible && (
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
                    <button onClick={() => setIsModalOpen(false)} className="fixed top-4 right-4 text-white font-bold text-3xl z-50">×</button>
                    <div className="bg-white rounded-lg shadow-lg w-10/12 md:w-2/3 lg:w-1/2 h-4/5 relative" onClick={(e) => e.stopPropagation()}>
                    </div>
                </div>
            )}

            <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDelete} />
            <RenameModal isOpen={isRenameModalOpen} onClose={() => setIsRenameModalOpen(false)} onRename={handleRename} />
        </div>
    );
};

export default FileDownload;
