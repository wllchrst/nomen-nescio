import React, { useState } from 'react';
import Template from '../components/global/template';
import FileDownload from '../components/elements/files/file-download';
import FilePreview from '../components/elements/files/file-preview';
import FileUpload from '../components/elements/files/file-upload';
import Modal from '../components/elements/modals/modal';
import { AiFillCaretDown, AiOutlinePlus, AiOutlineUsergroupAdd, AiOutlineUserAdd, AiOutlineClose } from 'react-icons/ai';
import Search from '../components/elements/search/search';

interface UserItem {
    id: number;
    image?: string;
    name?: string;
    email?: string;
    link: string;
}

const Group = () => {
    const [showMembers, setShowMembers] = useState<{ [key: string]: boolean }>({});
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupMembers, setNewGroupMembers] = useState<UserItem[]>([]); // Update state type
    const [memberSearch, setMemberSearch] = useState('');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [sharedFile, setSharedFile] = useState<string | null>(null);
    const [sharedWithUsers, setSharedWithUsers] = useState<UserItem[]>([]);

    const dummyData: UserItem[] = [
        {
            id: 1,
            image: 'https://via.placeholder.com/50',
            name: 'Kolin',
            email: 'john.doe@example.com',
            link: 'profile/johndoe'
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/50',
            name: 'William Christian',
            email: 'jane.smith@example.com',
            link: 'profile/johnsmith'
        },
        {
            id: 3,
            image: 'https://via.placeholder.com/50',
            name: 'Pibus',
            email: 'michael.brown@example.com',
            link: 'profile/michael'
        },
        {
            id: 4,
            image: 'https://via.placeholder.com/50',
            name: 'Felix',
            email: 'emily.davis@example.com',
            link: 'profile/emily'
        },
    ];


    const groups = [
        {
            id: 'dev-team',
            name: 'Dev Team',
            members: [
                { id: 1, name: 'William Christian', role: 'Owner', profilePicture: '' },
                { id: 2, name: 'Pibus', role: 'Admin', profilePicture: '' },
                { id: 3, name: 'Felix', role: 'Member', profilePicture: '' },
            ],
            files: [
                { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
                { fileUrl: 'https://example.com/file2.docx', uploadedDate: '2023-10-02' },
                { fileUrl: 'src/uploads/C.cpp', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/C.cpp', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/C.cpp', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/C.cpp', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/C.cpp', uploadedDate: '6 Oct 2024' },

            ],
        },
        {
            id: 'design-team',
            name: 'Design Team',
            description: 'A group for all design team members.',
            members: [
                { id: 4, name: 'Kolin', role: 'Owner', profilePicture: '' },
                { id: 5, name: 'Wohoo', role: 'Admin', profilePicture: '' },
                { id: 6, name: 'Marco Caper', role: 'Member', profilePicture: '' },
            ],
            files: [
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
                { fileUrl: 'https://example.com/file4.mp4', uploadedDate: '2023-10-04' },
            ],
        },
    ];

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

    const handleAddMember = (user: UserItem) => {
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

    const handleAddUserToShare = (user: UserItem) => {
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

    return (
        <Template>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-white">Groups</h1>
                    <div className="flex space-x-4">
                        <button
                            className="bg-gray-900 p-2 hover:bg-gray-700 text-white font-bold rounded-lg shadow-md transition duration-300 flex items-center"
                            onClick={openCreateGroupModal}
                        >
                            <AiOutlineUsergroupAdd className="mr-2" />
                            Create Group
                        </button>
                    
                    </div>
                </div>
                {groups.map(group => (
                    <div key={group.id} className="mb-4 bg-gray-800 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-2">{group.name}</h2>
                        <div className="flex items-center mb-2">
                            <div className="flex -space-x-2">
                                {group.members.map(member => (
                                    <img
                                        key={member.id}
                                        src={member.profilePicture || 'https://via.placeholder.com/50'}
                                        alt={`${member.name}'s profile`}
                                        className="w-12 h-12 rounded-full border-2 border-gray-800"
                                    />
                                ))}
                            </div>
                            <div onClick={() => toggleMembers(group.id)} className="text-white">
                                <AiFillCaretDown className="ml-2 text-gray-400" />
                            </div>
                            <button
                                className="bg-gray-700 m-4 p-4 hover:bg-green-600 text-white font-bold rounded-lg shadow-md transition duration-300 flex items-center group"
                                onClick={openUploadModal}
                            >
                                <AiOutlinePlus className="group-hover:rotate-180 transform transition-transform duration-300" />
                            </button>
                        </div>
                        <div className={`transition-all duration-300 ease-out ${showMembers[group.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            <ul className="text-white">
                                {group.members.map(member => (
                                    <li key={member.id} className="mb-2 flex items-center">
                                        <div className="bg-gray-700 p-2 rounded-full mr-2">
                                            <img
                                                src={member.profilePicture || 'https://via.placeholder.com/50'}
                                                alt={`${member.name}'s profile`}
                                                className="w-12 h-12 rounded-full"
                                            />
                                        </div>
                                        <div>
                                            <span className="font-bold">{member.name}</span> - {member.role}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {group.files.map(file => (
                                <div key={file.fileUrl} className="flex-grow cursor-pointer" onClick={() => handleFileClick(file.fileUrl)}>
                                    <FileDownload
                                        fileUrl={file.fileUrl}
                                        uploadedDate={file.uploadedDate}
                                        className="w-full p-6"
                                        needPreview={false}
                                        profileUrl={group.members.find(member => member.role === 'Owner')?.profilePicture}
                                        onShare={handleShareFile}
                                        onRename={(newName) => handleRenameFile(file.fileUrl, newName)}
                                        onDelete={() => handleDeleteFile(file.fileUrl)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Modal isOpen={isUploadModalOpen} onClose={closeUploadModal}>
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-white mb-4">Upload Files</h2>
                    <FileUpload />
                </div>
            </Modal>
            <Modal isOpen={isCreateGroupModalOpen} onClose={closeCreateGroupModal}>
                <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-white">Create Group</h2>
                        <button onClick={closeCreateGroupModal} className="text-white">
                            <AiOutlineClose size={24} />
                        </button>
                    </div>
                    <form onSubmit={handleCreateGroupSubmit}>
                        <div className="mb-4">
                            <label className="block text-white mb-2" htmlFor="groupName">Group Name</label>
                            <input
                                type="text"
                                id="groupName"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* INI BAGIAN MODAL CREATE GROUP  */}
                        <div className="mb-4">
                            <label className="block text-white mb-2" htmlFor="addMembers">Add Members</label>
                            <Search data={dummyData} onUserSelect={handleAddMember} />
                            <ul className="mt-2">
                                {newGroupMembers.map((member) => (
                                    <li key={member.id} className="text-white flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <img
                                                src={member.image || 'https://via.placeholder.com/50'}
                                                alt={`${member.name}'s profile`}
                                                className="w-8 h-8 rounded-full mr-2"
                                            />
                                            {member.name}
                                        </div>
                                        <button
                                            onClick={() => handleRemoveMember(member.id)}
                                            className="ml-2 bg-red-600 p-1 rounded text-white flex items-center"
                                        >
                                            <AiOutlineClose size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* INI BAGIAN MODAL CREATE GROUP  */}
                        <button
                            type="submit"
                            className="bg-green-600 p-2 rounded-lg text-white flex items-center justify-center w-full"
                        >
                            <AiOutlineUserAdd className="mr-2" />
                            Create Group
                        </button>
                    </form>
                </div>
            </Modal>
            <Modal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)}>
                <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-white">Share File</h2>
                        <button onClick={() => setIsShareModalOpen(false)} className="text-white">
                            <AiOutlineClose size={24} />
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2" htmlFor="addUsers">Add Users</label>
                        <Search data={dummyData} onUserSelect={handleAddUserToShare} />
                        <ul className="mt-2">
                            {sharedWithUsers.map((user) => (
                                <li key={user.id} className="text-white flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <img
                                            src={user.image || 'https://via.placeholder.com/50'}
                                            alt={`${user.name}'s profile`}
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        {user.name}
                                    </div>
                                    <button
                                        onClick={() => handleRemoveUserFromShare(user.id)}
                                        className="ml-2 bg-red-600 p-1 rounded text-white flex items-center"
                                    >
                                        <AiOutlineClose size={16} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        onClick={handleShareSubmit}
                        className="bg-green-600 p-2 rounded-lg text-white flex items-center justify-center w-full"
                    >
                        <AiOutlineUserAdd className="mr-2" />
                        Share File
                    </button>
                </div>
            </Modal>
        </Template>
    );
};

export default Group;