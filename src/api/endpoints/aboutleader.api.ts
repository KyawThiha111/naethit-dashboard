
import { baseAPI } from "../base.config";
import { tagTypeData } from "../tagTypes";

export const LeaderApi = baseAPI.injectEndpoints({
    endpoints:(builder)=>({
        createLeader:builder.mutation({
          query:(data)=>({
            url:"/pages/leaders",
            method:"POST",
            body:data
          }),
          invalidatesTags:[tagTypeData.AboutLeader]
        }),
        getAllLeaders: builder.query({
            query:()=>({
              url:"/pages/leaders",
              method:"GET"
            }),
            providesTags:[tagTypeData.AboutLeader]
        }),
        deleteLeader: builder.mutation({
          query:({id})=>({
            url:`/pages/leaders/${id}`,
            method:"DELETE"
          }),
          invalidatesTags:[tagTypeData.AboutLeader]
        }),
        getEachLeader: builder.query({
          query:({id})=>({
            url:`/pages/leaders/${id}`,
            method:"GET"
          }),
          providesTags:[tagTypeData.AboutLeader]
        }),
        editLeader: builder.mutation({
          query:({id,data})=>({
            url:`/pages/leaders/${id}`,
            method:"PUT",
            body:data
          }),
          invalidatesTags:[tagTypeData.AboutLeader]
        })
    })
})

export const {useCreateLeaderMutation,useGetAllLeadersQuery,useDeleteLeaderMutation,useGetEachLeaderQuery,useEditLeaderMutation} = LeaderApi;