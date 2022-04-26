import React from "react";
import { Navbar } from "../navbar/Navbar";
export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="pt-20 md:pt-16 relative bg-slate-50 w-full flex flex-wrap justify-center dark:bg-gray-900 h-full overflow-auto">
        {/** <Navbar />*/}
        <div className="container mx-auto px-2 sm:px-6 lg:px-8 pt-2 sm:pt-6 lg:pt-8">
          {children}
        </div>
      </div>
    </>
  );
};
