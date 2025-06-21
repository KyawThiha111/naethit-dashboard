import { baseAPI } from "../base.config";

export const authApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: `/admin/login`,
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: body,
        // redirect: "follow",
      }),
    }),
    verify: build.mutation({
      query: (body) => ({
        url: `/admin/loginverify`,
        method: "POST",
        body: body,
      }),
    }),
    resetPasswordVerify: build.mutation({
      query: (body) => ({
        url: `/admin/resetpasswordverify`,
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: body,
        // redirect: "follow",
      }),
    }),
    resetPassword: build.mutation({
      query: (body) => ({
        url: `/admin/resetpassword`,
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: body,
        // redirect: "follow",
      }),
    }),
    logout: build.mutation({
      query: (body) => ({
        url: `/admin/loginverify`,
        method: "POST",
        body: body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useVerifyMutation,
  useResetPasswordMutation,
  useResetPasswordVerifyMutation,
} = authApi;
