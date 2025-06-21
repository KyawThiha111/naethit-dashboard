import { baseAPI } from "../base.config";
import { tagTypeData } from "../tagTypes";

export const serviceApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query({
      query: () => ({ url: `/pages/services`, method: "GET" }),
      providesTags: [tagTypeData.Service],
    }),
    getServiceDetail: build.query({
      query: ({ id }) => ({
        url: `/pages/services/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypeData.Service],
    }),
    createService: build.mutation({
      query: (data) => ({
        url: `/pages/services`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypeData.Service],
    }),
    editService: build.mutation({
      query: ({ data, id }) => ({
        url: `/pages/services/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypeData.Service],
    }),
    deleteService: build.mutation({
      query: ({ id }) => ({
        url: `/pages/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypeData.Service],
    }),
    // logout: build.mutation({
    //   query: (body) => ({
    //     url: `/admin/loginverify`,
    //     method: "POST",
    //     body: body,
    //   }),
    // }),
    getServiceBanner: build.query({
      query: () => ({ url: `/pages/servicedata`, method: "GET" }),
      providesTags: [tagTypeData.ServiceBanner],
    }),
    editServiceBanner: build.mutation({
      query: (data) => ({
        url: `/pages/servicedata`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypeData.ServiceBanner],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetServicesQuery,
  useGetServiceDetailQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useEditServiceMutation,
  useGetServiceBannerQuery,
  useEditServiceBannerMutation,
} = serviceApi;
