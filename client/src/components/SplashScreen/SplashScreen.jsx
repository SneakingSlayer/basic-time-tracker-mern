import React from "react";
import { MdLockClock } from "react-icons/md";
import "./splash.css";
export const SplashScreen = () => {
  return (
    <div className="flex h-screen justify-center items-center dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center flex h-8 w-auto">
          <MdLockClock className="text-5xl mr-1 text-indigo-600 " />
          <a
            href="/"
            className="text-slate-800 font-extrabold text-4xl dark:text-white"
          >
            Time Tracker
          </a>
        </div>
        <div className="mt-6 w-full ">
          <div class="demo-container w-full ">
            <div class="progress-bar bg-slate-200 dark:bg-slate-600">
              <div class="progress-bar-value bg-indigo-600"></div>
            </div>
          </div>
          <p className="text-slate-400 text-center text-sm mt-4">
            Loading assets...
          </p>
        </div>
      </div>
    </div>
  );
};
