import React, { useEffect, useState } from 'react';
import Template from '../components/global/template';
import FileDownload from '../components/elements/files/file-download';
import { EmailService } from '../service/email-service';
import { useUserContext } from '../context/user-context';
import { IEmail } from '../interfaces/email-interface';

const emailService = new EmailService()

const Mail: React.FC = () => {
    const [emails, setEmails] = useState<IEmail[]>([])
    const [selectedEmail, setSelectedEmail] = useState<IEmail | null>(null);
    const { user } = useUserContext()

    useEffect(() => {
        const wait = async() => {
            let fetch = await emailService.getEmail(user!.id.toString())
            setEmails(fetch)
        }
        wait()
    }, [user])
    
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
