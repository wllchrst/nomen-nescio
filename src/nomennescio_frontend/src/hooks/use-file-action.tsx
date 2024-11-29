import { useState, useEffect } from 'react';
import useProfileSource from './use-get-profile-source';
import { EmailService } from '../service/email-service';
import { useUserContext } from '../context/user-context';

export const useFileActions = (fileUrl: string, fileName: string, onRename?: (newName: string) => void, onDelete?: () => void) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<() => void>(() => { });
    const [signatureFile, setSignatureFile] = useState<File | null>(null);
    const emailService = new EmailService();
    const {user} = useUserContext()

    const handleDoubleClick = () => {
        handleOpenFile();
    };

    const handleOpenFile = () => {
        handleOpenSignatureModal(() => {
            let success = validateSignature();
            if (success) {
                setIsModalOpen(true);
            }
        });
    }

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

    const handleOpenSignatureModal = (action: () => void) => {
        setPendingAction(() => action);
        setIsSignatureModalOpen(true);
    };

    const handleConfirmSignature = () => {
        validateSignature(); 
        if (typeof pendingAction === 'function') {
            pendingAction();
        }
        setIsSignatureModalOpen(false);
    };

    const validateSignature = () => {
        // Validasinya disni 
        if(user == null || signatureFile == null) return false;

        emailService.compareSignature(user, signatureFile).then((result) => {
            if(result == null) return false;

            return result.data;
        });
        return false;
    }

    const handleDownloadFile = async () => {
        handleOpenSignatureModal(async () => {
            let success = true;  
            if (success) {
                try {
                    let modifiedFileUrl = fileUrl.replace(/\\/g, '/');

                    const fullUrl = `http://localhost:8000/${modifiedFileUrl}`;
                    console.log("Full urlnya:", fullUrl);

                    const response = await fetch(fullUrl);

                    if (!response.ok) {
                        throw new Error('kga bisa');
                    }

                    const blob = await response.blob();

                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);

                    link.download = fullUrl.split('/').pop();

                    link.click();

                    console.log("Download success");

                    URL.revokeObjectURL(link.href);
                } catch (error) {
                    console.error('Download failed:', error);
                }
            }
        });
    };





    const handleDelete = () => {
        onDelete?.();
        setIsDeleteModalOpen(false);
    };

    const handleRename = (newName: string) => {
        onRename?.(newName);
        setIsRenameModalOpen(false);
    };

    return {
        isModalOpen,
        setIsModalOpen,
        contextMenu,
        isContextMenuVisible,
        setIsContextMenuVisible,
        handleDoubleClick,
        handleRightClick,
        handleCloseContextMenu,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        isRenameModalOpen,
        setIsRenameModalOpen,
        isSignatureModalOpen,
        setIsSignatureModalOpen,
        handleOpenSignatureModal,
        handleConfirmSignature,
        handleOpenFile,
        handleDownloadFile,
        handleDelete,
        handleRename,
        signatureFile,
        setSignatureFile
    };
};
