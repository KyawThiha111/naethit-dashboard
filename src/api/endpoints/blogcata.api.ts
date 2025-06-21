import { baseAPI } from "../base.config";
import { tagTypeData } from "../tagTypes";

export const BlogCataApi = baseAPI.injectEndpoints({
    endpoints:(builder)=>({
        getCata:builder.query({
            query:()=>({
             url:"/pages/blogcatagory",
             method:"GET"
            }),
            providesTags:[tagTypeData.BlogCata]
        }),
        AddCata:builder.mutation({
            query:(data)=>({
              url:"/pages/blogcatagory",
              method:"POST",
              body:data
            }),
           invalidatesTags:[tagTypeData.BlogCata] 
        }),
        DeleteCata:builder.mutation({
            query:({id})=>({
              url:`/pages/blogcatagory/${id}`,
              method:"DELETE"
            }),
            invalidatesTags:[tagTypeData.BlogCata]
        })
    })
})

export const {useGetCataQuery,useAddCataMutation,useDeleteCataMutation} = BlogCataApi;
