import { baseAPI } from "../base.config";

export const aboutbannerApi = baseAPI.injectEndpoints({
    endpoints:(builder)=>({
        getAboutBanner:builder.query({
            query:()=>({url:"/pages/aboutbannergetall", method:"GET"})
        }),
        editAboutBanner: builder.mutation({
            query:({data})=>({
             url:"/pages/aboutbanner",
             method:"PUT",
             body:data
            })
        })
    })
})

export const {useGetAboutBannerQuery,useEditAboutBannerMutation} = aboutbannerApi;