import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from 'react-icons/fa'; // Import an arrow icon from react-icons
import { useSelector } from "react-redux";

const Navigation = ({ step1, step2, step3, step4 }) => {
    const {userInfo}=useSelector((state)=>state.auth)
    const {shippingAddress}=useSelector((state)=>state.cart)
    step3=shippingAddress?true:false
  return (
    <div className="bg-gray-100 p-4">
      <ol className="w-full flex justify-center flex-wrap items-center space-x-4">
        <li
          className={`flex items-center space-x-2 ${
            !userInfo && step1 ? "text-blue-600" : "text-gray-500"
          }`}>
          {!userInfo && step1 ? (
            <Link to="/login" className="flex items-center">
              <span>Login</span>
            </Link>
          ) : (
            <Link to="/Cart" className="flex items-center text-blue-600">
              <span>Cart</span>
            </Link>
          )}
          {step2 && <FaArrowRight className="text-gray-500" />}
        </li>
        <li
          className={`flex items-center space-x-2 ${
            step2 ? "text-blue-600" : "text-gray-500"
          }`}>
          {step2 ? (
            <Link to="/shipping" className="flex items-center">
              <span>Shipping</span>
            </Link>
          ) : (
            <span className="flex items-center cursor-not-allowed">
              <span>Shipping</span>
            </span>
          )}
          {step3 && <FaArrowRight className="text-gray-500" />}
        </li>
        <li
          className={`flex items-center space-x-2 ${
            step3 ? "text-gray-500" : "text-blue-600"
          }`}>
          {step3 ? (
            <Link to="/payment" className="flex items-center">
              <span>Payment</span>
            </Link>
          ) : (
            <span className="flex items-center cursor-not-allowed">
              <span>Payment</span>
            </span>
          )}
          {step4 && <FaArrowRight className="text-gray-500" />}
        </li>
        <li
          className={`flex items-center space-x-2 ${
            step4 ? "text-blue-600" : "text-gray-500"
          }`}>
          {step4 ? (
            <Link to="/placeorder" className="flex items-center">
              <span>Placeorder</span>
            </Link>
          ) : (
            <span className="flex items-center cursor-not-allowed">
              <span>Placeorder</span>
            </span>
          )}
        </li>
      </ol>
    </div>
  );
};

export default Navigation;
