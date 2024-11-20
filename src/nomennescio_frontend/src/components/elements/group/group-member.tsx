import React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

interface Member {
    id: number;
    name: string;
    role: string;
    profilePicture: string;
}

interface GroupMembersProps {
    members: Member[];
    showMembers: boolean;
    toggleMembers: () => void;
    groupTitle: string; 
}

const GroupMembers: React.FC<GroupMembersProps> = ({ members, showMembers, toggleMembers, groupTitle }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2">{groupTitle}</h2>
            <div className="flex items-center mb-2">
                <div className="flex -space-x-2">
                    {members.map(member => (
                        <img 
                            key={member.id}
                            src={member.profilePicture || 'https://via.placeholder.com/50'} 
                            alt={`${member.name}'s profile`} 
                            className="w-12 h-12 rounded-full border-2 border-gray-800"
                        />
                    ))}
                </div>
                <div onClick={toggleMembers} className="text-white">
                    <AiFillCaretDown className="ml-2 text-gray-400" />
                </div>
            </div>
            <div className={`transition-all duration-300 ease-out ${showMembers ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <ul className="text-white">
                    {members.map(member => (
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
        </div>
    );
};

export default GroupMembers;