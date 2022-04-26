import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import axios from "axios";
import { ENDPOINTS } from "../../utils/api";
import { useParams } from "react-router-dom";
import { dateTimeFormat } from "../../utils/utils";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
export const MyLogs = () => {
  const params = useParams();
  const [logs, setLogs] = useState([]);
  const [computer, setComputer] = useState([]);

  const fetchComputer = async () => {
    await axios
      .get(ENDPOINTS.computers.computers + `/${params.id}`)
      .then((res) => setComputer(res.data.data))
      .catch((e) => console.log(e));
  };

  const fetchLogs = async () => {
    await axios
      .get(ENDPOINTS.sessions.sessions + `/${params.id}`)
      .then((res) => {
        setLogs(res.data.data);
        setCollection(cloneDeep(res.data.data.slice(0, countPerPage)));
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    fetchLogs();
    fetchComputer();
  }, []);

  const countPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState([]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;

    setCollection(cloneDeep(logs.slice(from, to)));
  };

  return (
    <Layout>
      <div className="flex justify-between items-center  mt-4 mb-4">
        {computer.length > 0 ? (
          <h1 className="font-bold text-3xl text-gray-700 dark:text-white">
            PC-{computer[0].pc_number}{" "}
            <span className="text-indigo-600">{computer[0].pc_name} Logs</span>
          </h1>
        ) : (
          <h1 className="font-bold text-3xl text-gray-700 dark:text-white">
            PC- -- <span className="text-indigo-600">-- Logs</span>
          </h1>
        )}
      </div>
      <div class="relative overflow-x-auto shadow-lg shadow-indigo-300/20 sm:rounded-lg mt-8 dark:shadow-none">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Time In
              </th>
              <th scope="col" class="px-6 py-3">
                Time Out
              </th>
              <th scope="col" class="px-6 py-3">
                Amount Due
              </th>
              <th scope="col" class="px-6 py-3">
                Date Created
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0
              ? collection.map((log) => (
                  <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {dateTimeFormat(log.pc_time_in)}
                    </th>
                    <td class="px-6 py-4">
                      {log.pc_time_out === null
                        ? "--"
                        : dateTimeFormat(log.pc_time_out)}
                    </td>
                    <td class="px-6 py-4">
                      ₱{" "}
                      {log.pc_amount_due === null ? "0.00" : log.pc_amount_due}
                    </td>
                    <td class="px-6 py-4">
                      {dateTimeFormat(log.date_created)}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        <div className="flex justify-between w-full p-4 items-center text-gray-400  dark:bg-gray-700 dark:text-gray-400">
          <p className="text-sm">
            Showing results {collection.length} of {logs.length}
          </p>
          <div className="flex">
            <button
              onClick={() => {
                if (currentPage === 1) {
                  return;
                }
                updatePage(currentPage - 1);
                return;
              }}
              className="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                class="mr-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Previous
            </button>
            <button
              onClick={() => {
                if (collection.length === 0) {
                  return;
                }
                updatePage(currentPage + 1);
                return;
              }}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
              <svg
                class="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
