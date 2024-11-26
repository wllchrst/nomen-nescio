import React, { useContext, useState } from "react";
import Template from "../components/global/template";
import FileUpload from "../components/elements/files/file-upload";
import UploadedFiles from "../components/elements/files/uploaded-files";
import SearchDropdown from "../components/elements/search/search-dropdown";
import { IUser } from "../interfaces/user-interface";
import { useFileUpload } from "../hooks/use-file-upload";
import { useUserContext } from "../context/user-context";
import { uploadFileFromUser } from "../service/file-service";

interface UploadedFile {
    file: File;
    progress: number;
    status: 'uploading' | 'completed';
}

const Upload = () => {
    const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
    const { user } = useUserContext();

    const handleUserClick = (user: IUser) => {
        console.log(user);
    };

    const handleFilesUploaded = (files: UploadedFile[]) => {
        setSelectedFiles(files);
    };

    const handleSendButton = async () => {
        for(const file of selectedFiles) {
            let path = await uploadFileFromUser(user!.id.toString(), file.file)
            console.log(path)
        }
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
                    />
                    <textarea
                        placeholder="Message"
                        className="p-4 rounded-lg border border-gray-600 bg-gray-800 text-white h-40"
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