import {
  useGetAboutBannerQuery,
  useEditAboutBannerMutation,
} from "@/api/endpoints/aboutusbanner.api";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
interface FormData {
  // Text fields
  titleen: string;
  titlemy: string;
  abouten: string;
  aboutmy: string;
  blogtitleen: string;
  blogtitlemy: string;
  blogen: string;
  blogmy: string;
  homepageblogtitle_en: string;
  homepageblogtitle_my: string;
  homepageblog_en: string;
  homepageblog_my: string;
  introductionen: string;
  introductionmy: string;
  //files
  bannerbgimgFile: FileList;
  backgroundblogimgFile: FileList;
  homepageblogimgFile: FileList;
}

const AboutBannerEdit = () => {
  const { register, setValue, handleSubmit, watch } = useForm<FormData>();
  // Fetch data
  const { data: aboutBannerData, isLoading: GetAboutusLoading } =
    useGetAboutBannerQuery({});
  const [updateAboutBanner] = useEditAboutBannerMutation();

  /* Existing photos */
  const [bannerbgimgPreview, setbannerbgimgPreview] = useState<string>("");
  const [backgroundblogimgPreview, setbackgroundblogimgPreview] =
    useState<string>("");
  const [homepgaeblogimgPreview, sethomepgaeblogimgPreview] =
    useState<string>("");
  useEffect(() => {
    if (!aboutBannerData) return;
    const Data = aboutBannerData.data;
    setValue("titleen", Data?.titleen);
    setValue("titlemy", Data?.titlemy);
    setValue("abouten", Data?.abouten);
    setValue("aboutmy", Data?.aboutmy);
    setValue("introductionen", Data?.introductionen);
    setValue("introductionmy", Data?.introductionmy);
    setValue("blogtitleen", Data?.blogtitleen);
    setValue("blogtitlemy", Data?.blogtitlemy);
    setValue("blogen", Data?.blogen);
    setValue("blogmy", Data?.blogmy);
    setValue("homepageblogtitle_en", Data?.homepageblogtitle_en);
    setValue("homepageblogtitle_my", Data?.homepageblogtitle_my);
    setValue("homepageblog_en", Data?.homepageblog_en);
    setValue("homepageblog_my", Data?.homepageblog_my);

    /* Photos URL*/
    setbannerbgimgPreview(Data?.bannerbgimg);
    setbackgroundblogimgPreview(Data?.backgroundblogimg);
    sethomepgaeblogimgPreview(Data?.homepageblogimg);
  }, [aboutBannerData]);

  const bannerbgimgList = watch("bannerbgimgFile");
  const backgroundbgimgList = watch("backgroundblogimgFile");
  const homepageblogimgList = watch("homepageblogimgFile");

  useEffect(() => {
    if (bannerbgimgList && bannerbgimgList.length > 0) {
      const file = bannerbgimgList[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      setbannerbgimgPreview(URL.createObjectURL(file));
    }
  }, [bannerbgimgList]);

  useEffect(() => {
    if (backgroundbgimgList && backgroundbgimgList.length > 0) {
      const file = backgroundbgimgList[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      setbackgroundblogimgPreview(URL.createObjectURL(file));
    }
  }, [backgroundbgimgList]);

  useEffect(() => {
    if (homepageblogimgList && homepageblogimgList.length > 0) {
      const file = homepageblogimgList[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      sethomepgaeblogimgPreview(URL.createObjectURL(file));
    }
  }, [homepageblogimgList]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("titleen", data?.titleen);
    formData.append("titlemy", data?.titlemy);
    formData.append("abouten", data?.abouten);
    formData.append("aboutmy", data?.aboutmy);
    formData.append("blogtitleen", data?.blogtitleen);
    formData.append("blogtitlemy", data?.blogtitlemy);
    formData.append("blogen", data?.blogen);
    formData.append("blogmy", data?.blogmy);
    formData.append("homepageblogtitle_en", data?.homepageblogtitle_en);
    formData.append("homepageblogtitle_my", data?.homepageblogtitle_my);
    formData.append("homepageblog_en", data?.homepageblog_en);
    formData.append("homepageblog_my", data?.homepageblog_my);
    formData.append("introductionen", data?.introductionen);
    formData.append("introductionmy", data?.introductionmy);
    if (data.bannerbgimgFile && data.bannerbgimgFile.length > 0) {
      formData.append("bannerbgimg", data.bannerbgimgFile[0]);
    }
    if (data.backgroundblogimgFile && data.backgroundblogimgFile.length > 0) {
      formData.append("backgroundblogimg", data.backgroundblogimgFile[0]);
    }
    if (data.homepageblogimgFile && data.homepageblogimgFile.length > 0) {
      formData.append("homepageblogimg", data.homepageblogimgFile[0]);
    }

    try {
      const res = await updateAboutBanner({ data: formData }).unwrap();
      if (res.success) {
        toast.success("Successfully updated the aboutus banner!");
      }
    } catch (error) {
      console.log(error);
      alert("An error while updating!");
    }
  };

  if (GetAboutusLoading) return <div>Loading...</div>;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit About Banner</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Text Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Fields */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">English Content</h2>

            <div>
              <Label className="block mb-1">Title (EN)</Label>
              <Input
                {...register("titleen")}
                type="text"
                name="titleen"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <Label className="block mb-1">About (EN)</Label>
              <Textarea
                {...register("abouten")}
                name="abouten"
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>

            <div>
              <Label className="block mb-1">Blog Title (EN)</Label>
              <Input
                {...register("blogtitleen")}
                type="text"
                name="blogtitleen"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <Label className="block mb-1">Blog Content (EN)</Label>
              <Textarea
                {...register("blogen")}
                name="blogen"
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>

            <div>
              <Label className="block mb-1">Homepage Blog Title (EN)</Label>
              <Input
                {...register("homepageblogtitle_en")}
                type="text"
                name="homepageblogtitle_en"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <Label className="block mb-1">Homepage Blog Content (EN)</Label>
              <Textarea
                {...register("homepageblog_en")}
                name="homepageblog_en"
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>

            <div>
              <Label className="block mb-1">Introduction (EN)</Label>
              <Textarea
                {...register("introductionen")}
                name="introductionen"
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>
          </div>

          {/* Myanmar Fields */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Myanmar Content</h2>

            <div>
              <Label className="block mb-1">Title (MY)</Label>
              <Input
                {...register("titlemy")}
                type="text"
                name="titlemy"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <Label className="block mb-1">About (MY)</Label>
              <Textarea
                {...register("aboutmy")}
                name="aboutmy"
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>

            <div>
              <Label className="block mb-1">Blog Title (MY)</Label>
              <Input
                {...register("blogtitlemy")}
                type="text"
                name="blogtitlemy"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <Label className="block mb-1">Blog Content (MY)</Label>
              <Textarea
                {...register("blogmy")}
                name="blogmy"
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>

            <div>
              <Label className="block mb-1">Homepage Blog Title (MY)</Label>
              <Input
                {...register("homepageblogtitle_my")}
                type="text"
                name="homepageblogtitle_my"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <Label className="block mb-1">Homepage Blog Content (MY)</Label>
              <Textarea
                {...register("homepageblog_my")}
                name="homepageblog_my"
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>

            <div>
              <Label className="block mb-1">Introduction (MY)</Label>
              <Textarea
                {...register("introductionmy")}
                name="introductionmy"
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Image Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Banner Background Image */}
          <div>
            <Label className="block mb-2">Banner Background Image</Label>
            {bannerbgimgPreview && (
              <div className="relative group w-fit bg-white">
                <img
                  src={bannerbgimgPreview}
                  alt="Preview"
                  className=" h-40 w-auto object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setbannerbgimgPreview("")}
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
              {...register("bannerbgimgFile")}
              type="file"
              className="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>

          {/* Background Blog Image */}
          <div>
            <label className="block mb-2">Background Blog Image</label>
            {backgroundblogimgPreview && (
              /* Asan */
              <div className="relative group w-fit bg-white">
                <img
                  src={backgroundblogimgPreview}
                  alt="Preview"
                  className=" h-40 w-auto object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setbackgroundblogimgPreview("")}
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
              {...register("backgroundblogimgFile")}
              type="file"
              className="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>

          {/* Homepage Blog Image */}
          <div>
            <label className="block mb-2">Homepage Blog Image</label>
            {homepgaeblogimgPreview && (
              <div className="relative group w-fit bg-white">
                <img
                  src={homepgaeblogimgPreview}
                  alt="Preview"
                  className=" h-40 w-auto object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => sethomepgaeblogimgPreview("")}
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
              {...register("homepageblogimgFile")}
              type="file"
              className="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutBannerEdit;
