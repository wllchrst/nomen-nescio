import React, { useState, useEffect } from 'react';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FileDownloadProps {
    fileUrl: string;
    uploadedDate: string;
    onRename?: () => void;
    onDelete?: () => void;
}

const FileDownload: React.FC<FileDownloadProps> = ({ fileUrl, uploadedDate, onRename, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

    const fileName = fileUrl.split('/').pop() || 'Unnamed File';
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    const handleDoubleClick = () => {
        setIsModalOpen(true);
    };

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
        setIsContextMenuVisible(true);
    };

    const handleCloseContextMenu = () => {
        setIsContextMenuVisible(false);
    };

    useEffect(() => {
        const handleOutsideClick = () => {
            handleCloseContextMenu();
        };
        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleDownloadFile = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // ini yg render versi kecil
    const renderFilePreview = () => {
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '')) {
            return (
                <img
                    src={fileUrl}
                    alt={fileName}
                    className="rounded-md object-cover w-full h-40"
                    onDoubleClick={handleDoubleClick}
                />
            );
        } else if (['mp4', 'webm', 'ogg'].includes(fileExtension || '')) {
            return (
                <video
                    controls
                    className="rounded-md w-full h-40"
                    onDoubleClick={handleDoubleClick}
                >
                    <source src={fileUrl} type={`video/${fileExtension}`} />
                </video>
            );
        } else if (['pdf'].includes(fileExtension || '')) {
            return (
                <div
                    className="w-full h-40 rounded-md bg-gray-700 overflow-hidden"
                    onDoubleClick={handleDoubleClick}
                >
                    <iframe
                        src={fileUrl}
                        className="w-full h-full rounded-md pointer-events-none"
                        title="PDF Preview"
                        style={{ border: 'none' }}
                    ></iframe>
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
                        onDoubleClick={handleDoubleClick}
                    ></iframe>
                </div>
            );
        } else {
            return (
                <div
                    className="flex items-center justify-center bg-gray-700 rounded-md w-full h-40"
                    onDoubleClick={handleDoubleClick}
                >
                    <FontAwesomeIcon icon={faEyeSlash} size="3x" color="gray" />
                </div>
            );
        }
    };

    const renderModalContent = () => {
        if (['pdf'].includes(fileExtension || '')) {
            return (
                <iframe
                    src={fileUrl}
                    className="w-full h-full rounded-md"
                    title="PDF Preview"
                    style={{ border: 'none' }}
                ></iframe>
            );
        } else if (['doc', 'docx'].includes(fileExtension || '')) {
            return (
                <iframe
                    src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`}
                    className="w-full h-full"
                    title="Word Document Preview"
                    style={{ border: 'none' }}
                ></iframe>
            );
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '')) {
            return <img src={fileUrl} alt={fileName} className="w-full h-full rounded-md" />;
        } else if (['mp4', 'webm', 'ogg'].includes(fileExtension || '')) {
            return (
                <video controls className="w-full h-full rounded-md">
                    <source src={fileUrl} type={`video/${fileExtension}`} />
                </video>
            );
        } else {
            return (
                <div className="flex items-center justify-center w-full h-full">
                    <FontAwesomeIcon icon={faEyeSlash} size="3x" color="gray" />
                </div>
            );
        }
    };

    return (
        <div
            className="bg-gray-800 text-white rounded-lg shadow-lg p-4 max-w-sm mx-auto relative"
            onContextMenu={handleRightClick}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium truncate">{fileName}</h3>
                <button className="text-gray-400 hover:text-white">
                    <span className="material-icons">more_vert</span>
                </button>
            </div>

            <div className="my-4">{renderFilePreview()}</div>

            <div className="flex items-center text-sm text-gray-400">
                <span className="material-icons text-green-500 mr-2">person</span>
                <p className="truncate">You created • {uploadedDate}</p>
            </div>

            {contextMenu && isContextMenuVisible && (
                <div
                    className="fixed bg-gray-800 text-white rounded-md shadow-md p-2 z-50 transition-opacity duration-300 ease-in-out transform hover:opacity-100"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                    onMouseLeave={handleCloseContextMenu}
                >
                    <button
                        onClick={() => window.open(fileUrl, '_blank')}
                        className="block text-left px-4 py-2 hover:bg-gray-700"
                    >
                        Open File
                    </button>
                    <button
                        onClick={handleDownloadFile}
                        className="block text-left px-4 py-2 hover:bg-gray-700"
                    >
                        Download File
                    </button>
                    <button
                        onClick={onRename}
                        className="block text-left px-4 py-2 hover:bg-gray-700"
                    >
                        Rename File
                    </button>
                    <button
                        onClick={onDelete}
                        className="block text-left px-4 py-2 hover:bg-gray-700"
                    >
                        Delete File
                    </button>
                </div>
            )}

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-transform duration-300 ease-in-out"
                    onClick={() => setIsModalOpen(false)}
                >
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="fixed top-4 right-4 text-white font-bold text-7xl z-50"
                    >
                        ×
                    </button>
                    <div
                        className="bg-white rounded-lg shadow-lg w-10/12 md:w-2/3 lg:w-1/2 h-4/5 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {renderModalContent()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileDownload;
