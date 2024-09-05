import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
const Paymentpage = () => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelect = (e) => {
    setPaymentMethod(e.target.value);
    setIsSubmitted(false);
  };
  const { shippingAddress } = useSelector((state) => state.cart);
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({ paymentMethod }));
    navigate("/placeorder");
    setIsSubmitted(true);
  };

  return (
    <>
      <Navigation step1 step2 step3 />
      <div className="flex flex-col justify-center items-center h-full w-full p-4 bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-center p-3 rounded">
            Select Payment Method
          </h2>

          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="credit"
                name="paymentMethod"
                value="Credit Card"
                checked={paymentMethod === "Credit Card"}
                onChange={handleSelect}
                className="mr-2"
              />
              <label htmlFor="credit" className="text-xl">
                Credit Card
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="Paypal"
                checked={paymentMethod === "Paypal"}
                onChange={handleSelect}
                className="mr-2"
              />
              <label htmlFor="paypal" className="text-xl">
                Paypal
              </label>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-slate-500 text-xl text-white hover:bg-slate-600 rounded-lg">
              Continue
            </button>
          </div>
        </form>
        {isSubmitted ? (
          <div className="w-full mt-4 text-center text-green-600">
            Selected payment method: {paymentMethod}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Paymentpage;
