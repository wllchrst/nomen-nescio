import React from 'react';
import { FaHome, FaFileAlt, FaCog } from 'react-icons/fa';
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
    ];

    return (
        <nav className="bg-[#0d1117] border-gray-800 px-8 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-8">
                <a href="/" className="text-white text-4xl font-bold flex items-center hover:text-gray-300">
                    <AiFillGithub className="w-10 h-10 mr-2" />
                </a>

                <div className="flex items-center space-x-6">
                    <Dropdown text="Product">
                        <DropdownValue text="New File" icon={<FaHome />} />
                        <DropdownValue text="Open File" />
                        <DropdownValue text="Save File" />
                    </Dropdown>

                    <Dropdown text="Documents">
                        <DropdownValue text="Reports" icon={<FaFileAlt />} />
                        <DropdownValue text="Invoices" />
                        <DropdownValue text="Contracts" />
                    </Dropdown>

                    <Dropdown text="Settings">
                        <DropdownValue text="Profile" icon={<FaCog />} />
                        <DropdownValue text="Preferences" />
                        <DropdownValue text="Log Out" />
                    </Dropdown>
                </div>
            </div>

            <div className="flex items-center space-x-8">
                <div className="w-80">
                    <SearchDropdown data={dummyData} />
                </div>

                <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-white focus:outline-none">
                        <AiOutlineBell className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-white focus:outline-none">
                        <AiOutlineUser className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
