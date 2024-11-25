import React, { useState } from 'react';
import Template from '../components/global/template';
import Navbar from '../components/global/navbar';
import FileUpload from '../components/elements/files/file-upload';
import FileDownload from '../components/elements/files/file-download';
import Sidebar from '../components/global/sidebar';
import Dropdown from '../components/elements/dropdowns/dropdown';
import DropdownValue from '../components/elements/dropdowns/dropdown-value';
import Modal from '../components/elements/modals/modal';
import Search from '../components/elements/search/search';
import { AiOutlineClose, AiOutlineUserAdd } from 'react-icons/ai'; // Import the necessary icons

const files = [
    { fileUrl: 'src/uploads/C.cpp', uploadedDate: '6 Oct 2024' },
    { fileUrl: 'src/uploads/nomen_nescio_logo.png', uploadedDate: '6 Oct 2024' },
    { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
];

const fileTypes = ['All', 'Images', 'Documents', 'Code'];

interface UserItem {
    id: number;
    image?: string;
    name?: string;
    email?: string;
    link: string;
}

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

const Storage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [sharedFile, setSharedFile] = useState<string | null>(null);
    const [sharedWithUsers, setSharedWithUsers] = useState<UserItem[]>([]);

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

    const filteredFiles = files.filter((file) => {
        const matchesSearchQuery = file.fileUrl.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'All' || 
            (selectedType === 'Images' && file.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i)) ||
            (selectedType === 'Documents' && file.fileUrl.match(/\.(pdf|doc|docx|txt)$/i)) ||
            (selectedType === 'Code' && file.fileUrl.match(/\.(cpp|js|ts|py|java)$/i));
        return matchesSearchQuery && matchesType;
    });

    return (
        <Template>
            <div className="container mx-auto px-6 py-8 mt-20" > 
                <div className="mt-2 flex justify-between items-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for files..."
                        className="w-2/5 p-2 bg-[#161b22] border mb-2 border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Dropdown
                        text={selectedType}
                        size='text-base'
                        className="w-1/16 text-sm z-20 bg-[#161b22] border mb-2 border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {fileTypes.map((type) => (
                            <DropdownValue key={type} text={type} onClick={() => setSelectedType(type)} />
                        ))}
                    </Dropdown>
                </div>
                <div className="mt-5 mb-6 h-screen overflow-y-auto">
                    <div className="grid grid-cols-4 gap-4">
                        {filteredFiles.length > 0 ? (
                            filteredFiles.map((file, index) => (
                                <div key={index} className="">
                                    <FileDownload
                                        fileUrl={file.fileUrl}
                                        uploadedDate={file.uploadedDate}
                                        onShare={handleShareFile}
                                        onRename={(newName) => handleRenameFile(file.fileUrl, newName)}
                                        onDelete={() => handleDeleteFile(file.fileUrl)}
                                        className=""
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center">No files found</p>
                        )}
                    </div>
                </div>
            </div>
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

export default Storage;
