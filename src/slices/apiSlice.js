import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["product", "order", "user"],
  baseQuery: fetchBaseQuery({
    baseUrl: "ecomtestrepoapi.vercel.app/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
