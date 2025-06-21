import { baseAPI } from "../base.config";
import { tagTypeData } from "../tagTypes";

export const blogApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: () => ({ url: `/pages/blog`, method: "GET" }),
      providesTags: [tagTypeData.Blog],
    }),
    getBlogDetail: build.query({
      query: ({ id }) => ({
        url: `/pages/blog/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypeData.Blog],
    }),
    createBlog: build.mutation({
      query: (data) => ({
        url: `/pages/blog`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypeData.Blog],
    }),
    editBlog: build.mutation({
      query: ({ data, id }) => ({
        url: `/pages/blog/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypeData.Blog],
    }),
    deleteBlog: build.mutation({
      query: ({ id }) => ({
        url: `/pages/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypeData.Blog],
    }),
    // logout: build.mutation({
    //   query: (body) => ({
    //     url: `/admin/loginverify`,
    //     method: "POST",
    //     body: body,
    //   }),
    // }),
  }),
  overrideExisting: false,
});

export const {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogDetailQuery,
  useEditBlogMutation,
} = blogApi;
