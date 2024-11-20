import React, { ReactNode } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

interface TemplateProps {
    children: ReactNode;
}

const Template = ({ children }: TemplateProps) => {
    return (
        <div className='flex w-full min-h-screen bg-gradient-to-br from-[#0d1117] to-[#30363d]'>
            <div className="">
                <Sidebar />
            </div>
            <div className="container">
                <Navbar />
                <div className="container mx-auto px-6 py-8 max-h-96 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Template;
