import { baseAPI } from "../base.config";
import { tagTypeData } from "../tagTypes";

export const homeApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getHomeBannerInfo: build.query({
      query: () => ({ url: `/pages/homepagebanner`, method: "GET" }),
      providesTags: [tagTypeData.HomeBanner],
    }),
    editHomeBannerInfo: build.mutation({
      query: (data) => ({
        url: `/pages/homepagebanner`,
        method: "PUT",
        body: data,
      }),
    }),
    // testimonials api routes
    getTestimonials: build.query({
      query: () => ({ url: `/pages/testimonals`, method: "GET" }),
      providesTags: [tagTypeData.Testimonial],
    }),
    getTestimonialDetail: build.query({
      query: ({ id }) => ({
        url: `/pages/testimonals/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypeData.Testimonial],
    }),
    createTestimonial: build.mutation({
      query: (data) => ({
        url: `/pages/testimonals`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypeData.Testimonial],
    }),
    editTestimonial: build.mutation({
      query: ({ data, id }) => ({
        url: `/pages/testimonals/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypeData.Testimonial],
    }),
    deleteTestimonial: build.mutation({
      query: ({ id }) => ({
        url: `/pages/testimonals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypeData.Testimonial],
    }),
    // facilities api routes
    getFacilities: build.query({
      query: () => ({ url: `/pages/facilities`, method: "GET" }),
      providesTags: [tagTypeData.Facilities],
    }),
    getFacilitieDetail: build.query({
      query: ({ id }) => ({
        url: `/pages/facilities/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypeData.Facilities],
    }),
    createFacilitie: build.mutation({
      query: (data) => ({
        url: `/pages/facilities`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypeData.Facilities],
    }),
    editFacilitie: build.mutation({
      query: ({ data, id }) => ({
        url: `/pages/facilities/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypeData.Facilities],
    }),
    deleteFacilitie: build.mutation({
      query: ({ id }) => ({
        url: `/pages/facilities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypeData.Facilities],
    }),
    getCountDatas: build.query({
      query: () => ({
        url: `/pages/postcounts`,
        method: "GET",
      }),
      providesTags: [
        tagTypeData.Facilities,
        tagTypeData.Service,
        tagTypeData.Testimonial,
        tagTypeData.Blog,
      ],
    }),
  }),
});

export const {
  useGetHomeBannerInfoQuery,
  useEditHomeBannerInfoMutation,
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,
  useEditTestimonialMutation,
  useGetTestimonialsQuery,
  useGetTestimonialDetailQuery,
  useGetFacilitieDetailQuery,
  useGetFacilitiesQuery,
  useCreateFacilitieMutation,
  useEditFacilitieMutation,
  useDeleteFacilitieMutation,
  useGetCountDatasQuery,
} = homeApi;
