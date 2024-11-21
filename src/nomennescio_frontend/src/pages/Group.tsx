import React, { useState } from 'react';
import Template from '../components/global/template';
import GroupMembers from '../components/elements/group/group-member';
import FileDownload from '../components/elements/files/file-download';

const Group = () => {
    const [showMembers, setShowMembers] = useState<{ [key: string]: boolean }>({});

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
                { fileUrl: 'https://example.com/file1.pdf', uploadedDate: '2023-10-01' },
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

    const handleNewFile = () => {
        // Logic for creating a new file
        console.log('New file created');
    };

    const handleFileDownload = () => {
        // Logic for downloading a file
        console.log('File downloaded');
    };

    return (
        <Template>
            <div className="p-4">
                <div className="mb-4">
                    <button onClick={handleNewFile} className="mr-2 p-2 bg-blue-500 text-white rounded">New File</button>
                    <button onClick={handleFileDownload} className="p-2 bg-green-500 text-white rounded">Download File</button>
                </div>
                {groups.map(group => (
                    <div key={group.id} className="mb-4">
                        <GroupMembers 
                            members={group.members} 
                            showMembers={showMembers[group.id] || false} 
                            toggleMembers={() => toggleMembers(group.id)} 
                            groupTitle={group.name} 
                            files={group.files}
                        />
                    </div>
                ))}
            </div>
        </Template>
    );
};

export default Group;
