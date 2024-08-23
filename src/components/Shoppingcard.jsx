import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import Rating from "./Ratings";

const Shoppingcard = ({ name, price, imageUrl }) => {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-xl bg-white">
      <img className="w-full p-5 h-30 object-cover" src={imageUrl} alt={name} />
      <div className="px-4 py-3">
        <div className="font-bold text-sm mb-1 text-gray-600">{name}</div>
        <p className="text-gray-600 text-sm font-semibold mb-2">
          ${price.toFixed(2)}
        </p>
        <Rating />
      </div>
      <div className="px-4 py-3">
        <button className="w-full bg-gray-600 hover:bg-gray-800 text-white text-sm py-2 px- rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center">
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Shoppingcard