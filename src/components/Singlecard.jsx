import React, { useState } from "react";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import Rating from "./Ratings";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
useNavigate
const SingleCard = ({ product }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart=()=>{
  dispatch(addToCart({...product,qty}))
  navigate('/cart')
  }
  
  return (
    <div className="container mx-auto px-4 py-10">
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
      <div className="w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              className="w-full h-64 md:h-full object-cover"
              src={product?.image}
              alt={product?.name}
            />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col justify-around items-evenly h-full">
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                <Link
                  to={`product/${product?._id}`}
                  className="hover:text-gray-600 transition-colors duration-200 text-4xl">
                  {product?.name}
                </Link>
              </h2>
              <h3 className="font-bold text-center">Description</h3>
              <p className="text-center mb-6">{product?.description}</p>
            </div>
            <div className="w-full flex flex-col items-center">
              <p className="text-gray-600 text-4xl font-semibold mb-4">
                ${product?.price.toFixed(2)}
              </p>
              <div className="flex items-center mb-6">
                <Rating value={product?.rating} text={product?.numReviews} />
              </div>
              {product?.countInStock === 0 ? (
                <div className="text-red-500 m-1 text-lg">
                  Product Out of Stock
                </div>
              ) : (
                <div className="flex flex-col items-center mb-4">
                  <div><p className="text-bold text-lg text-gray-600">Quantity</p></div>
                  <select
                    className="text-xl border-2 border-black m-2 rounded-sm"
                    value={qty}
                    onChange={(e) => {
                      setQty(Number(e.target.value));
                    }}>
                    {[...Array(product?.countInStock).keys()].map((x) => (
                      <option
                        className="text-lg"
                        value={x + 1}
                        key={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                disabled={product?.countInStock === 0}
                onClick={handleAddToCart}
                className="w-80 bg-gray-600 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 flex items-center justify-center">
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
