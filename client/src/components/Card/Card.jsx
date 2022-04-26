import React, { useContext } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { FiTrash2 } from "react-icons/fi";
import { CgFileDocument } from "react-icons/cg";
import { GlobalContext } from "../../context/GlobalState";
import { dateTimeFormat } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINTS } from "../../utils/api";
import { Loader } from "../../components/Loader/Loader";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const Card = (props) => {
  const navigate = useNavigate();
  const { changeLoading, handleLogin, handleLogout, handleDeleteComputer } =
    useContext(GlobalContext);

  return (
    <div>
      <div
        className={`p-6  min-w-full bg-white rounded-lg dark:shadow-none shadow-lg shadow-indigo-200/20 border-t-8 ${
          props.status === "Active" ? "border-indigo-600 " : "border-gray-300"
        } dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="flex justify-between mb-2">
          <div>
            <h5
              className={`text-2xl font-bold  dark:text-white  ${
                props.status === "Active" ? "text-gray-700" : "text-gray-300"
              } mb-1`}
            >
              {props.name || "--"}
            </h5>
            <div className="flex items-center">
              <div
                className={`h-3 w-3 mr-1 rounded-full ${
                  props.status === "Active" ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <p className="text-sm text-gray-400">{props.status || "--"}</p>
            </div>
          </div>
          <div className="relative inline-block text-left">
            <Menu>
              <div>
                <Menu.Button className="text-gray-300 hover:text-inigo-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full p-1">
                  <HiDotsHorizontal className="text-2xl" />
                </Menu.Button>
                <Menu.Items className="pt-2 pb-2 absolute right-0 flex flex-col w-32 border border-gray-100 origin-top-right bg-white rounded-md shadow-md outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active && "bg-gray-200 text-indigo-600 "
                        } p-1 text-sm flex items-center text-gray-400 px-3 ps-3`}
                        onClick={() => navigate(`/logs/${props.id}`)}
                      >
                        <CgFileDocument className="mr-1" /> View Logs
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active && "bg-gray-200 text-red-500 "
                        } p-1 text-sm flex items-center text-gray-400  px-3 ps-3`}
                        onClick={() => handleDeleteComputer(props.id)}
                      >
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </div>
            </Menu>
          </div>
        </div>
        <div className="mb-3 mt-4">
          <div className="mb-2">
            <p class="mb-1 text-gray-400 dark:text-gray-400 font-bold">
              Log In
            </p>
            <p class="mb-1 text-gray-400 dark:text-gray-400">
              {props.timeIn === null ? "--" : dateTimeFormat(props.timeIn)}
            </p>
          </div>
          <div>
            <p class="mb-1 text-gray-400 dark:text-gray-400 font-bold">
              Log Out
            </p>
            <p class="mb-1 text-gray-400 dark:text-gray-400">
              {props.timeOut === null ? "--" : dateTimeFormat(props.timeOut)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-3 mt-3">
            <p
              className={`${
                props.status === "Active" ? "text-indigo-600" : "text-gray-300"
              } font-bold text-2xl`}
            >
              ₱ {props.amountDue || "0.00"}
            </p>
          </div>
          <div className="flex ">
            <button
              onClick={() => handleLogout(props.id)}
              disabled={props.status === "Active" ? false : true}
              className={`${
                props.status === "Active"
                  ? "text-indigo-600 hover:text-indigo-900 hover:border-indigo-800 border border-indigo-600"
                  : "text-gray-300  border border-gray-300"
              }  py-2 px-3  focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm text-center mr-2  dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-600 dark:focus:ring-indigo-800`}
            >
              Log Out
            </button>
            <button
              onClick={() => handleLogin(props.id)}
              disabled={props.status !== "Active" ? false : true}
              className={`${
                props.status !== "Active"
                  ? " bg-gray-300 hover:bg-indigo-600"
                  : "bg-gray-300"
              } inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white  rounded-lg  focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800`}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
