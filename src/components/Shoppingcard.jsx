import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import Rating from "./Ratings";
import { Link } from 'react-router-dom';
import { addToCart,removeFromCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
const Shoppingcard = ({product}) => {
const cart=useSelector((state)=>state.cart)
const {cartItems}=cart
const existingItem=cartItems.find((p)=>p._id===product._id)
const dispatch=useDispatch()
const handleAddToCart=()=>{
  dispatch(addToCart({...product,qty:1}))
}  
const handleRemoveCart=()=>{
  dispatch(removeFromCart({...product}))
}  
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-xl bg-white">
      <Link to={`product/${product._id}`}>
        <img
          className="w-full p-5 h-30 object-cover"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="px-4 py-3">
        <div className="font-bold text-sm mb-1 text-gray-600">
          <Link to={`product/${product._id}`}>{product.name}</Link>
        </div>
        <p className="text-gray-600 text-sm font-semibold mb-2">
          ${product.price.toFixed(2)}
        </p>
        <Rating value={product.rating} text={product.numReviews} />
      </div>
      <div className="px-4 py-3">
        {!existingItem ? (
          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="w-full bg-gray-600 hover:bg-gray-800 text-white text-sm py-2 px- rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center">
            <FaShoppingCart
              className={`mr-2 ${product.countInStock === 0 ? "hidden" : ""}`}
            />
            {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        ) : (
          <button
            onClick={handleRemoveCart}
            disabled={product.countInStock === 0}
            className=" w-full bg-red-500 hover:bg-red-700 text-white text-sm py-2 px- rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center">
            <FaShoppingCart className="mr-2" />
            Remove from Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Shoppingcard