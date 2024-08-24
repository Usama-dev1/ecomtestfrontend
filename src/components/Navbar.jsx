import React, { useState } from "react";
import { FaBars, FaTimes, FaSearch, FaShoppingCart,  } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleMenuToggle = () => {
    setOpen((prevState) => !prevState);
  }
  return (
    <nav className="bg-white w-full shadow-md px-4 py-2 border-t-2 border-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-around">
          <div className="flex items-center justify-between w-full md:w-auto">
            <button
              onClick={handleMenuToggle}
              className="md:hidden text-gray-600 z-20">
              {open ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <div className="text-2xl text-gray-500 font-extrabold">
              {" "}
              <Link to='/'>Shoplogo </Link>
            </div>
            <button className="md:hidden text-gray-600 hover:text-gray-800 flex items-center space-x-4">
              <FaShoppingCart size={24} />
              <IoPersonAdd size={24} />
            </button>
          </div>

          <div
            className={`w-full md:flex md:w-auto ${open ? "block" : "hidden"}`}>
            <ul className="flex flex-col font-mono text-lg items-center text-gray-600 md:flex-row md:items-start md:space-x-4 mt-4 md:mt-0">
              <li className="my-2 md:my-0 ">
                <Link to="/" className="block text-gray-700 hover:underline">
                  Home
                </Link>
              </li>
              <li className="my-2 md:my-0 ">
                <Link
                  to="/aboutus"
                  className="block text-gray-700 hover:underline">
                  About Us
                </Link>
              </li>
              <li className="my-2 md:my-0 ">
                <Link
                  to="/contactus"
                  className="block text-gray-700 hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex md:items-center mt-4 md:mt-0">
            <div className="relative w-40 mr-4">
              <input
                type="text"
                className="border-2 border-gray-300 rounded-md w-full h-8 py-1 px-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
                <FaSearch size={16} />
              </button>
            </div>
            <button className="text-gray-500 flex items-center space-x-4">
              <FaShoppingCart size={24} className=" hover:text-gray-900" />
              <IoPersonAdd size={24} className=" hover:text-gray-800" />
            </button>
          </div>
        </div>

        <div className="mt-4 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              className="border-2 border-gray-300 rounded-md w-full h-8 py-1 px-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
              <FaSearch size={16} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
