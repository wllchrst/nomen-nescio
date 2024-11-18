import { Box, Button, Input, Text } from '@chakra-ui/react';
import Dropdown from '../components/elements/dropdowns/dropdown';
import DropdownValue from '../components/elements/dropdowns/dropdown-value';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import FileUpload from '../components/elements/files/file-upload';
import SearchDropdown from '../components/elements/search/search-dropdown';
import Navbar from '../components/global/navbar';
import FileDownload from '../components/elements/files/file-download';

const dummyData = [
    {
        id: 1,
        image: 'https://via.placeholder.com/50',
        name: 'John Doe',
        email: 'john.doe@example.com',
        link: 'profile/johndoe'
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/50',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        link: 'profile/johnsmith'
    },
    {
        id: 3,
        image: 'https://via.placeholder.com/50',
    name: 'Michael Brown',
        email: 'michael.brown@example.com',
        link: 'profile/mic  ael'
    },
    {
        id: 4,
        image: 'https://via.placeholder.com/50',
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        link: 'profile/emily'
    },
];

const Home = () => {
    return (
        <div
            className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700"
        >
                {/* <Dropdown text='Product'>
                    <DropdownValue text='new file' icon={<FaHome/>}></DropdownValue>
                    <DropdownValue text='new file'></DropdownValue>
                    <DropdownValue text='new file'></DropdownValue>
                </Dropdown>
            <SearchDropdown data={dummyData}></SearchDropdown> */}
            <Navbar></Navbar>
            {/* <FileUpload></FileUpload> */}
           
        </div>   

    );
};
`   `
export default Home;
    