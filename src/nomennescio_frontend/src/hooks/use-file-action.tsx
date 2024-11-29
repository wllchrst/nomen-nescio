import { useState, useEffect } from 'react';
import useProfileSource from './use-get-profile-source';
import { useUserContext } from '../context/user-context';
import { IUser } from '../interfaces/user-interface';
import { getFile, getFileUrl } from '../service/file-service';
import { UserService } from '../service/user-service';
import { EmailService } from '../service/email-service';

import Alert from '../components/elements/alerts/alert'; // Import Alert component

export const useFileActions = (fileUrl: string, fileName: string, onRename?: (newName: string) => void, onDelete?: () => void) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<() => void>(() => { });
    const [signatureFile, setSignatureFile] = useState<File | null>(null);
    const userService = new UserService()
    const [alert, setAlert] = useState<{ show: boolean, type: string, title: string, desc: string }>({ show: false, type: '', title: '', desc: '' });
    const emailService = new EmailService();
    const {user} = useUserContext()

    const handleDoubleClick = () => {
        handleOpenFile();
    };

    const handleOpenFile = () => {
        handleOpenSignatureModal(() => {
            setIsModalOpen(true);
        });
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

    const handleOpenSignatureModal = (action: () => void) => {
        setPendingAction(() => action);
        setIsSignatureModalOpen(true);
    };

    // disini handle confirm signaturenya
    const handleConfirmSignature = async () => {
        let success = await validateSignature();
        success = true;
        if (success && pendingAction) {
            console.log("BERHASILLLLLLLLLL");
            setIsSignatureModalOpen(false);
            pendingAction();
        } else {
            console.log("Signature nya gagal euy");
        }
    };

    const validateSignature = async () => {
        if (user == null || signatureFile == null) return false;
        const result = await emailService.compareSignature(user, signatureFile);
        return result?.data || false;
    };

    const handleDownloadFile = async () => {
        handleOpenSignatureModal(async () => {
            try {
                let modifiedFileUrl = fileUrl.replace(/\\/g, '/');
                const fullUrl = `http://localhost:8000/${modifiedFileUrl}`;
                const response = await fetch(fullUrl);

                if (!response.ok) {
                    throw new Error('Failed to download');
                }

                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fullUrl.split('/').pop();
                link.click();
                URL.revokeObjectURL(link.href);

                setAlert({ show: true, type: 'success', title: 'Download Success', desc: 'File downloaded successfully.' });
            } catch (error) {
                console.error('Download failed:', error);
                setAlert({ show: true, type: 'error', title: 'Download Failed', desc: 'Failed to download the file.' });
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
        setSignatureFile,
        alert,
        setAlert
    };
};
