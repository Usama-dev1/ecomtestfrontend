import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, FaMinus, FaPlus, FaArrowLeft } from "react-icons/fa";
import { removeFromCart, updateQuantityInCart } from "../slices/cartSlice";
import { GiEmptyHourglass } from "react-icons/gi";
import { Link} from "react-router-dom";
const Cartlist = () => {
  const dispatch = useDispatch();
  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };
  const handleCartQuantity = (item,updateQty) => {
    if (updateQty > 0) {
      dispatch(updateQuantityInCart({ item, qty: updateQty }));
    }
  };

  const cart = useSelector((state) => state.cart);
  const {userInfo} = useSelector((state) => state.auth);
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;
  console.log(cart);
  console.log(cartItems);
  return (
    <>
      {cartItems.length > 0 ? (
        <div className="font-sans max-w-4xl max-md:max-w-xl mx-auto p-4">
          <h1 className="text-4xl font-extrabold text-gray-500 w-full text-center">
            Shopping Cart
          </h1>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="md:col-span-2 space-y-4">
              {/* //product list Start */}
              {cartItems?.map((item) => (
                <div
                  className="flex flex-col sm:flex-row gap-2 bg-white p-4 rounded-md shadow-md"
                  key={item._id}>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
                    <div className="w-28 h-28 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-between mt-5">
                      <Link to={`/product/${item._id}`}>
                        <h3 className="mx-4 text-md font-bold text-gray-500 text-center sm:text-left">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="mx-5 flex items-center justify-center sm:justify-start gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            const updateQty = item.qty - 1;
                            handleCartQuantity(item, updateQty);
                          }}
                          className="flex items-center justify-center w-8 h-8 bg-gray-200 hover:bg-gray-500 hover:text-white rounded-full transition-colors">
                          <FaMinus size={10} />
                        </button>
                        <span className="font-bold text-sm leading-[18px]">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const updateQty = item.qty + 1;
                            handleCartQuantity(item, updateQty);
                          }}
                          className="flex items-center justify-center w-8 h-8 bg-gray-200 hover:bg-gray-500 hover:text-white rounded-full transition-colors">
                          <FaPlus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end mt-4 sm:mt-0 ml-auto">
                    <button
                      onClick={() => handleRemoveItem(item)}
                      type="button"
                      className="text-red-500 hover:text-red-800 transition-colors">
                      <FaTrashAlt size={16} />
                    </button>
                    <h3 className="text-md font-bold text-gray-500 mt-10">
                      ${item.price}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
            {/* //product list ends */}

            <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
              <ul className="text-gray-600 space-y-4">
                <li className="flex flex-wrap gap-4 text-sm">
                  Subtotal{" "}
                  <span className="ml-auto font-bold">${itemsPrice}</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Shipping{" "}
                  <span className="ml-auto font-bold">${shippingPrice}</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Tax <span className="ml-auto font-bold">${taxPrice}</span>
                </li>
                <hr className="border-gray-300" />
                <li className="flex flex-wrap gap-4 text-sm font-bold">
                  Total <span className="ml-auto">${totalPrice}</span>
                </li>
              </ul>

              <div className="mt-8 space-y-2">
                {/* <Link to="/placeorder">
                  <button
                    type="button"
                    disabled={true}
                    className="text-sm px-4 my-2 py-2.5 w-full font-semibold tracking-wide bg-blue-500 text-white border border-gray-300 rounded-md">
                    Order Now
                  </button>
                </Link> */}
                <Link to="/shipping">
                  <button
                    type="button"
                    className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-500 hover:bg-gray-700 text-white border border-gray-300 rounded-md">
                   {userInfo? "Go to Shipping":"Login to Order"}
                  </button>
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-4">
                <img
                  src="https://static-00.iconduck.com/assets.00/mastercard-icon-512x322-qcvfjfth.png"
                  alt="card1"
                  className="w-10 object-contain"
                />
                <img
                  src="https://static-00.iconduck.com/assets.00/visa-icon-512x333-x3yf202g.png"
                  alt="card2"
                  className="w-10 object-contain"
                />
                <img
                  src="https://static-00.iconduck.com/assets.00/american-express-alt-icon-512x354-dbdmlmt5.png"
                  alt="card3"
                  className="w-10 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
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
            <GiEmptyHourglass className="animate-spin" />
            <h1>No items in cart</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Cartlist;
