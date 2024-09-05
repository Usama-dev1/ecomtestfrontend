import { apiSlice } from "./apiSlice";
export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: `products`}),
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query({
      query: (id) => ({ url:`products/${id}` }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const { useGetProductsQuery, useGetProductByIdQuery } = productSlice;
