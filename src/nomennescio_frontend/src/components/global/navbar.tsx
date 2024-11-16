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

    const filesDropdown = [
        { id: 6, name: 'My Files', icon: <FaFolderOpen />, link: '/storage' },
        { id: 7, name: 'Shared with Me', icon: <FaShareAlt />, link: '#' },
        { id: 8, name: 'Recent Files', icon: <FaFolderOpen />, link: '#' },
    ];

    const groupsDropdown = [
        { id: 9, name: 'My Groups', icon: <FaUsers />, link: '#' },
        { id: 10, name: 'Create New Group', icon: <FaPlus />, link: '#' },
        { id: 11, name: 'Join a Group', icon: <FaUsers />, link: '#' },
    ];

    const uploadDropdown = [
        { id: 12, name: 'Upload File', icon: <FaCloudUploadAlt />, link: '#' },
        { id: 13, name: 'Upload Folder', icon: <FaCloudUploadAlt />, link: '#' },
        { id: 14, name: 'Upload Settings', icon: <FaCog />, link: '#' },
    ];

    const messagesDropdown = [
        { id: 15, name: 'Inbox', icon: <FaEnvelope />, link: '#' },
        { id: 16, name: 'Sent Messages', icon: <FaEnvelope />, link: '#' },
        { id: 17, name: 'Archived', icon: <FaClipboardList />, link: '#' },
    ];

    const settingsDropdown = [
        { id: 18, name: 'Account Settings', icon: <FaCog />, link: '#' },
        { id: 19, name: 'Privacy Settings', icon: <FaCog />, link: '#' },
        { id: 20, name: 'Notification Settings', icon: <FaBell />, link: '#' },
    ];

    const dropdownData = [
        ...filesDropdown,
        ...groupsDropdown,
        ...uploadDropdown,
        ...messagesDropdown,
        ...settingsDropdown,
    ];

    const searchData = [...dummyData, ...dropdownData.map((item) => ({ ...item, email: '' }))];

    return (
        <nav className="bg-[#0d1117] border-gray-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <a href="/" className="text-white text-2xl font-bold flex items-center hover:text-gray-300">
                    <AiFillGithub className="w-8 h-8" />
                </a>

                <div className="flex items-center space-x-4">
                    <Dropdown text="FILES">
                        {filesDropdown.map((item) => (
                            <DropdownValue key={item.id} text={item.name} icon={item.icon} to={item.link} />
                        ))}
                    </Dropdown>

                    <Dropdown text="GROUPS">
                        {groupsDropdown.map((item) => (
                            <DropdownValue key={item.id} text={item.name} icon={item.icon} />
                        ))}
                    </Dropdown>

                    <Dropdown text="UPLOAD">
                        {uploadDropdown.map((item) => (
                            <DropdownValue key={item.id} text={item.name} icon={item.icon} />
                        ))}
                    </Dropdown>

                    <Dropdown text="MESSAGES">
                        {messagesDropdown.map((item) => (
                            <DropdownValue key={item.id} text={item.name} icon={item.icon} />
                        ))}
                    </Dropdown>

                    <Dropdown text="SETTINGS">
                        {settingsDropdown.map((item) => (
                            <DropdownValue key={item.id} text={item.name} icon={item.icon} />
                        ))}
                    </Dropdown>
                </div>
            </div>

            <div className="flex items-center space-x-3">
                <div className="">
                    <SearchDropdown data={searchData} />
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
