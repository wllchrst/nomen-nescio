
import { useState } from 'react';
import { IUser } from '../interfaces/user-interface';

const useGroup = () => {
    const [showMembers, setShowMembers] = useState<{ [key: string]: boolean }>({});
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupMembers, setNewGroupMembers] = useState<IUser[]>([]);
    const [memberSearch, setMemberSearch] = useState('');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [sharedFile, setSharedFile] = useState<string | null>(null);
    const [sharedWithUsers, setSharedWithUsers] = useState<IUser[]>([]);

    const toggleMembers = (groupId: string) => {
        setShowMembers(prevState => ({
            ...prevState,
            [groupId]: !prevState[groupId],
        }));
    };

    const handleFileClick = (fileUrl: string) => {
        setSelectedFile(fileUrl);
    };

    const closeModal = () => {
        setSelectedFile(null);
    };

    const openUploadModal = () => {
        setIsUploadModalOpen(true);
    };

    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
    };

    const openCreateGroupModal = () => {
        setIsCreateGroupModalOpen(true);
    };

    const closeCreateGroupModal = () => {
        setIsCreateGroupModalOpen(false);
    };

    const handleAddMember = (user: IUser) => {
        if (!newGroupMembers.some(member => member.id === user.id)) {
            setNewGroupMembers([...newGroupMembers, user]);
        }
    };

    const handleRemoveMember = (userId: number) => {
        setNewGroupMembers(newGroupMembers.filter(member => member.id !== userId));
    };

    const handleCreateGroupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Group Name:', newGroupName);
        console.log('Group Members:', newGroupMembers);
        closeCreateGroupModal();
    };

    const handleShareFile = (fileUrl: string) => {
        setSharedFile(fileUrl);
        setIsShareModalOpen(true);
    };

    const handleAddUserToShare = (user: IUser) => {
        if (!sharedWithUsers.some(u => u.id === user.id)) {
            setSharedWithUsers([...sharedWithUsers, user]);
        }
    };

    const handleRemoveUserFromShare = (userId: number) => {
        setSharedWithUsers(sharedWithUsers.filter(user => user.id !== userId));
    };

    const handleShareSubmit = () => {
        console.log('Shared File:', sharedFile);
        console.log('Shared With:', sharedWithUsers);
        setIsShareModalOpen(false);
    };

    const handleRenameFile = (fileUrl: string, newName: string) => {
        console.log(`Renamed ${fileUrl} to ${newName}`);
    };

    const handleDeleteFile = (fileUrl: string) => {
        console.log(`Deleted ${fileUrl}`);
    };

    return {
        showMembers,
        selectedFile,
        isUploadModalOpen,
        isCreateGroupModalOpen,
        newGroupName,
        newGroupMembers,
        memberSearch,
        isShareModalOpen,
        sharedFile,
        sharedWithUsers,
        toggleMembers,
        handleFileClick,
        closeModal,
        openUploadModal,
        closeUploadModal,
        openCreateGroupModal,
        closeCreateGroupModal,
        handleAddMember,
        handleRemoveMember,
        handleCreateGroupSubmit,
        handleShareFile,
        handleAddUserToShare,
        handleRemoveUserFromShare,
        handleShareSubmit,
        handleRenameFile,
        handleDeleteFile,
        setNewGroupName,
        setMemberSearch,
    };
};

export default useGroup;