import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import Navigation from "../components/Navigation";

const Orderpage = () => {
  const navigate = useNavigate();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const {
    cartItems,
    totalPrice,
    shippingPrice,
    taxPrice,
    itemsPrice,
    paymentMethod,
    shippingAddress,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const handleOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress: {
          address: shippingAddress?.address || "",
          city: shippingAddress?.city || "",
          postalCode: shippingAddress?.postalCode || "",
          country: shippingAddress?.country || "",
        },
        paymentMethod: paymentMethod?.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      console.log(res);
      navigate(`/placeorder/${res._id}`); // Navigate to an order success page or similar
    } catch (err) {
      console.log("Error creating order:", err);
    }
  };

  return (
    <div>
      <Navigation step1 step2 step3 step4 />
      <div className="font-[sans-serif] bg-white">
        <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
            <div className="relative h-full">
              <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div className="flex items-start gap-4" key={item._id}>
                      <div className="w-28 h-20 max-lg:w-20 max-lg:h-20 flex p-3 shrink-0 rounded-md">
                        <img
                          src={item.image}
                          className="w-full object-contain"
                          alt={item.name}
                        />
                      </div>
                      <div className="w-full">
                        <h3 className="text-base text-white">{item.name}</h3>
                        <ul className="text-xs text-gray-300 space-y-2 mt-2">
                          <li>
                            Quantity{" "}
                            <span className="float-right">{item.qty}</span>
                          </li>
                          <li>
                            Total Price{" "}
                            <span className="float-right">{item.price}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:absolute md:left-0 md:bottom-0 bg-gray-800 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-sm text-white">
                  Items <span className="ml-auto">+{itemsPrice||""}</span>
                </h4>
                <h4 className="flex flex-wrap gap-4 text-sm text-white">
                  Shipping <span className="ml-auto">+{shippingPrice||''}</span>
                </h4>
                <h4 className="flex flex-wrap gap-4 text-sm text-white">
                  Tax <span className="ml-auto">+{taxPrice||''}</span>
                </h4>
                <div className="w-full bg-white my-1 py-[0.1rem]"></div>
                <h4 className="flex flex-wrap gap-4 mt-2 text-base text-white">
                  Total <span className="ml-auto">{totalPrice||''}</span>
                </h4>
              </div>
            </div>
          </div>

          <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
            <h2 className="text-2xl font-bold text-gray-800">
              Complete your order
            </h2>
            <form className="mt-8">
              <div>
                <h3 className="text-base text-gray-800 mb-4 underline">
                  Payment Method
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="text-2xl font-bold">
                    {paymentMethod.paymentMethod}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-base text-gray-800 mb-4 underline">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Address Line"
                      value={shippingAddress?.address || ""}
                      readOnly
                      className="px-4 py-3 bg-gray-100 text-gray-800 w-full text-sm rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={shippingAddress?.city || ""}
                      placeholder="City"
                      readOnly
                      className="px-4 py-3 bg-gray-100 text-gray-800 w-full text-sm rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={shippingAddress?.country || ""}
                      placeholder="State"
                      readOnly
                      className="px-4 py-3 bg-gray-100 text-gray-800 w-full text-sm rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={shippingAddress?.postalCode || ""}
                      placeholder="Zip Code"
                      readOnly
                      className="px-4 py-3 bg-gray-100 text-gray-800 w-full text-sm rounded-md"
                    />
                  </div>
                </div>

                <div className="flex gap-4 max-md:flex-col mt-8">
                  <Link
                    to={"/cart"}
                    className="text-center rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1">
                    Cancel
                  </Link>
                  <button
                    type="button"
                    onClick={handleOrder}
                    className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-gray-600 hover:bg-gray-900 text-white">
                    {isLoading ? "Processing..." : "Complete Purchase"}
                  </button>
                </div>
                {error && (
                  <div className="text-red-500 mt-4">{error.message}</div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orderpage;
