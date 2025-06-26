import { tagTypeData } from "../tagTypes";
import { baseAPI } from "../base.config";

export const AdminsAPI = baseAPI.injectEndpoints({
    endpoints:(build)=>({
        getAdminData:build.query({
          query:()=>({
            url:"/admin/getadmins",
            method:"GET",
          }),
          providesTags:[tagTypeData.Admin]
        }),
        createAdmin:build.mutation({
            query:(data)=>({
                url:"/admin/signup",
                method:"POST",
                body:data
            }),
            invalidatesTags:[tagTypeData.Admin]
        }),
        verifyCreateAdmin:build.mutation({
            query:(data)=>({
                url:"/admin/signupverify",
                method:"POST",
                body:data
            }),
            invalidatesTags:[tagTypeData.Admin]
        }),
        deleteAdmin:build.mutation({
            query:({id})=>({
           url:`/admin/deleteadmin/${id}`,
           method:"DELETE"
        }),
        invalidatesTags:[tagTypeData.Admin]
        })
    })
})

export const {useGetAdminDataQuery,useCreateAdminMutation,useVerifyCreateAdminMutation,useDeleteAdminMutation} = AdminsAPI