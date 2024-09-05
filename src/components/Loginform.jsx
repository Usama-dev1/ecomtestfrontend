import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import {FaArrowLeft } from "react-icons/fa";

import Navigation from "./Navigation";
const Loginform = () => {
  const{userInfo}=useSelector((state)=>state.auth)
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(data).unwrap();
      console.log(result)
      dispatch(setCredentials({...result}));
      navigate("/cart");
    } catch (err) {
      setError(err.data?.message || err.message || "Login failed");
    }
  };

  return (
    <>
      {userInfo ? (
        <div>
          <button className="p-3">
            <Link
              to="/cart"
              className="px-3 w-full bg-gray-600 hover:bg-gray-800 text-white text-sm py-2 px- rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center">
              <FaArrowLeft className="mx-1" />
              Cart
            </Link>
          </button>
          <h1 className="w-full flex justify-center text-3xl">You are Already Logged in</h1>
        </div>
      ) : (
        <div className="bg-gray-50 font-[sans-serif]">
          <Navigation step1 />
          <div className="h-full flex flex-col items-center justify-start py-6 px-4">
            <div className="max-w-md w-full">
              <div className="p-8 rounded-2xl bg-white shadow">
                <h2 className="text-gray-800 text-center text-2xl font-bold">
                  LOGIN
                </h2>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-gray-800 text-sm mb-2 block">
                      Email
                    </label>
                    <div className="relative flex items-center">
                      <input
                        value={data.email}
                        onChange={handleChange}
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="text-gray-800 text-sm mb-2 block">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        value={data.password}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  <div className="!mt-8">
                    {error && (
                      <div className="text-red-500 text-sm mb-4">{error}</div>
                    )}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white ${
                        isLoading
                          ? "bg-gray-400"
                          : "bg-gray-600 hover:bg-gray-700"
                      } focus:outline-none`}>
                      {isLoading ? "Logging in..." : "Login"}
                    </button>
                  </div>
                  <p className="text-gray-800 text-sm !mt-8 text-center">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loginform;
