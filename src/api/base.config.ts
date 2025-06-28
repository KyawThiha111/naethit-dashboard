import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypeData } from "./tagTypes";
import { RootState } from "@/redux/store";
export const baseAPI = createApi({
  reducerPath: "base",
  baseQuery: fetchBaseQuery({
    baseUrl:"https://eise.site/api",
   // baseUrl: import.meta.env.VITE_API_URL,
    // headers: {
    //   "Content-Type": "application/json",
    // },
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const { accessToken: token } = state.auth;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: Object.values(tagTypeData) as string[],
  endpoints: () => ({}),
});
