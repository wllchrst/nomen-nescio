import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import TypingEffect from "react-typing-effect";
import useSearchDropdown from "../../../hooks/use-search-dropdown";
import clsx from "clsx";
import { DUMMY_PROFILE } from "../../../constants/image-constants";
import useProfileSource from "../../../hooks/use-get-profile-source";
import { IGroupData } from "../../../interfaces/group-interface";
import { IUser } from "../../../interfaces/user-interface";
import { FaUser, FaUsers } from "react-icons/fa";

const words = [
  "William Christian",
  "Settings",
  "Just Search Everything !",
  "Marvel Collin",
  "Profile",
  "Felix",
  "Dave",
];

interface SearchItem {
  id: number;
  image?: string;
  name?: string;
  email?: string;
  icon?: React.ReactNode;
  title?: string;
  link: string;
  variant?: string;
}

interface SearchDropdownProps {
  data: SearchItem[];
  searchForUser?: boolean;
  searchForGroup?: boolean;
  onItemClick?: (item: SearchItem) => void;
  onUserClick?: (user: IUser) => void;
  onGroupClick?: (group: IGroupData) => void;
  className?: string;
  users: IUser[];
  groups: IGroupData[];
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  data,
  searchForUser = false,
  searchForGroup = false,
  onItemClick,
  onUserClick,
  onGroupClick,
  className,
  users,
  groups,
  chosenGroups = [], 
}) => {
  const {
    query,
    filteredResults,
    filteredUsers = [],
    filteredGroups = [],
    chosenUsers,
    searchInputRef,
    handleSearch,
    handleUserClick,
    handleGroupClick,
    handleInputClick,
    handleRemoveUser,
    handleRemoveGroup,
    getEmailData,
  } = useSearchDropdown(data, searchForUser, searchForGroup, onUserClick, onGroupClick);
  const [isActive, setIsActive] = useState(false);
  const [hoveredUser, setHoveredUser] = useState<IUser | null>(null);
  const [hoveredGroup, setHoveredGroup] = useState<IGroupData | null>(null);
  const [hoveredGroupMembers, setHoveredGroupMembers] = useState<IUser[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: SearchItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
    handleSearch({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
    setIsActive(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  const handleGroupHover = (group: IGroupData) => {
    setHoveredGroup(group);
    setHoveredGroupMembers(group.members || []);
  };

  const handleGroupLeave = () => {
    setHoveredGroup(null);
    setHoveredGroupMembers([]);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex justify-items-center wz-50" ref={dropdownRef}>
      {searchForUser || searchForGroup ? (
        <div
          className={clsx(
            "flex flex-wrap items-center p-2  bg-[#0d1117] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-40",
            className
          )}
        >
          {chosenUsers.map((user) => (
            <div
              key={user.id}
              className="relative flex items-center bg-gray-800 rounded-full px-3 mr-2"
              onMouseEnter={() => setHoveredUser(user)}
              onMouseLeave={() => setHoveredUser(null)}
            >
              <FaUser className="mr-2" />
              <span>{user.name}</span>
              <button
                onClick={() => handleRemoveUser(user)}
                className="ml-2 text-red-500"
              >
                x
              </button>
              {hoveredUser === user && (
                <div className="absolute top-full mt-2 p-2 bg-gray-900 text-white rounded shadow-lg">
                  <p>{user.email}</p>
                </div>
              )}
            </div>
          ))}
          {chosenGroups.map((group) => (
            <div
              key={group.id}
              className="relative flex items-center bg-gray-800 rounded-full px-3 mr-2"
              onMouseEnter={() => handleGroupHover(group)}
              onMouseLeave={handleGroupLeave}
            >
              <FaUsers className="mr-2" />
              <span>{group.name}</span>
              <button
                onClick={() => handleRemoveGroup(group)}
                className="ml-2 text-red-500"
              >
                x
              </button>
              {hoveredGroup === group && (
                <div className="absolute top-full mt-2 p-2 bg-gray-900 text-white rounded shadow-lg">
                  <p>{group.description}</p>
                  {hoveredGroupMembers.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-gray-400">Members:</h4>
                      <ul className="list-disc list-inside">
                        {hoveredGroupMembers.map((member) => (
                          <li key={member.id} className="text-gray-400">{member.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <input
            type="text"
            ref={searchInputRef}
            value={query}
            onChange={handleSearch}
            onClick={() => {
              handleInputClick();
              setIsActive(true);
            }}
            placeholder="Search..."
            className="flex-grow bg-transparent focus:outline-none"
          />
        </div>
      ) : (
        <TypingEffect
          text={words}
          speed={100}
          eraseSpeed={50}
          typingDelay={500}
          cursor="|"
          eraseDelay={1000}
          displayTextRenderer={(text: string) => (
            <input
              type="text"
              ref={searchInputRef}
              value={query}
              onChange={handleSearch}
              onClick={() => {
                handleInputClick();
                setIsActive(true);
              }}
              placeholder={"(ctrl + k)... " + text}
              className={clsx(
                "p-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-96",
                className
              )}
            />
          )}
        />
      )}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute top-12 left-0 bg-[#161b22] border border-gray-700 rounded-md shadow-lg w-full z-50 max-h-60 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {filteredResults.length > 0 ? (
              filteredResults.map((item) => (
                <Link
                  to={item.link}
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex w-full items-center p-3 hover:bg-[#0d1117] transition-all duration-200 cursor-pointer">
                    {item.icon && (
                      <div className="flex w-8 h-8 invert items-center justify-center mr-2">
                        {React.cloneElement(item.icon as React.ReactElement, {
                          size: 20,
                        })}
                      </div>
                    )}
                    {item.image && !item.icon && (
                      <img
                        src={item.image}
                        alt={item.name || ""}
                        className="w-12 h-12 rounded-full mr-2 flex-shrink-0"
                      />
                    )}
                    <div className="text-left flex-grow">
                      {item.title ? (
                        <p className="font-bold text-white">{item.title}</p>
                      ) : (
                        <>
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="text-sm text-gray-400">{item.email}</p>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="p-3 text-gray-500">No results found</p>
            )}
            {searchForUser && filteredUsers.length > 0 && (
              <div className="mt-4">
                <h3 className="text-gray-400 px-3">Users</h3>
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex w-full items-center p-3 hover:bg-[#0d1117] transition-all duration-200 cursor-pointer"
                    onClick={() => {
                      handleUserClick(user);
                      setIsActive(false);
                    }}
                  >
                    <FaUser className="mr-2" />
                    <img
                      src={
                        user.profile_picture_path == null
                          ? DUMMY_PROFILE
                          : useProfileSource(user.profile_picture_path)
                      }
                      alt={user.name}
                      className="w-12 h-12 rounded-full mr-2 flex-shrink-0"
                    />
                    <div className="text-left flex-grow">
                      <p className="font-medium text-white">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {searchForGroup && filteredGroups.length > 0 && (
              <div className="mt-4">
                <h3 className="text-gray-400 px-3">Groups</h3>
                {filteredGroups.map((group) => (
                  <div
                    key={group.id}
                    className="flex w-full items-center p-3 hover:bg-[#0d1117] transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => handleGroupHover(group)}
                    onMouseLeave={handleGroupLeave}
                    onClick={() => {
                      handleGroupClick(group);
                      setIsActive(false);
                    }}
                  >
                    <FaUsers className="mr-2" />
                    <div className="text-left flex-grow">
                      <p className="font-medium text-white">{group.name}</p>
                      <p className="text-sm text-gray-400">{group.description}</p>
                      {hoveredGroup === group && hoveredGroupMembers.length > 0 && (
                        <div className="mt-2">
                          <h4 className="text-gray-400">Members:</h4>
                          <ul className="list-disc list-inside">
                            {hoveredGroupMembers.map((member) => (
                              <li key={member.id} className="text-gray-400">{member.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchDropdown;
