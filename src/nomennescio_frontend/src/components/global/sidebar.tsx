import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { FaHome, FaUsers, FaCog, FaFolder, FaUpload, FaTrash } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import IconButton from '../elements/buttons/icon-button';

const Sidebar: React.FC = () => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(240);

    const startResizing = useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []); 

    const resize = useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing && sidebarRef.current) {
                const newWidth = mouseMoveEvent.clientX - sidebarRef.current.getBoundingClientRect().left;

                const MIN_WIDTH = 160;
                const MAX_WIDTH = 300;

                if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
                    setSidebarWidth(newWidth);
                }
            }
        },
        [isResizing]
    );

    useEffect(() => {
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResizing);
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [resize, stopResizing]);

    useEffect(() => {
        document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidth}px`);
    }, [sidebarWidth]);

    return (
        <div
            ref={sidebarRef}
            className="relative h-full bg-gray-900"
            style={{ width: sidebarWidth }}
        >
            <Grid
                className="h-full w-full text-white p-4"
            >
                <GridItem className="w-full">
                    <a href="/" className="text-white m-0 p-0 -translate-x-6 font-bold flex items-center hover:text-gray-300 mb-2">
                        <img src="public/nomen-nescio-logo.png" className='w-40 h-20 object-cover p-0 invert m-0' alt="" />
                    </a>
                    <IconButton
                        icon={FaHome}
                        direction="right"
                        innerText="Home"
                        className="w-full justify-start"
                        to="/"
                    />
                    <IconButton
                        icon={FaFolder}
                        direction="right"
                        innerText="Mail"
                        className="w-full justify-start"
                        to="/mail"
                    />
                    <IconButton
                        icon={FaUsers}
                        direction="right"
                        innerText="Groups"
                        className="w-full justify-start"
                        to='/group'
                    />
                    <IconButton
                        icon={FaCog}
                        direction="right"
                        innerText="Settings"
                        className="w-full justify-start"
                        to='/setting'
                    />
                </GridItem>
                <div
                    className="absolute top-0 right-0 h-full w-2"
                    style={{ cursor: 'ew-resize' }}
                    onMouseDown={startResizing}
                ></div>
            </Grid>
        </div>
    );
};

export default Sidebar;
