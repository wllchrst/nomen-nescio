import React, { useState } from 'react';
import Navbar from '../components/global/navbar';
import FileUpload from '../components/elements/files/file-upload';
import FileDownload from '../components/elements/files/file-download';
import Sidebar from '../components/global/sidebar';
import Dropdown from '../components/elements/dropdowns/dropdown';
import DropdownValue from '../components/elements/dropdowns/dropdown-value';

const files = [
    { fileUrl: 'src/uploads/C.cpp', uploadedDate: '6 Oct 2024' },
    { fileUrl: 'src/uploads/nomen_nescio_logo.png', uploadedDate: '6 Oct 2024' },
    { fileUrl: 'src/uploads/Cheatsheet AI.pdf', uploadedDate: '6 Oct 2024' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' },
];

const fileTypes = ['All', 'Images', 'Documents', 'Code'];

const Storage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');

    const filteredFiles = files.filter((file) => {
        const matchesSearchQuery = file.fileUrl.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'All' || 
            (selectedType === 'Images' && file.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i)) ||
            (selectedType === 'Documents' && file.fileUrl.match(/\.(pdf|doc|docx|txt)$/i)) ||
            (selectedType === 'Code' && file.fileUrl.match(/\.(cpp|js|ts|py|java)$/i));
        return matchesSearchQuery && matchesType;
    });

    return (
        <div className="bg-[#0d1117] min-h-screen flex w-full text-white">
            <div className=''>
                <Sidebar />
            </div>
            <div className="flex flex-col flex-grow w-2/3">
                <Navbar />

                <div className="container mx-auto px-6 py-8"> 
                    <div className="mt-2 flex justify-between items-center">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for files..."
                            className="w-2/5 p-2 bg-[#161b22] border mb-2 border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Dropdown
                            text={selectedType}
                            onChange={(value) => setSelectedType(value)}
                            className="w-1/16 p-2 z-50 bg-[#161b22] border mb-2 border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {fileTypes.map((type) => (
                                <DropdownValue key={type} text={type} onClick={() => setSelectedType(type)} />
                            ))}
                        </Dropdown>
                    </div>
                    <div className="mt-5 mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredFiles.length > 0 ? (
                                filteredFiles.map((file, index) => (
                                    <div key={index} className="bg-gray-800 rounded-md shadow-md">
                                        <FileDownload fileUrl={file.fileUrl} uploadedDate={file.uploadedDate} />
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full text-center">No files found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Storage;
