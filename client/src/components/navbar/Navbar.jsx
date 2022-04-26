import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { MdLockClock } from "react-icons/md";
import { FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    await localStorage.clear();
    navigate("/login");
  };
  const [firstname, setFirstname] = useState("");

  const profilePictureLetter = localStorage.getItem("firstname");

  useEffect(() => {
    setFirstname(profilePictureLetter);
  }, [profilePictureLetter]);
  return (
    <nav className="z-50 absolute w-full flex justify-center h-20 items-center dark:bg-gray-800 bg-white shadow-md shadow-indigo-200/20 dark:shadow-none">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex-shrink-0 flex items-center">
          <div className="flex items-center flex h-8 w-auto">
            <MdLockClock className="text-3xl mr-1 text-indigo-600 " />
            <a
              href="/"
              className="dark:text-white text-slate-800 font-extrabold text-xl"
            >
              Time Tracker
            </a>
          </div>
        </div>
        <div className="relative inline-block text-left">
          <Menu>
            <div>
              <Menu.Button className="text-gray-400 hover:text-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full p-1">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex justify-center items-center ring-4 dark:ring-slate-500">
                    <p className="text-white font-bold">
                      {firstname.charAt(0).toUpperCase()}
                    </p>
                  </div>
                </div>
              </Menu.Button>
              <Menu.Items className=" divide-y divide-gray-200 pt-2 pb-2 absolute right-0 flex flex-col w-32 border border-gray-100 origin-top-right bg-white rounded-md shadow-md outline-none">
                <div className="w-full">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${" text-gray-200 w-full"} p-1 text-sm flex items-center text-gray-400 px-3 ps-3 w-full`}
                      >
                        <FaUserCircle className="mr-2 text-lg" /> Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${" text-gray-200  divide-y divide-gray-100 w-full"} p-1 pb-2 text-sm flex items-center text-gray-400  px-3 ps-3  divide-y divide-gray-100 w-full`}
                      >
                        <FaCog className="mr-2 text-lg" /> Settings
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="w-full">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active && "bg-gray-200 text-indigo-600  w-full"
                        } p-1 pt-2 text-sm flex items-center text-gray-400  px-3 ps-3  w-full`}
                      >
                        <FaSignOutAlt className="mr-2 text-lg" /> Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </div>
          </Menu>
        </div>
      </div>
    </nav>
  );
};
