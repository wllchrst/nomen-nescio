import React, { useEffect, useState } from 'react';
import Template from '../components/global/template';
import FileDownload from '../components/elements/files/file-download';
import { EmailService } from '../service/email-service';
import { useUserContext } from '../context/user-context';
import { IEmail } from '../interfaces/email-interface';
import { IFileData } from '../interfaces/create-email';

const emailService = new EmailService()

interface EmailWithFiles {
    email: IEmail,
    files: IFileData[]
}

const Mail: React.FC = () => {
    const [emails, setEmails] = useState<EmailWithFiles[]>([])
    const [selectedEmail, setSelectedEmail] = useState<EmailWithFiles | null>(null);
    const { user } = useUserContext()

    useEffect(() => {
        if (!user) return

        const wait = async () => {
            const results: EmailWithFiles[] = []

            let fetch = await emailService.getUserEmail(user!.id.toString())
            for (const f of fetch) {
                let emailDetails = await emailService.getEmailDetail(f.id.toString())
                let file: object[] = emailDetails[2] as object[]
                console.log(file)
                results.push({
                    email: f,
                    files: file.map(({ file_name, file_path }) => ({ file_name, file_path }))
                })
            }

            if (results.length > 0) {
                setSelectedEmail(results[0])
            }
            setEmails(results)
        }
        wait()
    }, [user])

    useEffect(() => {
        console.log("Selected email: ")
        console.log(selectedEmail)
    }, [selectedEmail])

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
                                        key={email.email.id}
                                        className="mb-4 hover:bg-gray-600 p-4 rounded border border-gray-500 cursor-pointer"
                                        onClick={() => { setSelectedEmail(email) }}
                                    >
                                        <div className="font-bold">{email.email.sender}</div>
                                        <div className="text-sm">{email.email.title}</div>
                                        <div className="text-xs text-gray-400">{email.email.description}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-2/3 bg-gray-700 p-6 rounded-lg shadow-md overflow-y-auto max-h-[70vh] h-full">
                            <div className="bg-gray-800 p-6 rounded-lg h-full shadow-inner overflow-y-auto">
                                {selectedEmail ? (
                                    <div className="h-full flex flex-col items-start overflow-y-auto">
                                        <h3 className="text-white text-xl">Title {selectedEmail.email.title}</h3>
                                        <p className="text-white mt-4">Content {selectedEmail.email.description}</p>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            {selectedEmail.files.map((file, index) => (
                                                <FileDownload
                                                    key={index}
                                                    className='w-80'
                                                    fileUrl={file.file_path}
                                                    uploadedDate='123132'
                                                    needPreview={false}
                                                />
                                            ))}
                                        </div>
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