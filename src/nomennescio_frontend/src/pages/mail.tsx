import React, { useState } from 'react';
import Template from '../components/global/template';
import FileDownload from '../components/elements/files/file-download';

interface Email {
    id: number;
    sender: string;
    title: string;
    description: string;
    content: string;
    file_url: string;
}

const Mail: React.FC = () => {
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

    const emails: Email[] = [
        {
            id: 1,
            sender: 'John Doe',
            title: 'Meeting Reminder',
            description: "Don't forget about the meeting at 3 PM.",
            content: 'Hi, just a reminder about the meeting we have scheduled at 3 PM today. Please be on time.',
            file_url: 'https://example.com/file.pdf'
        },
        {
            id: 2,
            sender: 'Jane Smith',
            title: 'Project Update',
            description: 'The project is on track for completion.',
            content: 'Hello, the project is on track for completion by the end of the week. Great job everyone! Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus. ello, the project is on track for completion by the end of the week. Great job everyone! Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditatello, the project is on track for completion by the end of the week. Great job everyone! Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditatello, the project is on track for completion by the end of the week. Great job everyone! Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditatello, the project is on track for completion by the end of the week. Great job everyone! Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditate minus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ut illo nesciunt ea numquam, atque nisi dolorum, repudiandae explicabo suscipit harum ducimus labore velit doloribus expedita ad dolorem cupiditat',
            file_url: 'https://example.com/file.pdf'
        },
    ];

    return (
        <Template>
            <div className="flex w-full h-full p-6 bg-transparent">
                <div className="w-full p-6 rounded-lg h-full shadow-lg">
                    <div className="p-4 mb-6 rounded-lg shadow-md bg-gray-700">
                        <h1 className="text-white text-3xl">Inbox</h1>
                    </div>
                    <div className="flex h-full">
                        <div className="w-1/3 bg-gray-700 p-4 rounded-lg shadow-md mr-4 overflow-y-scroll max-h-[70vh] h-full">
                            <ul className="text-white">
                                {emails.map(email => (
                                    <li
                                        key={email.id}
                                        className="mb-4 hover:bg-gray-600 p-4 rounded border border-gray-500 cursor-pointer"
                                        onClick={() => setSelectedEmail(email)}
                                    >
                                        <div className="font-bold">{email.sender}</div>
                                        <div className="text-sm">{email.title}</div>
                                        <div className="text-xs text-gray-400">{email.description}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-2/3 bg-gray-700 p-6 rounded-lg shadow-md overflow-y-auto max-h-[70vh] h-full">
                            <div className="bg-gray-800 p-6 rounded-lg h-full shadow-inner overflow-y-auto">
                                {selectedEmail ? (
                                    <div className="h-full flex flex-col items-start overflow-y-auto">
                                        <h3 className="text-white text-xl">{selectedEmail.title}</h3>
                                        <p className="text-white mt-4">{selectedEmail.content}</p>
                                        <FileDownload className='m-4' fileUrl={selectedEmail.file_url} uploadedDate='123132' needPreview={false}></FileDownload>
                                    </div>
                                ) : (
                                    <p className="text-white">Select an email to read</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    );
};

export default Mail;
