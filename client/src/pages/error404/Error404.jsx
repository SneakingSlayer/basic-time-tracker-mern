import React from "react";

export const Error404 = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-50">
      <div className="text-center">
        <h1 className="font-bold text-8xl text-slate-800">
          Error <span className="text-indigo-600"> 404</span>
        </h1>
        <p className="text-slate-800 text-3xl">Page not found.</p>
      </div>
    </div>
  );
};
