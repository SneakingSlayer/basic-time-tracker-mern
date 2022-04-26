import React, { useState, useContext, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { GoPlus } from "react-icons/go";
import { Card } from "../../components/Card/Card";
import { GlobalContext } from "../../context/GlobalState";
import axios from "axios";
import { Loader } from "../../components/Loader/Loader";
import { ENDPOINTS } from "../../utils/api";

export const MyPCs = () => {
  const { changeLoading } = useContext(GlobalContext);
  const [open, setOpen] = useState("hidden");
  const [computers, setComputers] = useState([]);
  const [pcNo, setPcNo] = useState("");
  const [pcName, setPcName] = useState("");
  const [loading, setLoading] = useState(false);
  const [computerLoading, setComputerLoading] = useState(false);
  const fetchComputers = async () => {
    setComputerLoading(true);
    await axios
      .get(ENDPOINTS.computers.computers)
      .then((res) => {
        setComputerLoading(false);
        setComputers(res.data.data);
      })
      .catch((e) => {
        console.log(e);
        setComputerLoading(false);
      });
  };

  const handleAddComputer = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (pcNo === "" || pcName === "") {
      setLoading(false);
      return;
    }
    await axios
      .post(ENDPOINTS.computers.computers, {
        name: pcName,
        number: pcNo,
      })
      .then((res) => {
        setLoading(false);
        setOpen("hidden");
      })
      .catch((e) => {
        setLoading(false);
        setOpen("hidden");
      });

    return;
  };

  useEffect(() => {
    fetchComputers();
  }, [loading, changeLoading]);

  return (
    <>
      <Layout>
        <div
          id="authentication-modal"
          tabindex="-1"
          aria-hidden="true"
          className={`${open} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full bg-opacity-60 bg-gray-900 flex justify-center items-center transition-opacity`}
        >
          <div
            className="w-full h-full absolute z-49"
            onClick={() => setOpen("hidden")}
          ></div>
          <div class="relative p-4 w-full max-w-md h-full h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex justify-end p-2">
                <button
                  onClick={() => setOpen("hidden")}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="authentication-modal"
                >
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <form
                class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
                action="#"
              >
                <h3 class="text-2xl font-bold text-gray-700 dark:text-white">
                  Add a PC
                </h3>
                <div>
                  <label
                    for="text"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    PC No.
                  </label>
                  <input
                    type="text"
                    name="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="PC Number"
                    value={pcNo}
                    disabled={true}
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    PC Name
                  </label>
                  <input
                    type="text"
                    name="text"
                    placeholder="PC Name"
                    onChange={(e) => setPcName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setOpen("hidden")}
                    className="w-48 text-indigo-600 hover:text-indigo-900 hover:border-indigo-800 py-2 px-3 border border-indigo-600  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center mr-2  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddComputer}
                    disabled={loading ? true : false}
                    type="submit"
                    className={`w-full text-white ${
                      loading ? "bg-indigo-400" : "bg-indigo-600"
                    } hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm py-2 px-3 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-500`}
                  >
                    {loading ? <Loader /> : "Add PC"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center  mt-4 mb-4">
          <h1 className="font-bold text-3xl text-gray-700 dark:text-white">
            My <span className="text-indigo-600">Computers</span>
          </h1>
          <button
            onClick={() => {
              setOpen("block");
              setPcNo(
                computers.length > 0
                  ? "0" + (computers.length + 1).toString()
                  : "01"
              );
            }}
            type="button"
            className="mt-2 mb-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
            <GoPlus className="w-4 h-4 mr-2 -ml-1" />
            Add PC
          </button>
        </div>

        {computers.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-9 mb-4 flex flex-wrap mx-2 ">
            {computers.map((computer, idx) => (
              <Card
                key={idx}
                index={idx}
                id={computer._id}
                name={"PC-" + computer.pc_number + " " + computer.pc_name}
                status={computer.pc_status}
                timeIn={computer.pc_time_in}
                timeOut={computer.pc_time_out}
                amountDue={computer.pc_amount_due}
              />
            ))}
          </div>
        ) : (
          <p className="text-center mt-8 text-gray-300">
            You have not added any computers yet.
          </p>
        )}
      </Layout>
    </>
  );
};
