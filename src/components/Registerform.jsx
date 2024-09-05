import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

const Registerform = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading}] = useRegisterMutation();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(data).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate("/cart");
    } catch (err) {
      setError(err.data?.message || err.message || "Failed to Register");
    }
  };
  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="h-full flex flex-col items-center justify-start py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Register Here
            </h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="text-gray-800 text-sm mb-2 block">
                  Name
                </label>
                <div className="relative flex items-center">
                  <input
                    id="name"
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter username"
                  />
                </div>
              </div>
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
              <div>
                {error && (
                  <div className="text-red-500 text-sm mb-4">{error}</div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 text-sm rounded-lg text-white ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-600 hover:bg-gray-700 cursor-pointer"
                  } focus:outline-none`}>
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerform;
