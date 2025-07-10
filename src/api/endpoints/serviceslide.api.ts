import { baseAPI } from "../base.config";
import { tagTypeData } from "../tagTypes";

export const ServiceSlideApi = baseAPI.injectEndpoints({
    endpoints:(build)=>({
        getServiceSlides:build.query({
            query:()=>({
                url:"/pages/serviceslide",
                method:"GET"
            }),
            providesTags:[tagTypeData.ServiceSlide]
        }),
        createServiceSlide:build.mutation({
            query:(data)=>({
                url:"/pages/serviceslide",
                method:"POST",
                body:data
            }),
            invalidatesTags:[tagTypeData.ServiceSlide]
        }),
        deleteServiceSlide:build.mutation({
            query:({id})=>({
                url:`/pages/serviceslide/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:[tagTypeData.ServiceSlide]
        })
    })
})

export const {useGetServiceSlidesQuery,useCreateServiceSlideMutation,useDeleteServiceSlideMutation} = ServiceSlideApi;