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
                    <a href="/" className="text-white  font-bold flex items-center hover:text-gray-300 mb-4">
                        <AiFillGithub className="w-8 h-8" />
                        <span className="ml-4 text-xl">Nomen Nescio</span>
                    </a>
                    <IconButton
                        icon={FaHome}
                        direction="right"
                        innerText="Home"
                        className="w-full justify-start"
                        to="/home"
                    />
                    <IconButton
                        icon={FaFolder}
                        direction="right"
                        innerText="My Drive"
                        className="w-full justify-start"
                        to="/storage"
                    />
                    <IconButton
                        icon={FaUsers}
                        direction="right"
                        innerText="Groups"
                        className="w-full justify-start"
                    />
                    <IconButton
                        icon={FaUpload}
                        direction="right"
                        innerText="Uploads"
                        className="w-full justify-start"
                    />
                    <IconButton
                        icon={FaCog}
                        direction="right"
                        innerText="Settings"
                        className="w-full justify-start"
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
