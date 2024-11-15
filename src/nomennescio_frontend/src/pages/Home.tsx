import { Box, Button, Input, Text } from '@chakra-ui/react';
import Dropdown from '../components/elements/dropdowns/dropdown';
import DropdownValue from '../components/elements/dropdowns/dropdown-value';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import FileUpload from '../components/elements/files/file-upload';

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
        </div>

    );
};

export default Home;
