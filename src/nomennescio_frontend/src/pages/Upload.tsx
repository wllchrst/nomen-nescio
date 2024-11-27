import React, { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Template from "../components/global/template";
import FileUpload from "../components/elements/files/file-upload";
import UploadedFiles from "../components/elements/files/uploaded-files";
import SearchDropdown from "../components/elements/search/search-dropdown";
import { IUser } from "../interfaces/user-interface";
import { useFileUpload } from "../hooks/use-file-upload";
import { useUserContext } from "../context/user-context";
import { uploadFileFromUser } from "../service/file-service";
import { ICreateEmailData, IFileData } from "../interfaces/create-email";
import { EmailService } from "../service/email-service";
import { AiOutlineConsoleSql } from "react-icons/ai";

interface UploadedFile {
    file: File;
    progress: number;
    status: 'uploading' | 'completed';
}

const Upload = () => {
    const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
    const { user } = useUserContext();
    const [ description, setDescription ] = useState("")
    const [ message, setMessage ] = useState("")
    
    const selectedFilesRef = useRef<UploadedFile[]>(selectedFiles);
    const userRef = useRef<IUser | null>(user)
    const sendRef = useRef<IUser[]>([])
    const descRef = useRef(description)
    const msgRef = useRef(message)

    const emailService = new EmailService()

    useEffect(() => {
        selectedFilesRef.current = selectedFiles
    }, [selectedFiles])

    useEffect(() => {
        userRef.current = user
        descRef.current = description
        msgRef.current = message
    }, [user, description, message])

    const handleUserClick = (user: IUser) => {
        console.log("click")
        sendRef.current.push(user)
    };

    const handleFilesUploaded = (files: UploadedFile[]) => {
        setSelectedFiles(files);
    };

    const handleDescChange = (e:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const handleMsgChange = (e:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const handleSendButton = async () => {
        const filePaths: String[] = []

        for (const file of selectedFilesRef.current) {
            let path = await uploadFileFromUser(userRef.current!.id.toString(), file.file)
            filePaths.push(path)
        }

        const fileMapping: IFileData[] = []
        for(let i=0; i<selectedFilesRef.current.length; i++) {
            const obj: IFileData = {
                file_name: selectedFilesRef.current[i].file.name,
                file_path: filePaths[i] as string
            }
            fileMapping.push(obj)
        }

        const emailData: ICreateEmailData = {
            title: descRef.current,
            description: msgRef.current,
            files: fileMapping,
            sender_id: userRef.current!.id,
            receivers: sendRef.current.map(obj => obj.id)
        }

        await emailService.createEmail(emailData)
    }

    const { startUploading } = useFileUpload(handleFilesUploaded);

    return (
        <Template>
            <div className="flex flex-col h-full p-10 text-gray-300 rounded-lg shadow-lg">
                <h1 className="text-gray-300 mb-8 text-6xl font-bold">New Mail</h1>
                <div className="flex flex-col space-y-4">
                    <SearchDropdown
                        data={[]}
                        searchForUser={true}
                        onUserClick={handleUserClick}
                        className="p-4 rounded-lg border border-gray-600 bg-gray-800 text-white w-full"
                    />
                    <input
                        type="text"
                        placeholder="Subject"
                        className="p-4 rounded-lg border border-gray-600 bg-gray-800 text-white"
                        onChange={handleDescChange}
                    />
                    <textarea
                        placeholder="Message"
                        className="p-4 rounded-lg border border-gray-600 bg-gray-800 text-white h-40"
                        onChange={handleMsgChange}
                    />
                    <div className="flex space-x-4 w-full">
                        <div className="w-1/3">
                            <FileUpload startUploading={startUploading} />
                        </div>
                        <div className="">
                            <UploadedFiles selectedFiles={selectedFiles} />
                        </div>
                    </div>
                    <button onClick={handleSendButton} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send</button>
                </div>
            </div>
        </Template>
    )
}

export default Upload;