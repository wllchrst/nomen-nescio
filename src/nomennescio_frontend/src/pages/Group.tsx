import React, { useState } from 'react';
import Template from '../components/global/template';
import FileDownload from '../components/elements/files/file-download';
import FilePreview from '../components/elements/files/file-preview';
import { AiFillCaretDown } from 'react-icons/ai';

const Group = () => {
    const [showMembers, setShowMembers] = useState<{ [key: string]: boolean }>({});
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const groups = [
        {
            id: 'dev-team',
            name: 'Development Team',
            description: 'A group for all development team members.',
            members: [
                { id: 1, name: 'William Christian', role: 'Owner', profilePicture: '' },
                { id: 2, name: 'Pibus', role: 'Admin', profilePicture: '' },
                { id: 3, name: 'Felix', role: 'Member', profilePicture: '' },
            ],
            files: [
                { fileUrl: 'src/nomennescio_frontend/src/uploads/coordinates.txt', uploadedDate: '2023-10-01' },
                { fileUrl: 'https://example.com/file2.docx', uploadedDate: '2023-10-02' },
            ],
        },
        {
            id: 'design-team',
            name: 'Design Team',
            description: 'A group for all design team members.',
            members: [
                { id: 4, name: 'Kolin', role: 'Owner', profilePicture: '' },
                { id: 5, name: 'Wohoo', role: 'Admin', profilePicture: '' },
                { id: 6, name: 'Marco Caper', role: 'Member', profilePicture: '' },
            ],
            files: [
                { fileUrl: 'src/nomennescio_frontend/src/uploads/Cheatsheet AI.pdf', uploadedDate: '2023-10-03' },
                { fileUrl: 'https://example.com/file4.mp4', uploadedDate: '2023-10-04' },
                { fileUrl: 'https://example.com/file3.jpg', uploadedDate: '2023-10-03' },
                { fileUrl: 'https://example.com/file4.mp4', uploadedDate: '2023-10-04' },
                { fileUrl: 'https://example.com/file3.jpg', uploadedDate: '2023-10-03' },
                { fileUrl: 'https://example.com/file4.mp4', uploadedDate: '2023-10-04' },
                { fileUrl: 'https://example.com/file3.jpg', uploadedDate: '2023-10-03' },
                { fileUrl: 'https://example.com/file4.mp4', uploadedDate: '2023-10-04' },
            ],
        },
    ];

    const toggleMembers = (groupId: string) => {
        setShowMembers(prevState => ({
            ...prevState,
            [groupId]: !prevState[groupId],
        }));
    };

    const handleFileClick = (fileUrl: string) => {
        setSelectedFile(fileUrl);
    };

    const closeModal = () => {
        setSelectedFile(null);
    };

    return (
        <Template>
            <div className="p-4">
                {groups.map(group => (
                    <div key={group.id} className="mb-4 bg-gray-800 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-2">{group.name}</h2>
                        <div className="flex items-center mb-2">
                            <div className="flex -space-x-2">
                                {group.members.map(member => (
                                    <img
                                        key={member.id}
                                        src={member.profilePicture || 'https://via.placeholder.com/50'}
                                        alt={`${member.name}'s profile`}
                                        className="w-12 h-12 rounded-full border-2 border-gray-800"
                                    />
                                ))}
                            </div>
                            <div onClick={() => toggleMembers(group.id)} className="text-white">
                                <AiFillCaretDown className="ml-2 text-gray-400" />
                            </div>
                        </div>
                        <div className={`transition-all duration-300 ease-out ${showMembers[group.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            <ul className="text-white">
                                {group.members.map(member => (
                                    <li key={member.id} className="mb-2 flex items-center">
                                        <div className="bg-gray-700 p-2 rounded-full mr-2">
                                            <img
                                                src={member.profilePicture || 'https://via.placeholder.com/50'}
                                                alt={`${member.name}'s profile`}
                                                className="w-12 h-12 rounded-full"
                                            />
                                        </div>
                                        <div>
                                            <span className="font-bold">{member.name}</span> - {member.role}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4">
                            {group.files.map(file => (
                                <div key={file.fileUrl} className="flex-grow cursor-pointer" onClick={() => handleFileClick(file.fileUrl)}>
                                    <FileDownload 
                                        fileUrl={file.fileUrl} 
                                        uploadedDate={file.uploadedDate} 
                                        className="w-full"
                                        needPreview={false}
                                        profileUrl={group.members.find(member => member.role === 'Owner')?.profilePicture}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {selectedFile && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={closeModal}>
                    <button onClick={closeModal} className="fixed top-4 right-4 text-white font-bold text-3xl z-50">
                        ×
                    </button>
                    <div className="bg-white rounded-lg shadow-lg w-10/12 md:w-2/3 lg:w-1/2 h-4/5 relative" onClick={(e) => e.stopPropagation()}>
                        <FilePreview fileUrl={selectedFile} fileName={selectedFile.split('/').pop() || 'Unnamed File'} fileExtension={selectedFile.split('.').pop()?.toLowerCase()} onDoubleClick={closeModal} />
                    </div>
                </div>
            )}
        </Template>
    );
};

export default Group;