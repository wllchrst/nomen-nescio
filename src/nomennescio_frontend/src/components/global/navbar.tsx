import React, { useState, useEffect } from "react";
import {
  FaFolderOpen,
  FaShareAlt,
  FaUsers,
  FaPlus,
  FaSignOutAlt,
  FaCog,
  FaBell,
  FaUserCircle,
  FaEnvelope,
  FaCloudUploadAlt,
  FaClipboardList,
} from "react-icons/fa";
import { AiOutlineBell, AiOutlineUser, AiFillGithub } from "react-icons/ai";
import Dropdown from "../elements/dropdowns/dropdown";
import DropdownValue from "../elements/dropdowns/dropdown-value";
import SearchDropdown from "../elements/search/search-dropdown";
import Sidebar from "../global/sidebar";
import { UserService } from "../../service/user-service";
import { IUser } from "../../interfaces/user-interface";
import useFetchUsers from "../../hooks/use-fetch-user";
import useGetCurrentUser from "../../hooks/use-get-current-user";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/user-context";

const Navbar: React.FC = () => {
  const users = useFetchUsers();
  const { user } = useUserContext();
  const userService = new UserService();
  const [filteredResults, setFilteredResults] = useState<IUser[]>([]);
  const { setUserData } = useUserContext();

  function handleLogout() {
    userService.logOut();
    setUserData(null);
    window.location.href = "/";
  }

  const groupsDropdown = [
    { name: "NEW MAIL", icon: <FaPlus />, link: "/upload" },
    { name: "GROUP", icon: <FaUsers />, link: "/group" },
  ];

  const searchData = [
    ...users,
    ...groupsDropdown.map((item) => ({ ...item, email: "" })),
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const results = searchData.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(value.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredResults(results);
  };

  return (
    <nav className="bg-transparent w-full z-50 border-gray-800 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4 z-50">
        <Dropdown text="MAIL">
          {groupsDropdown.map((item, index) => (
            <div key={index}>
              <DropdownValue text={item.name} icon={item.icon} to={item.link} />
            </div>
          ))}
        </Dropdown>
      </div>

      <div className="flex items-center space-x-3 z-50">
        <div>
          <SearchDropdown
            data={filteredResults.length > 0 ? filteredResults : searchData}
            onSearch={handleSearch}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Dropdown text="" image={user?.profile_picture_path}>
            <DropdownValue
              text="Profile"
              icon={<FaUserCircle />}
              to="/setting"
            />
            <DropdownValue
              text="Log Out"
              icon={<FaSignOutAlt />}
              onClick={() => handleLogout()}
            />
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
