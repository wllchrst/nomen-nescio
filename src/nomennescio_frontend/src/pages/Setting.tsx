import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import DrawableCanvas from "../components/elements/canvas/drawable-canvas";
import Modal from "../components/elements/modals/modal";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";
import useGetCurrentUser from "../hooks/use-get-current-user";
import { UserService } from "../service/user-service";
import Alert from "../components/elements/alerts/alert";
import { uploadFileFromUser } from "../service/file-service";
import { IRegister } from "../interfaces/register-interface";
import { useUserContext } from "../context/user-context";

const tabs = ["Profile", "Signature", "General"];

const Setting: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Profile");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [isProfilePicModalOpen, setIsProfilePicModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const userService = new UserService();
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    desc: "",
    type: "info" as "success" | "error" | "warning" | "info",
  });
  const [isAlertClosing, setIsAlertClosing] = useState(false);
  const currentUser = useGetCurrentUser();
  const { user } = useUserContext();

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfilePic(file);
    }
  };

  const handleOpenCropModal = () => {
    setProfilePic(null);
    setIsProfilePicModalOpen(true);
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropConfirm = async () => {
    if (profilePic && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(profilePic),
        croppedAreaPixels
      );
      setCroppedImage(croppedImage);
      setIsProfilePicModalOpen(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;

    if (
      name === currentUser.name &&
      email === currentUser.email &&
      !croppedImage
    ) {
      setAlertConfig({
        title: "Warning",
        desc: "No changes detected",
        type: "warning",
      });
      setShowAlert(true);
      return;
    }

    if (profilePic == null) return;

    const result = await uploadFileFromUser(
      userService.getUserIdFromCookie(),
      profilePic
    );

    const updatedUser: IRegister = {
      email: email || currentUser.email,
      name: name || currentUser.name,
      password: currentUser.password,
      signature_file_path: currentUser.signature_file_path,
      profile_picture_path: result,
      secret_key: currentUser.secret_key,
    };

    console.log(
      "UPDATEEEEEEEEEEEEEEEEEEEEEEEEEE",
      updatedUser,
      "USER ID ",
      userService.getUserIdFromCookie()
    );
    try {
      await userService.updateUser(
        updatedUser,
        parseInt(userService.getUserIdFromCookie())
      );
      setAlertConfig({
        title: "Success",
        desc: "Profile updated successfully",
        type: "success",
      });
      setShowAlert(true);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setAlertConfig({
        title: "Error",
        desc: "Failed to update profile",
        type: "error",
      });
      setShowAlert(true);
      console.error("Failed to update profile:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const closeAlert = () => {
    setIsAlertClosing(true);
    setTimeout(() => {
      setShowAlert(false);
      setIsAlertClosing(false);
    }, 300);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "Profile":
        return (
          <div className="w-full">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Profile Settings
            </h2>
            <div className="mb-4 flex flex-col items-center rounded-full">
              {croppedImage ? (
                <img
                  src={croppedImage}
                  alt="Profile"
                  className="w-48 h-48 rounded-full mb-4 object-cover"
                />
              ) : (
                <div className="rounded-full mb-4 flex items-center justify-center text-gray-400">
                  <img
                    src={user?.profile_picture_path}
                    alt=""
                    className="rounded-full"
                  />
                </div>
              )}
              <button
                className="w-48 p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleOpenCropModal}
              >
                Change Profile Picture
              </button>
            </div>
            <div className="flex flex-col justify-center w-full">
                <div className="mb-4">
                  <label className="block text-white mb-2">Username</label>
                  <input
                    type="text"
                    placeholder={currentUser?.name}
                    value={currentUser?.name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    placeholder={currentUser?.email}
                    value={currentUser?.email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleSaveProfile}
                    className="w-full p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
              </div>
            </div>
          </div>
        );
      case "Signature":
        return (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Signature
            </h2>
            <DrawableCanvas
              text="Signature"
              width={500}
              height={200}
              setFile={setSignatureFile}
            />
          </div>
        );
      case "General":
        return (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              General Settings
            </h2>
            <div className="mb-4">
              <label className="block text-white mb-2">General Setting 1</label>
              <input
                type="text"
                className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">General Setting 2</label>
              <input
                type="text"
                className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex">
      <Alert
        title={alertConfig.title}
        desc={alertConfig.desc}
        type={alertConfig.type}
        showAlert={showAlert}
        closeAlert={closeAlert}
        isClosing={isAlertClosing}
      />
      <div className="w-1/6 bg-gray-800 p-4 rounded-lg h-full">
        <button
          className="flex items-center text-white mb-4"
          onClick={() => window.history.back()}
        >
          <AiOutlineArrowLeft className="mr-2" />
          Back
        </button>
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`p-2 cursor-pointer rounded-md text-lg font-medium ${
                selectedTab === tab
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-5/6 bg-gray-900 p-6 rounded-lg ml-4">
        {renderContent()}
      </div>
      <Modal
        isOpen={isProfilePicModalOpen}
        onClose={() => setIsProfilePicModalOpen(false)}
      >
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4 w-96 h-full">
            Change Profile Picture
          </h2>
          {!profilePic ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <>
              <div className="relative w-full h-64 bg-gray-800">
                <Cropper
                  image={URL.createObjectURL(profilePic)}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsProfilePicModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropConfirm}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Change
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Setting;
