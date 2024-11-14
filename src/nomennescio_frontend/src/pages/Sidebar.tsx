import React, { useState } from 'react';
import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import { FaBars, FaTimes, FaHome, FaBook, FaExclamationCircle, FaCodeBranch } from 'react-icons/fa';
import IconButton from '../components/elements/buttons/icon-button';
import { CloseIcon } from '@chakra-ui/icons';
import PrimaryButton from '../components/elements/buttons/primary-button';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="absolute">
            <Button
                onClick={toggleSidebar}
                bg="gray.800"
                color="white"
                _hover={{ bg: 'gray.700' }}
                className="p-2 m-2"
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </Button>

            <Grid
                className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } w-64 p-4`}
                templateColumns={'repeat(2, 1fr)'}
            >
                <GridItem>
                    <IconButton
                        icon={FaHome}
                        direction="right"
                        innerText="Home"
                    />
                    <IconButton
                        icon={FaBook}
                        direction="right"
                        innerText="Repositories"
                    />
                    <IconButton
                        icon={FaExclamationCircle}
                        direction="right"
                        innerText="Issues"
                    />
                    <IconButton
                        icon={FaCodeBranch}
                        direction="right"
                        innerText="Pull Requests"
                    />
                </GridItem>
                <GridItem>
                    <IconButton
                        icon={FaTimes}
                        onClick={toggleSidebar}
                    />
                </GridItem>
            </Grid>
        </div>
    );
};

export default Sidebar;