import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { useLogoutMutation } from "../slices/userApiSlice";
import { setLogOut } from "../slices/authSlice";
import { saveShippingAddress } from "../slices/cartSlice";
import { MdArrowDropDown } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const cartItems = cart.cartItems;
  const [itemCount, setItemCount] = useState(cartItems.length);

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMenuToggle = () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setItemCount(cartItems.length);
  }, [cartItems]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setLogOut());
      dispatch(saveShippingAddress(null));
      localStorage.removeItem("userinfo");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
              <Link to="/">
                Shoplogo <CiShoppingCart className="inline" />
              </Link>
            </div>
            {userInfo && (
              <div className="sm:hidden ms-5 relative inline-block text-left">
                <button
                  type="button"
                  className="flex items-center py-1 px-3 hover:underline rounded-sm  focus:outline-none"
                  onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <span className="text-sm text-gray-500 font-semibold mr-2">
                    {userInfo?.name}
                  </span>
                  <MdArrowDropDown
                    className={`text-gray-500 text-xl ${
                      dropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute mt-2 right-0 w-40 bg-white border border-gray-400 rounded-md shadow-lg z-10">
                    <div className="p-4">
                      <ul className="space-y-2 text-center m-2">
                        <li>
                          <Link
                            to="/profile"
                            className="hover:bg-slate-300 hover:underline text-sm py-1 px-4">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/placeorder/mine"
                            className="hover:bg-slate-300 hover:underline text-sm py-1 px-2">
                            My Orders
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="bg-gray-500 text-sm px-4 py-1 text-white rounded-xl">
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
            <button className="md:hidden text-gray-600 hover:text-gray-800 flex items-center space-x-4">
              <Link to="cart">
                <FaShoppingCart
                  size={24}
                  className="text-gray-500 hover:text-gray-900"
                />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 mt-1  bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </button>
          </div>

          <div
            className={`w-full md:flex md:w-auto ${open ? "block" : "hidden"}`}>
            <ul className="flex flex-col font-mono text-lg items-center text-gray-600 md:flex-row md:items-start md:space-x-4 mt-4 md:mt-0">
              <li className="my-2 md:my-0">
                <Link to="/" className="block text-gray-700 hover:underline">
                  Home
                </Link>
              </li>
              <li className="my-2 md:my-0">
                <Link
                  to="/products"
                  className="block text-gray-700 hover:underline">
                  Products
                </Link>
              </li>
              <li className="my-2 md:my-0">
                <Link
                  to="/contactus"
                  className="block text-gray-700 hover:underline">
                  Contact Us
                </Link>
              </li>
              <div className="sm:flex flex-row justify-end gap-1 md:justify-end  md:gap-2">
                {!userInfo ? (
                  <>
                    <Link to="/login">
                      <button className="bg-gray-500 text-sm px-4 py-1 text-white rounded-xl">
                        Login
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="bg-gray-500 text-sm px-2 py-1 text-white rounded-xl">
                        Register
                      </button>
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="bg-gray-500  text-sm px-4 py-1 text-white rounded-xl">
                    Logout
                  </button>
                )}
              </div>
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
            <button className="text-gray-500 flex items-center space-x-2">
              {userInfo && (
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    className="flex items-center py-1 px-3 hover:underline rounded-sm  focus:outline-none"
                    onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <span className="text-sm text-gray-500 font-semibold mr-2">
                      {userInfo?.name}
                    </span>
                    <MdArrowDropDown
                      className={`text-gray-500 text-xl ${
                        dropdownOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute mt-2 right-0 w-40 bg-white border border-gray-400 rounded-md shadow-lg z-10">
                      <div className="p-4">
                        <ul className="space-y-2 text-center m-2">
                          <li>
                            <Link
                              to="/profile"
                              className="hover:bg-slate-300 hover:underline text-sm py-1 px-4">
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/placeorder/mine"
                              className="hover:bg-slate-300 hover:underline text-sm py-1 px-2">
                              My Orders
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="bg-gray-500 text-sm px-4 py-1 text-white rounded-xl">
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="flex flex-row relative mx-2">
                <Link to="cart">
                  <FaShoppingCart
                    size={24}
                    className={`text-gray-500  hover:text-gray-900 ${
                      itemCount > 0 ? "animate-bounce" : ""
                    }`}
                  />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
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
