import React from 'react';
import Navbar from '../components/global/navbar';
import FileUpload from '../components/elements/files/file-upload';

const Storage: React.FC = () => {
    return (
        <div className="bg-[#0d1117] min-h-screen text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Nanti ini nama Storage</h1>
                <p className="text-gray-400 mb-8">
                    Manage your files easily by dragging and dropping or uploading them here.
                </p>

                <FileUpload />

                <div className="mt-10">
                    // ini masih static layout doang nanti di update 
                    <h2 className="text-2xl font-semibold mb-4">Uploaded Files</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-800 p-4 rounded-md shadow-md">
                            <h3 className="text-lg truncate">Document1.pdf</h3>
                            <p className="text-sm text-gray-400">Uploaded 2 days ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Storage;
