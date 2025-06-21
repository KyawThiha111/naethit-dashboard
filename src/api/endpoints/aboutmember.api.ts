import { baseAPI } from "../base.config";
import { tagTypeData } from "../tagTypes";
export const memberApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createMember: builder.mutation({
      query: (data) => ({
        url: "/pages/teammember",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypeData.AboutTeamMember],
    }),
    getAllMember: builder.query({
      query: () => ({
        url: "/pages/teammember",
        method: "GET",
      }),
      providesTags: [tagTypeData.AboutTeamMember],
    }),
    deleteMember: builder.mutation({
      query: ({ id }) => ({
        url: `/pages/teammember/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypeData.AboutTeamMember],
    }),
    getEachMember: builder.query({
      query: ({ memberid }) => ({
        url: `/pages/teammember/${memberid}`,
        method: "GET",
      }),
      providesTags: [tagTypeData.AboutTeamMember],
    }),
    editMember: builder.mutation({
      query: ({ memberid, data }) => ({
        url: `/pages/teammember/${memberid}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypeData.AboutTeamMember],
    }),
  }),
});

export const {
  useCreateMemberMutation,
  useGetAllMemberQuery,
  useDeleteMemberMutation,
  useGetEachMemberQuery,
  useEditMemberMutation,
} = memberApi;
