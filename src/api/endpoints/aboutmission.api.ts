import { baseAPI } from "../base.config";
import { tagTypeData } from "../tagTypes";
export const missionApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createMission: builder.mutation({
      query: (data) => ({
        url: "/pages/aboutmission",
        method: "POST",
        body: data,
      }),
      invalidatesTags:[tagTypeData.AboutMission]
    }),
    getMission: builder.query({
      query: () => ({
        url: "/pages/aboutmission",
        method: "GET",
      }),
      providesTags:[tagTypeData.AboutMission]
    }),
    getEachMission:builder.query({
      query:(MissionId)=>({
       url:`/pages/aboutmission/${MissionId}`,
       method:"GET"
      }),
      providesTags:[tagTypeData.AboutMission]
    }),
    editMission:builder.mutation({
      query:({id,data})=>({
        url:`/pages/aboutmission/${id}`,
        method:"PUT",
        body:data
      }),
      invalidatesTags:[tagTypeData.AboutMission]
    }),
    deleteMission:builder.mutation({
      query:({id})=>({
        url:`/pages/aboutmission/${id}`,
        method:"DELETE"
      }),
      invalidatesTags:[tagTypeData.AboutMission]
    })
  }),
});

export const { useCreateMissionMutation, useGetMissionQuery, useGetEachMissionQuery,useEditMissionMutation,useDeleteMissionMutation } = missionApi;
