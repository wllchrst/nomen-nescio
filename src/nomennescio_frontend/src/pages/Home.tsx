import { Box, Button, Input, Text } from '@chakra-ui/react';
import Dropdown from '../components/elements/dropdowns/dropdown';
import DropdownValue from '../components/elements/dropdowns/dropdown-value';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import FileUpload from '../components/elements/files/file-upload';
import SearchDropdown from '../components/elements/search/search-dropdown';

const dummyData = [
    {
        id: 1,
        image: 'https://via.placeholder.com/50',
        name: 'John Doe',
        email: 'john.doe@example.com',
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/50',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
    },
    {
        id: 3,
        image: 'https://via.placeholder.com/50',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
    },
    {
        id: 4,
        image: 'https://via.placeholder.com/50',
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
    },
];

const Home = () => {
    return (
        <div
            className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700"
        >
            <Dropdown text='Product'>
                <DropdownValue text='new file' icon={<FaHome/>}></DropdownValue>
                <DropdownValue text='new file'></DropdownValue>
                <DropdownValue text='new file'></DropdownValue>
            </Dropdown>
            <FileUpload></FileUpload>
            <SearchDropdown data={dummyData}></SearchDropdown>
        </div>

    );
};

export default Home;
    