import { baseAPI } from "../base.config";
import { tagTypeData } from "../tagTypes";

export const NotiCountApi = baseAPI.injectEndpoints({
    endpoints:(build)=>({
        getCount:build.query({
            query:()=>({
                url:"/pages/noticount",
                method:"GET"
            }),
            providesTags:[tagTypeData.CountNoti]
        }),
        resetCount:build.mutation({
          query:()=>({
            url:"/pages/noticount",
            method:"PUT"
          }),
          invalidatesTags:[tagTypeData.CountNoti]
        })
    })
})

export const {useGetCountQuery,useResetCountMutation} = NotiCountApi;