import React, { ReactNode } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

interface TemplateProps {
    children: ReactNode;
    className?: string;
}

const Template = ({ children, className }: TemplateProps) => {
    return (
        <div className={`overflow-hidden hide-scrollbar flex w-full min-h-screen bg-gradient-to-br from-[#0d1117] to-[#30363d] ${className}`}>
            <div className="">
                <Sidebar />
            </div>
            <div className="flex flex-col w-full">
                <Navbar />
                <div className="flex-grow">
                    {children}
                </div>
                <footer className="p-4 bg-gray-800 text-gray-400 text-center">
                    © 2023 Your Company. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default Template;
