/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useEditServiceBannerMutation,
  useGetServiceBannerQuery,
} from "@/api/endpoints/service.api";
import ServiceBannerImgsUpload from "@/components/pages/ServiceBannerImgsUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const url = import.meta.env.VITE_BACKEND_URL;

export default function ServicesBannerPage() {
  const [defaultImgs, setDefaultImgs] = useState({
    banner_img: "" as string,
    blog1_img: "" as string,
    blog2_img: "" as string,
  });
  const [imgs, setImgs] = useState({
    banner_img: null as File | null,
    blog1_img: null as File | null,
    blog2_img: null as File | null,
  });
  const { data: serviceBannerInfo, isLoading } = useGetServiceBannerQuery({});
  const [editServiceBanner, { isLoading: loadEdit }] =
    useEditServiceBannerMutation();
  const { register, handleSubmit, setValue } = useForm<ServiceBanner>({});
  const handleEdit = async (data: ServiceBanner) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imgs.banner_img) {
      formData.append("banner_bg_img", imgs.banner_img);
    }
    if (imgs.blog1_img) {
      formData.append("blog1_img", imgs.blog1_img);
    }
    if (imgs.blog2_img) {
      formData.append("blog2_img", imgs.blog2_img);
    }
    try {
      const res = await editServiceBanner(formData).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  useEffect(() => {
    if (serviceBannerInfo) {
      setValue("header_en", serviceBannerInfo?.data?.header_en);
      setValue("header_my", serviceBannerInfo?.data?.header_my);
      setValue("subheader_en", serviceBannerInfo?.data?.subheader_en);
      setValue("subheader_my", serviceBannerInfo?.data?.subheader_my);
      setValue("blog1_en", serviceBannerInfo?.data?.blog1_en);
      setValue("blog1_my", serviceBannerInfo?.data?.blog1_my);
      setValue("blog2_en", serviceBannerInfo?.data?.blog2_en);
      setValue("blog2_my", serviceBannerInfo?.data?.blog2_my);
      setDefaultImgs({
        banner_img: url + serviceBannerInfo?.data?.banner_bg_img,
        blog1_img: url + serviceBannerInfo?.data?.blog1_img,
        blog2_img: url + serviceBannerInfo?.data?.blog2_img,
      });
      setImgs({
        banner_img: serviceBannerInfo?.data?.banner_bg_img,
        blog1_img:serviceBannerInfo?.data?.blog1_img,
        blog2_img: serviceBannerInfo?.data?.blog2_img,
      });
    }
  }, [serviceBannerInfo]);
  return (
    <div>
      {isLoading ? (
        <div className=" bg-gray-200 rounded-lg min-h-[calc(100vh-100px)]"></div>
      ) : (
        <form action="" onSubmit={handleSubmit(handleEdit)}>
          <div>
            <h3 className="">Edit Service Banner Info</h3>
            <div className=" mt-5 space-y-3">
              <div className=" grid lg:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="header-en" className=" text-gray-600">
                    Header (en)
                  </Label>
                  <Input
                    id="header-en"
                    type="text"
                    {...register("header_en")}
                    className=" bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="header-my" className=" text-gray-600">
                    Header (my)
                  </Label>
                  <Input
                    id="header-my"
                    type="text"
                    {...register("header_my")}
                    className=" bg-white"
                  />
                </div>
              </div>
              <div className=" grid lg:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="subheader-en" className=" text-gray-600">
                    Sub Header (en)
                  </Label>
                  <Input
                    id="subheader-en"
                    type="text"
                    {...register("subheader_en")}
                    className=" bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="subheader-my" className=" text-gray-600">
                    Sub Header (my)
                  </Label>
                  <Input
                    id="subheader-my"
                    type="text"
                    {...register("subheader_my")}
                    className=" bg-white"
                  />
                </div>
              </div>
              <h2 className="text-blue-700 font-bold text-xl">You can edit the texts and images of the contents on the service page here.</h2>
              <div className=" grid lg:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="blog1-en" className=" text-gray-600">
                    Blog 1 (en)
                  </Label>
                  <Textarea
                    id="blog1-en"
                    rows={4}
                    {...register("blog1_en")}
                    className=" bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="blog1-my" className=" text-gray-600">
                    Blog 1 (my)
                  </Label>
                  <Textarea
                    id="blog1-my"
                    rows={4}
                    {...register("blog1_my")}
                    className=" bg-white"
                  />
                </div>
              </div>
              <div className=" grid lg:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="blog2-en" className=" text-gray-600">
                    Blog 2 (en)
                  </Label>
                  <Textarea
                    id="blog2-en"
                    rows={4}
                    {...register("blog2_en")}
                    className=" bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="blog2-my" className=" text-gray-600">
                    Blog 2 (my)
                  </Label>
                  <Textarea
                    id="blog2-my"
                    rows={4}
                    {...register("blog2_my")}
                    className=" bg-white"
                  />
                </div>
              </div>

              <ServiceBannerImgsUpload
                defaultImages={defaultImgs}
                onImageChange={(data) => setImgs(data)}
              />

              <div className=" pt-5">
                <Button className=" bg-secondary-blue text-white hover:bg-secondary-blue">
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
