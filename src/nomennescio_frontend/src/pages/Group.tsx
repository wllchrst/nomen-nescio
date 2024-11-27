import React, { useState } from 'react';
import Template from '../components/global/template';
import FileDownload from '../components/elements/files/file-download';
import FilePreview from '../components/elements/files/file-preview';
import FileUpload from '../components/elements/files/file-upload';
import Modal from '../components/elements/modals/modal';
import { AiFillCaretDown, AiOutlinePlus, AiOutlineUsergroupAdd, AiOutlineUserAdd, AiOutlineClose } from 'react-icons/ai';
import Search from '../components/elements/search/search';
import useGroup from '../hooks/use-group';
import useFetchUsers from '../hooks/use-fetch-user';
import { GroupService } from '../service/group-service';
import { ICreateGroup } from '../interfaces/create-group-interface';
import { UserService } from '../service/user-service';
import { IUser } from '../interfaces/user-interface';
import useProfileSource from '../hooks/use-get-profile-source';
import { useNavigate } from 'react-router-dom';
import useGetCurrentUser from '../hooks/use-get-current-user';

const Group = () => {
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [newGroupMembers, setNewGroupMembers] = useState<IUser[]>([]);
    const {
        showMembers,
        selectedFile,
        isUploadModalOpen,
        isCreateGroupModalOpen,
        newGroupName,
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
        handleShareFile,
        handleAddUserToShare,
        handleRemoveUserFromShare,
        handleShareSubmit,
        handleRenameFile,
        handleDeleteFile,
        setNewGroupName,
        setMemberSearch,
    } = useGroup();

    const users = useFetchUsers();
    // const currentUser = useGetCurrentUser();
    // console.log("current user", currentUser);
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
                { fileUrl: 'https://example.com/file4.mp4', uploadedDate: '2023-10-04' },
            ],
        },
    ];
    const navigate = useNavigate();

    const handleCreateGroupSubmit = async (e) => {
        e.preventDefault();
        const groupService = new GroupService();
        const userService = new UserService();
        const currentUser = await userService.getCurrentUser();
        if (!currentUser) {
            console.error("Current user not found");
            return;
        }


        const data: ICreateGroup = {
            name: newGroupName,
            description: "", 
        };

        // groupService.addGroupMember({group_id: 1, user_id: 1, role: "Owner"});
        // const resultGroup = await groupService.createGroup(data);
        // const resultMembers = await groupService.addGroupMember({
        //     group_id: 24,
        //     members: [
        //         { user_id: 1, role: "Owner" },
        //         { user_id: 2, role: "Members" },
        //     ]
        // });


        const result = await groupService.createGroupWithMembers(data, currentUser, newGroupMembers);
        if (result) {
            closeCreateGroupModal();
            console.log("berhasil king " + data);
        } else {
            console.log("gagal king " + data);
        }
    };


    const handleAddMember = (member: IUser) => {
        setNewGroupMembers((prevMembers) => [...prevMembers, member]);
    };

    const handleRemoveMember = (memberId: number) => {
        setNewGroupMembers((prevMembers) => prevMembers.filter(member => member.id !== memberId));
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
                                        src={useProfileSource(member.profilePicture) || useProfileSource("dummy_profile.png")}
                                        alt={`${member.name}'s profile`}
                                        className="w-11 h-11 rounded-full border-2 border-gray-800"
                                    />
                                ))}
                            </div>
                            <div onClick={() => toggleMembers(group.id)} className="text-white">
                                <AiFillCaretDown className="ml-2 text-gray-400" />
                            </div>
                            <button
                                className="bg-gray-700 m-4 p-4 hover:bg-green-600 text-white font-bold rounded-lg shadow-md transition duration-300 flex items-center group"
                                onClick={() => navigate("/upload")}
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
                                                src={member.profilePicture || 'dummy_profile.png'}
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
                            {/* {group.files.map(file => (
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
                            ))} */}
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
                        <div className="mb-4">
                            <label className="block text-white mb-2" htmlFor="addMembers">Add Members</label>
                            <Search data={users} onUserSelect={handleAddMember} />
                            <ul className="mt-2">
                                {newGroupMembers.map((member) => (
                                    <li key={member.id} className="text-white flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <img
                                            // ini nanti pas ada profile pic jangan lupa diganti
                                                src={member.profilePicture || 'dummy_profile.png'}
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
                        <Search data={users} onUserSelect={handleAddUserToShare} />
                        <ul className="mt-2">
                            {sharedWithUsers.map((user) => (
                                <li key={user.id} className="text-white flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <img
                                            // jangan lupa user.profilePicture
                                            src={user.profilePicture || 'dummy_profile.png'}
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