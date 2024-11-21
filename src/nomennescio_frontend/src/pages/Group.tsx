import React, { useState } from 'react';
import Template from '../components/global/template';
import GroupMembers from '../components/elements/group/group-member';

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
        },
    ];

    const toggleMembers = (groupId: string) => {
        setShowMembers(prevState => ({
            ...prevState,
            [groupId]: !prevState[groupId],
        }));
    };

    return (
        <Template>
            <div className="p-4">
                {groups.map(group => (
                    <div key={group.id} className="mb-4">
                        <GroupMembers 
                            members={group.members} 
                            showMembers={showMembers[group.id] || false} 
                            toggleMembers={() => toggleMembers(group.id)} 
                            groupTitle={group.name} 
                        />
                    </div>
                ))}
            </div>
        </Template>
    );
};

export default Group;
