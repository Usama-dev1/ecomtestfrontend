import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <div>
      <div>
        <button className="p-3">
          <Link
            to="/"
            className="px-3 w-full bg-gray-600 hover:bg-gray-800 text-white text-sm py-2 px- rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center">
            <FaArrowLeft className="mx-1" />
            Go back
          </Link>
        </button>
      </div>
      <div className="flex flex-col justify-center items-center text-4xl">
        <FaReact className="animate-spin text-8xl" />
        <h1 className="text-7xl text-red-500">404 Error</h1>
        <p className="text-4xl">Page Not Found</p>
      </div>
    </div>
  );
};

export default Error404;
