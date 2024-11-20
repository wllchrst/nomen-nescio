import React, { ReactNode } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

interface TemplateProps {
    children: ReactNode;
}

const Template = ({ children }: TemplateProps) => {
    return (
        <div className="overflow-hidden hide-scrollbar flex w-full min-h-screen bg-gradient-to-br from-[#0d1117] to-[#30363d]">
            <Sidebar />
            <div className="flex flex-col">
                <Navbar />
                <div className="">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Template;
