import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["product", "order", "user"],
  baseQuery: fetchBaseQuery({
<<<<<<< HEAD
    baseUrl: "https://ecomtestrepoapi.vercel.app/api/",
=======
    baseUrl: "ecomtestrepoapi.vercel.app/api/",
>>>>>>> 9830574156b4c2b82d0f96d36e91526550b0fd03
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
