/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useEditHomeBannerInfoMutation,
  useGetHomeBannerInfoQuery,
} from "@/api/endpoints/home.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function HomePageBannerInfoPage() {
  const { data: homeBannerInfo, isLoading } = useGetHomeBannerInfoQuery({});
  const [editInfo, { isLoading: loadEdit }] = useEditHomeBannerInfoMutation();
  const { register, handleSubmit, setValue, watch } = useForm<HomeBannerInfoType>({});

  const [bannerImgPreview, setBannerImgPreview] = useState<string>("");
  const [homepageBlogImgPreview, setHomepageBlogImgPreview] = useState<string>("");

  useEffect(() => {
    if (homeBannerInfo) {
      setValue("header_en", homeBannerInfo?.data?.header_en);
      setValue("header_my", homeBannerInfo?.data?.header_my);
      setValue("description_en", homeBannerInfo?.data?.description_en);
      setValue("description_my", homeBannerInfo?.data?.description_my);
      setValue(
        "homepageblog_title_en",
        homeBannerInfo?.data?.homepageblog_title_en
      );
      setValue(
        "homepageblog_title_my",
        homeBannerInfo?.data?.homepageblog_title_my
      );
      setValue(
        "homepageblog_subtitle_en",
        homeBannerInfo?.data?.homepageblog_subtitle_en
      );
      setValue(
        "homepageblog_subtitle_my",
        homeBannerInfo?.data?.homepageblog_subtitle_my
      );
      setValue("homepageblog_en", homeBannerInfo?.data?.homepageblog_en);
      setValue("homepageblog_my", homeBannerInfo?.data?.homepageblog_my);
      setValue("nom_en", homeBannerInfo?.data?.nom_en);
      setValue("nom_my", homeBannerInfo?.data?.nom_my);
      setValue("nop_en", homeBannerInfo?.data?.nop_en);
      setValue("nop_my", homeBannerInfo?.data?.nop_my);
      setValue("tps_en", homeBannerInfo?.data?.tps_en);
      setValue("tps_my", homeBannerInfo?.data?.tps_my);
      setValue("yos_en", homeBannerInfo?.data?.yos_en);
      setValue("yos_my", homeBannerInfo?.data?.yos_my);

      if (homeBannerInfo?.data?.homepage_banner_bg) {
        setBannerImgPreview(`${BACKEND_URL}${homeBannerInfo?.data?.homepage_banner_bg}`);
      }
      if (homeBannerInfo?.data?.homepage_blog_img) {
        setHomepageBlogImgPreview(`${BACKEND_URL}${homeBannerInfo?.data?.homepage_blog_img}`);
      }
    }
  }, [homeBannerInfo]);

  const bannerImgList = watch("bannerimgFile");
  const blogImgList = watch("blogimgFile");

  useEffect(() => {
    if (bannerImgList && bannerImgList.length > 0) {
      const file = bannerImgList[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      setBannerImgPreview(URL.createObjectURL(file));
    }
  }, [bannerImgList]);

  useEffect(() => {
    if (blogImgList && blogImgList.length > 0) {
      const file = blogImgList[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      setHomepageBlogImgPreview(URL.createObjectURL(file));
    }
  }, [blogImgList]);

  const handleEdit = async (data: HomeBannerInfoType) => {
    const formData = new FormData();
    
    // Append all text fields
    formData.append("header_en", data.header_en || "");
    formData.append("header_my", data.header_my || "");
    formData.append("description_en", data.description_en || "");
    formData.append("description_my", data.description_my || "");
    formData.append("homepageblog_title_en", data.homepageblog_title_en || "");
    formData.append("homepageblog_title_my", data.homepageblog_title_my || "");
    formData.append("homepageblog_subtitle_en", data.homepageblog_subtitle_en || "");
    formData.append("homepageblog_subtitle_my", data.homepageblog_subtitle_my || "");
    formData.append("homepageblog_en", data.homepageblog_en || "");
    formData.append("homepageblog_my", data.homepageblog_my || "");
    formData.append("yos_en", data.yos_en || "");
    formData.append("yos_my", data.yos_my || "");
    formData.append("nop_en", data.nop_en || "");
    formData.append("nop_my", data.nop_my || "");
    formData.append("nom_en", data.nom_en || "");
    formData.append("nom_my", data.nom_my || "");
    formData.append("tps_en", data.tps_en || "");
    formData.append("tps_my", data.tps_my || "");

    // Append files if they exist
    if (data.bannerimgFile && data.bannerimgFile.length > 0) {
      formData.append("homepage_banner_bg", data.bannerimgFile[0]);
    }
    if (data.blogimgFile && data.blogimgFile.length > 0) {
      formData.append("homepage_blog_img", data.blogimgFile[0]);
    }

    try {
      const res = await editInfo(formData).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="bg-gray-200 rounded-lg min-h-[calc(100vh-100px)]"></div>
      ) : (
        <form onSubmit={handleSubmit(handleEdit)}>
          <div>
            <h3 className="">Edit Home Banner Info</h3>
            <div className="mt-5 space-y-3">
              <div className="grid lg:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="header-en" className="text-gray-600">
                    Header (en)
                  </Label>
                  <Input
                    id="header-en"
                    type="text"
                    {...register("header_en")}
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="header-my" className="text-gray-600">
                    Header (my)
                  </Label>
                  <Input
                    id="header-my"
                    type="text"
                    {...register("header_my")}
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="description-en" className="text-gray-600">
                    Description (en)
                  </Label>
                  <Textarea
                    id="description-en"
                    rows={4}
                    {...register("description_en")}
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="description-my" className="text-gray-600">
                    Description (my)
                  </Label>
                  <Textarea
                    id="description-my"
                    rows={4}
                    {...register("description_my")}
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="intro-en" className="text-gray-600">
                    Homepage Blog Title (en)
                  </Label>
                  <Input
                    id="intro-en"
                    type="text"
                    {...register("homepageblog_title_en")}
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="intro-my" className="text-gray-600">
                    Homepage Blog Title (my)
                  </Label>
                  <Input
                    id="intro-my"
                    type="text"
                    {...register("homepageblog_title_my")}
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="intro-sub-en" className="text-gray-600">
                    Homepage Blog SubTitle (en)
                  </Label>
                  <Input
                    id="intro-sub-en"
                    type="text"
                    {...register("homepageblog_subtitle_en")}
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="intro-sub-my" className="text-gray-600">
                    Homepage Blog SubTitle (my)
                  </Label>
                  <Input
                    id="intro-sub-my"
                    type="text"
                    {...register("homepageblog_subtitle_my")}
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="para-en" className="text-gray-600">
                    Homepage Blog (en)
                  </Label>
                  <Textarea
                    id="para-en"
                    rows={5}
                    {...register("homepageblog_en")}
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="para-my" className="text-gray-600">
                    Homepage Blog (my)
                  </Label>
                  <Textarea
                    id="para-my"
                    rows={5}
                    {...register("homepageblog_my")}
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <p className="font-semibold mt-5">Organization Records</p>
                <div className="grid lg:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="yos-en" className="text-gray-600">
                      Years of Services (en)
                    </Label>
                    <Input
                      id="yos-en"
                      type="text"
                      {...register("yos_en")}
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yos-my" className="text-gray-600">
                      Years of Services (my)
                    </Label>
                    <Input
                      id="yos-my"
                      type="text"
                      {...register("yos_my")}
                      className="bg-white"
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="nop-en" className="text-gray-600">
                      Total Number of Patients Treated (en)
                    </Label>
                    <Input
                      id="nop-en"
                      type="text"
                      {...register("nop_en")}
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nop-my" className="text-gray-600">
                      Total Number of Patients Treated (my)
                    </Label>
                    <Input
                      id="nop-my"
                      type="text"
                      {...register("nop_my")}
                      className="bg-white"
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="nom-en" className="text-gray-600">
                      Team Members (en)
                    </Label>
                    <Input
                      id="nom-en"
                      type="text"
                      {...register("nom_en")}
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nom-my" className="text-gray-600">
                      Team Members (my)
                    </Label>
                    <Input
                      id="nom-my"
                      type="text"
                      {...register("nom_my")}
                      className="bg-white"
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="tps-en" className="text-gray-600">
                      Total Population Served (en)
                    </Label>
                    <Input
                      id="tps-en"
                      type="text"
                      {...register("tps_en")}
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tps-my" className="text-gray-600">
                      Total Population Served (my)
                    </Label>
                    <Input
                      id="tps-my"
                      type="text"
                      {...register("tps_my")}
                      className="bg-white"
                    />
                  </div>
                </div>
                {/* IMG */}
                <div className="grid lg:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2">Background Banner Image</label>
                    {bannerImgPreview && (
                      <div className="relative group w-fit bg-white">
                        <img
                          src={bannerImgPreview}
                          alt="Preview"
                          className="h-40 w-auto object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => setBannerImgPreview("")}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                    <input
                      {...register("bannerimgFile")}
                      type="file"
                      className="w-full p-2 border rounded"
                      accept="image/*"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Homepage Blog Image</label>
                    {homepageBlogImgPreview && (
                      <div className="relative group w-fit bg-white">
                        <img
                          src={homepageBlogImgPreview}
                          alt="Preview"
                          className="h-40 w-auto object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => setHomepageBlogImgPreview("")}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                    <input
                      {...register("blogimgFile")}
                      type="file"
                      className="w-full p-2 border rounded"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-5">
                <Button type="submit" className="bg-secondary-blue text-white hover:bg-secondary-blue">
                  {loadEdit ? "Loading ..." : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

