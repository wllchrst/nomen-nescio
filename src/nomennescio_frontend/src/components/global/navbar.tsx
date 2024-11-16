import React from 'react';
import { FaFolderOpen, FaShareAlt, FaUsers, FaPlus, FaSignOutAlt, FaCog, FaBell, FaUserCircle, FaEnvelope, FaCloudUploadAlt, FaClipboardList } from 'react-icons/fa';
import { AiOutlineBell, AiOutlineUser, AiFillGithub } from 'react-icons/ai';
import Dropdown from '../elements/dropdowns/dropdown';
import DropdownValue from '../elements/dropdowns/dropdown-value';
import SearchDropdown from '../elements/search/search-dropdown';

const Navbar: React.FC = () => {
    const dummyData = [
        {
            id: 1,
            image: 'https://via.placeholder.com/50',
            name: 'John Doe',
            email: 'john.doe@example.com',
            link: '/profile/johndoe',
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/50',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            link: '/profile/janesmith',
        },
        {
            id: 3,
            image: 'https://via.placeholder.com/50',
            name: 'Michael Johnson',
            email: 'michael.johnson@example.com',
            link: '/profile/michaeljohnson',
        },
        {
            id: 4,
            image: 'https://via.placeholder.com/50',
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            link: '/profile/emilydavis',
        },
        {
            id: 5,
            image: 'https://via.placeholder.com/50',
            name: 'William Brown',
            email: 'william.brown@example.com',
            link: '/profile/williambrown',
        },
    ];

    return (
        <nav className="bg-[#0d1117] border-gray-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <a href="/" className="text-white text-2xl font-bold flex items-center hover:text-gray-300">
                    <AiFillGithub className="w-8 h-8" />
                </a>

                <div className="flex items-center space-x-4">
                    <Dropdown text="FILES">
                        <DropdownValue text="My Files" icon={<FaFolderOpen />} />
                        <DropdownValue text="Shared with Me" icon={<FaShareAlt />} />
                        <DropdownValue text="Recent Files" icon={<FaFolderOpen />} />
                    </Dropdown>

                    <Dropdown text="GROUPS">
                        <DropdownValue text="My Groups" icon={<FaUsers />} />
                        <DropdownValue text="Create New Group" icon={<FaPlus />} />
                        <DropdownValue text="Join a Group" icon={<FaUsers />} />
                    </Dropdown>

                    <Dropdown text="UPLOAD">
                        <DropdownValue text="Upload File" icon={<FaCloudUploadAlt />} />
                        <DropdownValue text="Upload Folder" icon={<FaCloudUploadAlt />} />
                        <DropdownValue text="Upload Settings" icon={<FaCog />} />
                    </Dropdown>

                    <Dropdown text="MESSAGES">
                        <DropdownValue text="Inbox" icon={<FaEnvelope />} />
                        <DropdownValue text="Sent Messages" icon={<FaEnvelope />} />
                        <DropdownValue text="Archived" icon={<FaClipboardList />} />
                    </Dropdown>

                    <Dropdown text="SETTINGS">
                        <DropdownValue text="Account Settings" icon={<FaCog />} />
                        <DropdownValue text="Privacy Settings" icon={<FaCog />} />
                        <DropdownValue text="Notification Settings" icon={<FaBell />} />
                    </Dropdown>
                </div>
            </div>

            <div className="flex items-center space-x-3">
                <div className="">
                    <SearchDropdown data={dummyData} />
                </div>

                <div className="flex items-center space-x-2">
                    <Dropdown text="" icon={<AiOutlineBell className="w-5 h-5 text-gray-400 hover:text-white" />}>
                        <DropdownValue text="Notification 1" icon={<FaBell />} />
                        <DropdownValue text="Notification 2" icon={<FaBell />} />
                        <DropdownValue text="Notification 3" icon={<FaBell />} />
                    </Dropdown>

                    <Dropdown text="" icon={<AiOutlineUser className="w-5 h-5 text-gray-400 hover:text-white" />}>
                        <DropdownValue text="Profile" icon={<FaUserCircle />} />
                        <DropdownValue text="Settings" icon={<FaCog />} />
                        <DropdownValue text="Log Out" icon={<FaSignOutAlt />} />
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
