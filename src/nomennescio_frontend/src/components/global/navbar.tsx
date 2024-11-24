import React, { useState } from 'react';
import { FaFolderOpen, FaShareAlt, FaUsers, FaPlus, FaSignOutAlt, FaCog, FaBell, FaUserCircle, FaEnvelope, FaCloudUploadAlt, FaClipboardList } from 'react-icons/fa';
import { AiOutlineBell, AiOutlineUser, AiFillGithub } from 'react-icons/ai';
import Dropdown from '../elements/dropdowns/dropdown';
import DropdownValue from '../elements/dropdowns/dropdown-value';
import SearchDropdown from '../elements/search/search-dropdown';
import Sidebar from '../global/sidebar'; 

const Navbar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const dummyData = [
        { id: 1, image: 'https://via.placeholder.com/50', name: 'John Doe', email: 'john.doe@example.com', link: '/profile/johndoe' },
        { id: 2, image: 'https://via.placeholder.com/50', name: 'Jane Smith', email: 'jane.smith@example.com', link: '/profile/janesmith' },
        { id: 3, image: 'https://via.placeholder.com/50', name: 'Michael Johnson', email: 'michael.johnson@example.com', link: '/profile/michaeljohnson' },
        { id: 4, image: 'https://via.placeholder.com/50', name: 'Emily Davis', email: 'emily.davis@example.com', link: '/profile/emilydavis' },
        { id: 5, image: 'https://via.placeholder.com/50', name: 'William Brown', email: 'william.brown@example.com', link: '/profile/williambrown' },
    ];

    const filesDropdown = [
        { id: 6, name: 'My Files', icon: <FaFolderOpen />, link: '/storage' },
        { id: 7, name: 'Share File', icon: <FaShareAlt />, link: '#' },
        { id: 8, name: 'Upload File', icon: <FaCloudUploadAlt />, link: '/upload' },
    ];

    const groupsDropdown = [
        { id: 10, name: 'My Groups', icon: <FaUsers />, link: '#' },
        { id: 11, name: 'Create New Group', icon: <FaPlus />, link: '#' },
        { id: 12, name: 'Join a Group', icon: <FaUsers />, link: '#' },
    ];

    const dropdownData = [
        ...filesDropdown,
        ...groupsDropdown,
    ];

    const searchData = [...dummyData, ...dropdownData.map((item) => ({ ...item, email: '' }))];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        const results = data.filter(
            (item) =>
                (item.name && item.name.toLowerCase().includes(value.toLowerCase())) ||
                (item.email && item.email.toLowerCase().includes(value.toLowerCase())) ||
                (item.title && item.title.toLowerCase().includes(value.toLowerCase()))
        );
        setFilteredResults(results);
    };

    return (
        <nav className="bg-transparent w-full z-50 border-gray-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4 z-50">
                {/* Removed GitHub logo */}
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

                {/* <Dropdown text="UPLOAD">
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
                </Dropdown> */}
            </div>

            <div className="flex items-center space-x-3 z-50">
                <div>
                    <SearchDropdown data={searchData} />
                </div>

                <div className="flex items-center space-x-2">
                    <Dropdown text="" icon={<AiOutlineBell className="w-5 h-5 text-gray-400 hover:text-white" />}>
                        <DropdownValue text="Notification 1" icon={<FaBell />} />
                        <DropdownValue text="Notification 2" icon={<FaBell />} />
                        <DropdownValue text="Notification 3" icon={<FaBell />} />
                    </Dropdown>

                <Dropdown text="" image="https://via.placeholder.com/50">
                        <DropdownValue text="Profile" icon={<FaUserCircle />} />
                        <DropdownValue text="Settings" icon={<FaCog />} to='/Setting'/>
                        <DropdownValue text="Log Out" icon={<FaSignOutAlt />} />
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
