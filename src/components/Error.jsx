import React from "react";

const Error = ({ children }) => {
  return (
    <div className="w-full bg-red-500 text-white text-center py-2 px-4 rounded-md">
     <p> {children}</p>
    </div>
  );
};

export default Error;
