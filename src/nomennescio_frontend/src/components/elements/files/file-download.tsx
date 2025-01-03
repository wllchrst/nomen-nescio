import React, { useEffect, useRef, useState } from "react";
import {
  faFile,
  faFileImage,
  faFileVideo,
  faFilePdf,
  faFileWord,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownValue from "../dropdowns/dropdown-value";
import DeleteModal from "../modals/delete-modal";
import RenameModal from "../modals/rename-modal";
import FilePreview from "./file-preview";
import DrawableCanvas from "../canvas/drawable-canvas";
import {
  AiOutlineFile,
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useFileActions } from "../../../hooks/use-file-action";
import useProfileSource from "../../../hooks/use-get-profile-source";
import { IUser } from "../../../interfaces/user-interface";
import { getFileUrl } from "../../../service/file-service";
import { EmailService } from "../../../service/email-service";
import Alert from "../alerts/alert"; 

interface FileDownloadProps {
  fileUrl: string;
  uploadedDate: string;
  profileUrl?: string;
  needPreview?: boolean;
  onShare?: (fileUrl: string) => void;
  onRename?: (newName: string) => void;
  onDelete?: () => void;
  className?: string;
  fileName?: string;
  user: IUser
}

const FileDownload: React.FC<FileDownloadProps> = ({
  fileUrl,
  uploadedDate,
  profileUrl,
  onRename,
  onDelete,
  onShare,
  className,
  needPreview = true,
  user
}) => {
  const fileName = fileUrl.split(/[/\\]/).pop() || "Unnamed File";
  const fileExtension = fileName.split(".").pop()?.toLowerCase();

  const {
    isModalOpen,
    setIsModalOpen,
    contextMenu,
    isContextMenuVisible,
    setIsContextMenuVisible,
    handleDoubleClick,
    handleRightClick,
    handleCloseContextMenu,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isRenameModalOpen,
    setIsRenameModalOpen,
    isSignatureModalOpen,
    setIsSignatureModalOpen,
    handleOpenSignatureModal,
    handleConfirmSignature,
    handleOpenFile,
    handleDownloadFile,
    handleDelete,
    handleRename,
    signatureFile,
    setSignatureFile,
    alert,
    setAlert,
  } = useFileActions(fileUrl, fileName, onRename, onDelete);

  const [ fileNameA, setFileName ] = useState("")

  const userRef = useRef(user)
  const fileNameRef = useRef(fileName)

  useEffect(() => {
    if(!user) return
    userRef.current = user
  }, [user])

  // useEffect(() => {
  //   if(fileName.length == 0) return

  //   fileNameRef.current = fileNameA
  // }, [fileNameA])

  const getFileIcon = () => {
    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension || "")) {
      return (
        <FontAwesomeIcon icon={faFileImage} className="text-blue-400 mr-2" />
      );
    } else if (["mp4", "webm", "ogg"].includes(fileExtension || "")) {
      return (
        <FontAwesomeIcon icon={faFileVideo} className="text-red-400 mr-2" />
      );
    } else if (["pdf"].includes(fileExtension || "")) {
      return <FontAwesomeIcon icon={faFilePdf} className="text-red-600 mr-2" />;
    } else if (["doc", "docx"].includes(fileExtension || "")) {
      return (
        <FontAwesomeIcon icon={faFileWord} className="text-blue-600 mr-2" />
      );
    } else {
      return <FontAwesomeIcon icon={faFile} className="text-gray-400 mr-2" />;
    }
  };

  const renderModalContent = () => {
    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension || "")) {
      return (
        <img
          src={useProfileSource(fileUrl)}
          alt={fileName}
          className="w-full h-full object-contain rounded-md"
        />
      );
    } else if (["mp4", "webm", "ogg"].includes(fileExtension || "")) {
      return (
        <video controls className="w-full h-full rounded-md">
          <source src={fileUrl} type={`video/${fileExtension}`} />
          webnya gk support
        </video>
      );
    } else if (fileExtension === "pdf") {
      return (
        <iframe
          src={fileUrl}
          className="w-full h-full rounded-md"
          title="PDF Preview"
        ></iframe>
      );
    } else if (["doc", "docx"].includes(fileExtension || "")) {
      return (
        <iframe
          src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
            getFileUrl(fileNameRef.current)
          )}`}
          className="w-full h-full rounded-md"
          title="Word Document Preview"
        ></iframe>
      );
    } else if (["txt"].includes(fileExtension || "")) {
      return (
        <iframe
          src={fileUrl}
          className="w-full h-full rounded-md"
          title="Text File Preview"
        ></iframe>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <FontAwesomeIcon icon={faEyeSlash} size="3x" color="gray" />
        </div>
      );
    }
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleModalContainerClick = () => {
    setIsModalOpen(false);
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const containerClass = needPreview
    ? `bg-gray-900 text-white rounded-lg shadow-lg p-4 max-w-sm mx-auto relative transition-colors duration-300 hover:bg-gray-700 h-full ${className}`
    : `bg-gray-900 text-white rounded-lg shadow-lg p-4 w-96 h-10 mx-auto relative flex items-center transition-colors duration-300 hover:bg-gray-700 ${className}`;

  useEffect(() => {
    console.log(user)
  })

  return (
    <div
      className={containerClass}
      onContextMenu={handleRightClick}
      onDoubleClick={handleDoubleClick}
    >
      <div
        className={`flex ${
          needPreview ? "flex-col" : "flex-row"
        } items-center justify-between w-full`}
      >
        <div className="flex items-center">
          {getFileIcon()}
          <h3 className="text-sm font-medium truncate mr-2">{fileName}</h3>
        </div>
        {!needPreview && (
          <div className="flex items-center text-sm text-gray-400">
            {profileUrl ? (
              <img
                src={profileUrl}
                alt="Profile"
                className="h-7 rounded-full mr-2 m-0"
              />
            ) : (
              <img
                src="https://via.placeholder.com/50"
                alt="Placeholder"
                className=" h-7  rounded-full mr-2 m-0"
              />
            )}
          </div>
        )}
      </div>

      {needPreview && (
        <div className="my-4 cursor-pointer h-40">
          <FilePreview
            fileUrl={fileUrl}
            fileName={fileName}
            fileExtension={fileExtension}
            onDoubleClick={handleDoubleClick}
          />
        </div>
      )}

      {needPreview && (
        <div className="flex items-center text-sm text-gray-400">
          {profileUrl ? (
            <img
              src={profileUrl}
              alt="Profile"
              className="h-7 rounded-full mr-2 m-0"
            />
          ) : (
            <img
              src="https://via.placeholder.com/50"
              alt="Placeholder"
              className=" h-7  rounded-full mr-2 m-0"
            />
          )}
          <p className="truncate">Upload on • {uploadedDate}</p>
        </div>
      )}

      {isContextMenuVisible && (
        <div
          className="fixed p-2 z-50"
          style={{ top: contextMenu?.y, left: contextMenu?.x }}
          onMouseLeave={handleCloseContextMenu}
        >
          <div className="bg-gray-800 text-white rounded-md shadow-md w-40 p-2">
            <DropdownValue
              text="Open File"
              onClick={handleOpenFile}
              icon={<AiOutlineFile />}
            />
            <DropdownValue
              text="Download File"
              onClick={handleDownloadFile}
              icon={<AiOutlineDownload />}
            />
            {/* <DropdownValue text="Rename File" onClick={() => setIsRenameModalOpen(true)} icon={<AiOutlineEdit />} />
                        <DropdownValue text="Delete File" onClick={() => setIsDeleteModalOpen(true)} icon={<AiOutlineDelete />} /> */}
            <DropdownValue
              text="Share File"
              onClick={() => onShare?.(fileUrl)}
              icon={<AiOutlineShareAlt />}
            />
          </div>
        </div>
      )}

      {alert.show && (
        <Alert
          title={alert.title}
          desc={alert.desc}
          type={alert.type}
          showAlert={alert.show}
          closeAlert={closeAlert}
          isClosing={!alert.show}
        />
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40"
          onClick={handleModalContainerClick}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="fixed top-4 right-4 text-white font-bold text-3xl z-50"
          >
            ×
          </button>
          <div
            className="rounded-lg shadow-lg w-10/12 md:w-2/3 lg:w-1/2 h-4/5 relative overflow-auto modal-content"
            onClick={handleModalClick}
          >
            {renderModalContent()}
          </div>
        </div>
      )}
      {isSignatureModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40">
          <div className="bg-gray-700 rounded-lg shadow-lg w-10/12 md:w-2/3 lg:w-1/2 p-4">
            <h2 className="text-xl font-bold mb-4">
              Please Draw Your Signature
            </h2>
            <div className="mb-4">
              <DrawableCanvas
                text="Signature"
                width={500}
                height={200}
                setFile={setSignatureFile}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsSignatureModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSignature}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
      />
      <RenameModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        onRename={handleRename}
      />
    </div>
  );
};

export default FileDownload;
