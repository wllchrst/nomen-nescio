import { useState, useEffect } from 'react';
import useProfileSource from './use-get-profile-source';
import { useUserContext } from '../context/user-context';
import { IUser } from '../interfaces/user-interface';
import { getFile, getFileUrl } from '../service/file-service';
import { UserService } from '../service/user-service';

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

    const handleConfirmSignature = (user: IUser, url: string) => {
        return async () => {
            // if (typeof pendingAction === 'function') {
            //     pendingAction();
            // }

            const file_name = await getFile(userService.getUserIdFromCookie(), url, user.secret_key)
            const file_url = getFileUrl(file_name)

            const link = document.createElement('a');
            link.href = file_url;
            link.download = file_name;
            link.style.display = "hidden"

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const validateSignature = () => {
        // Validasinya disni 


        return true;
    }

    const handleDownloadFile = () => {
        handleOpenSignatureModal(() => {
            let success = validateSignature();
            if (success) {
                const link = document.createElement('a');
                link.href = useProfileSource(fileUrl);
                link.download = useProfileSource(fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
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