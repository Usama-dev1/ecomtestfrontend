import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import Navigation from "../components/Navigation";

const Shippingpage = () => {
  const [data, setData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const { shippingAddress } = useSelector((state) => state.cart);
  const [error, setError] = useState(""); // State for error handling
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(saveShippingAddress(data)); // Dispatching the action with form data
      navigate("/payment");
    } catch (err) {
      setError("An error occurred while saving the shipping address."); // Set error message
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <Navigation step1 step2 />
      <div className="h-full flex flex-col items-center justify-start py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Shipping Address
            </h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              {shippingAddress && (
                <div className="w-full text-sm text-red-400">
                  Shipping Address already provided enter new to update
                </div>
              )}
              <div>
                <label
                  htmlFor="address"
                  className="text-gray-800 text-sm mb-2 block">
                  Address
                </label>
                <div className="relative flex items-center">
                  <input
                    value={data.address}
                    onChange={handleChange}
                    id="address"
                    name="address"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter Address"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="text-gray-800 text-sm mb-2 block">
                  City
                </label>
                <div className="relative flex items-center">
                  <input
                    value={data.city}
                    onChange={handleChange}
                    id="city"
                    name="city"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter your City"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="text-gray-800 text-sm mb-2 block">
                  Postal Code
                </label>
                <div className="relative flex items-center">
                  <input
                    value={data.postalCode}
                    onChange={handleChange}
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter your Postal Code"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="text-gray-800 text-sm mb-2 block">
                  Country
                </label>
                <div className="relative flex items-center">
                  <input
                    value={data.country}
                    onChange={handleChange}
                    id="country"
                    name="country"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter your Country"
                  />
                </div>
              </div>

              <div className="!mt-8">
                {error && (
                  <div className="text-red-500 text-sm mb-4">{error}</div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-gray-400 hover:bg-black focus:outline-none">
                  {shippingAddress ? "Update Address" : "Continue"}
                </button>
              </div>
              {shippingAddress ? (
                <Link to="/payment">
                  <button className="w-full my-3 py-3 px-4 text-md tracking-wide rounded-lg text-white  bg-blue-400 hover:bg-black focus:outline-none">
                    Continue to Payments
                  </button>
                </Link>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shippingpage;
