import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../slices/orderApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
const GetOrderPage = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isError,
    isLoading,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const {
    data: paypal,
    isLoading: loadingPaypal,
    isError: errorPaypal,
  } = useGetPaypalClientIdQuery();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "restOptions",
          value: {
            "client-id": paypal?.clientId,
            currency: "USD",
          },
          locale: "en_US",
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid && !window.paypal) {
        loadPayPalScript();
      }
    }
  }, [order, paypal, paypalDispatch, loadingPaypal, errorPaypal]);

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
      } catch (err) {
        console.log(err.message);
      }
    });
  };

  const onError = (err) => {
    console.log(err.message);
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => orderID);
  };

  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
  };

  if (isError)
    return (
      <div className="text-red-500 text-2xl w-full mx-auto">
        Error: {isError.message}
      </div>
    );
  if (isLoading) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      {/* Order ID and Status */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold mb-2">Order ID: {order._id}</h1>
        <div className="flex flex-col flex-wrap gap-4 justify-start items-start">
          <span
            className={`text-lg font-bold ${
              order.isPaid ? "text-green-600" : "text-red-600"
            }`}>
            <label className="text-gray-500 mx-5">Payment Status:</label>
            {order.isPaid ? "Paid" : "Not Paid"}
          </span>
          <span
            className={`text-lg font-bold ${
              order.isDelivered ? "text-green-600" : "text-red-600"
            }`}>
            <label className="text-gray-500 mx-5">Delivery Status:</label>
            {order.isDelivered ? "Delivered" : "Pending"}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Order Details */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6 border-b">
            <h3 className="text-2xl font-bold mb-2">Payment Method</h3>
            <p className="text-xl mb-2">{order.paymentMethod}</p>
          </div>
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}</p>
            <p>{order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Order Items</h3>
            <ul className="space-y-4">
              {order.orderItems.map((item) => (
                <li
                  key={item._id}
                  className="flex items-start gap-4 border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.qty}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Order Summary and Checkout */}
        <div className="w-full lg:w-96 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Prices</h3>
            <div className="flex justify-between mb-2">
              <span>Items Price:</span>
              <span>${order.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping Price:</span>
              <span>${order.shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total Price:</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
          {!order.isPaid && (
            <div>
              {loadingPay && <Spinner />}
              {isPending ? (
                <Spinner />
              ) : (
                <div>
                  <div className="relative">
                    <button
                      onClick={onApproveTest}
                      className="rounded-md px-6 my-3 py-3 w-full text-lg tracking-wide bg-gray-600 hover:bg-gray-900 text-white">
                      Paypal payment test
                    </button>
                    <div className="absolute left-0 right-0 flex items-center mt-10 justify-center z-10">
                      <div className="-z-10">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetOrderPage;
