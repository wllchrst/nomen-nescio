import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { FaHome, FaUsers, FaCog, FaFolder, FaUpload, FaTrash } from 'react-icons/fa';
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

    return (
        <div
            ref={sidebarRef}
            className="relative h-full"
            style={{ width: sidebarWidth }}
        >
            <Grid
                className="h-full bg-gray-900 text-white p-4"
                templateColumns="repeat(2, 1fr)"
            >
                <GridItem className="w-full">
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
                        icon={FaTrash}
                        direction="right"
                        innerText="Trash"
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
