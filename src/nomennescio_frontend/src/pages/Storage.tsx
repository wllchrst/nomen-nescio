import React, { useState } from 'react';
import Navbar from '../components/global/navbar';
import FileUpload from '../components/elements/files/file-upload';
import FileDownload from '../components/elements/files/file-download';
import Sidebar from '../components/global/sidebar';

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
    { fileUrl: 'src/uploads/coordinates.txt', uploadedDate: '6 Oct 2012' }
];

const Storage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFiles = files.filter((file) =>
        file.fileUrl.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#0d1117] min-h-screen text-white w-full">
            <div className="w-full">
                <Navbar /> 
            </div>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Nanti ini nama Storage</h1>
                <p className="text-gray-400 mb-8">
                    Manage your files easily by dragging and dropping or uploading them here.
                </p>

                <FileUpload />

                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-4">Uploaded Files</h2>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for files..."
                        className="w-2/5 p-2 bg-[#161b22] border mb-2 border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
