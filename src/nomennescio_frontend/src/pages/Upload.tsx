import React, { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
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
import Alert from "../components/elements/alerts/alert";
import { GroupService } from "../service/group-service";
import { IGroupData } from "../interfaces/group-interface";
import { UserService } from "../service/user-service";
import { useNavigate } from "react-router-dom";

interface UploadedFile {
    file: File;
    progress: number;
    status: 'uploading' | 'completed';
}

const Upload = () => {
    const location = useLocation();
    let groupData = location.state?.groupData || null;
    const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
    const { user } = useUserContext();
    const [ description, setDescription ] = useState("")
    const [ message, setMessage ] = useState("")
    const [alert, setAlert] = useState<{ show: boolean, title: string, desc: string, type: "success" | "error" | "warning" | "info" }>({ show: false, title: "", desc: "", type: "info" });
    const [isClosing, setIsClosing] = useState(false);
    const selectedFilesRef = useRef<UploadedFile[]>(selectedFiles);
    const userRef = useRef<IUser | null>(user)
    const sendRef = useRef<IUser[]>([])
    const descRef = useRef(description)
    const userService = new UserService();
    const msgRef = useRef(message)
    const [groups, setGroups] = useState<IGroupData[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<IGroupData[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<IGroupData | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const groupService = new GroupService();

    const emailService = new EmailService()
    const navigate = useNavigate();
    // console.log("Data hasil navigate", groupData);

    useEffect(() => {
        selectedFilesRef.current = selectedFiles
    }, [selectedFiles])

    useEffect(() => {
        userRef.current = user
        descRef.current = description
        msgRef.current = message
    }, [user, description, message])

    useEffect(() => {
        const fetchGroupsAndUsers = async () => {
            if (!user) return;
            const groupResult = await groupService.getUserGroup(user.id.toString());
            // console.log("Group" , groupResult)
            const userResult = await userService.getAllUser();
            if (groupResult.success) {
                setGroups(groupResult.data);
                setFilteredGroups(groupResult.data);
            }
            setUsers(userResult);
            setFilteredUsers(userResult);
        };
        fetchGroupsAndUsers();
    }, [user]);

    useEffect(() => {
        const groupResults = groups.filter(group =>
            group.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredGroups(groupResults);

        const userResults = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(userResults);
    }, [searchTerm, groups, users]);

    const handleGroupSelect = (group: IGroupData) => {
        setSelectedGroup(group);
        const memberIds = group.members ? group.members.map(member => member.user_id) : [];
        sendRef.current = memberIds.map(id => ({ id } as IUser));
        // console.log("Selected group members' user IDs: ", memberIds);
        setFilteredGroups([group]);
    };

    useEffect(() => {
        if (groupData) {
            setSelectedGroup(groupData);
            // console.log("GROUP DATAAA", groupData)
            const memberIds = groupData.members ? groupData.members.map(member => member.user_id) : [];
            sendRef.current = memberIds.map(id => ({ id } as IUser));
            setFilteredGroups([groupData]);
            console.log("KWKEEKWKE")
        }
    }, [groupData]);

    useEffect(() => {
        if (groupData) {
            handleGroupSelect(groupData); 
        }
    }, [groupData]);
    
    const resetNavigateData = () => {
        navigate('/upload', { state: null });
    }
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('groupData');
            localStorage.removeItem('selectedFiles');
            localStorage.removeItem('description');
            localStorage.removeItem('message');
            resetNavigateData();
        };
      
        window.addEventListener('beforeunload', handleBeforeUnload);
      
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleUserClick = (user: IUser) => {
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
        if (!descRef.current || !msgRef.current || sendRef.current.length === 0 || selectedFilesRef.current.length === 0) {
            setAlert({ show: true, title: "Warning", desc: "All fields are required", type: "warning" });
            return;
        }

        try {
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

            const receivers = sendRef.current.filter(obj => obj.id !== userRef.current!.id).map(obj => obj.id);

            const emailData: ICreateEmailData = {
                title: descRef.current,
                description: msgRef.current,
                files: fileMapping,
                sender_id: parseInt(userService.getUserIdFromCookie()),
                receivers: receivers
            }
            // console.log(emailData);

            await emailService.createEmail(emailData);
            setAlert({ show: true, title: "Success", desc: "Email sent successfully", type: "success" });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            setAlert({ show: true, title: "Error", desc: "Failed to send email", type: "error" });
        }
    };

    const closeAlert = () => {
        setIsClosing(true);
        setTimeout(() => {
            setAlert({ ...alert, show: false });
            setIsClosing(false);
        }, 400);
    };

    const { startUploading } = useFileUpload(handleFilesUploaded);

    return (
        <Template>
            <div className="flex flex-col h-full p-10 text-gray-300 rounded-lg shadow-lg">
                <h1 className="text-gray-300 mb-8 text-6xl font-bold">New Mail</h1>
                <div className="flex flex-col space-y-4">
                    <SearchDropdown
                        data={groupData ? [groupData] : []}
                        searchForUser={true}
                        searchForGroup={true}
                        onUserClick={handleUserClick}
                        onGroupClick={handleGroupSelect}
                        className="p-4 rounded-lg border border-gray-600 bg-gray-800 text-white w-full"
                        users={filteredUsers}
                        groups={filteredGroups}
                        chosenGroups={selectedGroup ? [selectedGroup] : []}
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
                        <div className="w-full">
                            <UploadedFiles selectedFiles={selectedFiles} />
                        </div>
                    </div>
                    <button onClick={handleSendButton} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send</button>
                </div>
            </div>
            <Alert
                title={alert.title}
                desc={alert.desc}
                type={alert.type}
                showAlert={alert.show}
                closeAlert={closeAlert}
                isClosing={isClosing}
            />
        </Template>
    )
}

export default Upload;
