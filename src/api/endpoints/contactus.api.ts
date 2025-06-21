import { tagTypeData } from "../tagTypes";
import { baseAPI } from "../base.config";

export const contactApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getContactData: build.query({
      query: () => ({
        url: "/pages/contactdata",
        method: "GET",
      }),
      providesTags: [tagTypeData.ContactData],
    }),
    editContactData: build.mutation({
      query: (data) => ({
        url: "/pages/contactdata",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypeData.ContactData],
    }),
    getRequestMessage: build.query({
      query: () => ({
        url: "/pages/getusermessages",
        method: "GET",
      }),
      providesTags: [tagTypeData.Request],
    }),
    deleteRequestMessage: build.mutation({
      query: ({ id }) => ({
        url: `/pages/deleteusermessage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypeData.Request],
    }),
  }),
});

export const {
  useGetContactDataQuery,
  useEditContactDataMutation,
  useGetRequestMessageQuery,
  useDeleteRequestMessageMutation,
} = contactApi;
