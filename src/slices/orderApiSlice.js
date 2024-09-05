import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `orders`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `orders/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
      keepUnusedDataFor: 5,
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: "/config/paypal",
      }),
      keepUnusedDataFor: 5,
    }),
    allCustomerOrders: builder.query({
      query: () => ({
        url: "/orders/mine",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useAllCustomerOrdersQuery,
} = orderApiSlice;
