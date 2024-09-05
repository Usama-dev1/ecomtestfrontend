import React from "react";
import { useAllCustomerOrdersQuery } from "../slices/orderApiSlice";
import { Link } from "react-router-dom";

const CustomerOrderPage = () => {
  const { data, error, isLoading } = useAllCustomerOrdersQuery();
  console.log(data);

  // Handle loading state
  if (isLoading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>Error fetching orders!</p>;

  return (
    <div className="flex justify-center items-center h-full p-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Customer Orders</h1>
        <div className="overflow-x-scroll">
          <table className="min-w-full bg-white border text-center border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 border-b">
                <th className="py-2 px-2 text-left text-sm">No.</th>
                <th className="py-2 px-2 text-left text-sm">Order ID</th>
                <th className="py-2 px-2 text-left text-sm">Delivery Address</th>
                <th className="py-2 px-2 text-left text-sm">Order Date</th>
                <th className="py-2 px-2 text-left text-sm">Total</th>
                <th className="py-2 px-2 text-left text-sm">Paid</th>
                <th className="py-2 px-2 text-left text-sm">Delivery Status</th>
                <th className="py-2 px-2 text-left text-sm">Order Details</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <tr className="border-b" key={order._id}>
                  <td className="py-2 px-2 border-l border-r text-sm">
                    {index + 1}
                  </td>
                  <td className="py-2 px-2 border-r text-sm">
                    <Link
                      to={`/placeorder/${order._id}`}
                      className="text-blue-500 hover:underline">
                      {order._id}
                    </Link>
                  </td>
                  <td className="py-2 px-2 text-sm text-nowrap border-r">
                    {order.shippingAddress.address || "N/A"}
                  </td>
                  <td className="py-2 px-2 text-sm text-nowrap border-r">
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) || "NA"}
                  </td>
                  <td className="py-2 px-2 border-r text-sm">
                    ${order.totalPrice?.toFixed(2) || "N/A"}
                  </td>
                  <td className="py-2 px-2 border-r text-sm">
                    {order.isPaid ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-2 border-r text-sm">
                    {order.isDelivered ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-2 border-r text-sm">
                    <Link
                      to={`/placeorder/${order._id}`}
                      className="text-blue-500 hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderPage;
