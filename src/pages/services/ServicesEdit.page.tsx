/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useEditServiceMutation,
  useGetServiceDetailQuery,
} from "@/api/endpoints/service.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ROUTE_PATH } from "@/constants/route";
import { ChevronLeft } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function ServicesEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: serviceDetail, isLoading: loadingDetail } =
    useGetServiceDetailQuery({ id });
  const [editService, { isLoading }] = useEditServiceMutation();

  const { register, handleSubmit, setValue } = useForm<
    Omit<ServiceType, "_id">
  >({
    defaultValues: {},
  });

  const handleCreate = async (data: Omit<ServiceType, "_id" | "img">) => {
    if (!selectedImage) return alert("Please choose photo");
    console.log(data);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("logo", selectedImage);

    try {
      const res = await editService({ data: formData, id }).unwrap();
      if (res.success) {
        toast.success(res.message);
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (serviceDetail) {
      setPreviewUrl(`${BACKEND_URL}${serviceDetail?.service?.logo}`);
      setSelectedImage(serviceDetail?.service?.logo);
      setValue("title_en", serviceDetail?.service?.title_en);
      setValue("title_my", serviceDetail?.service?.title_my);
      setValue("subtitle_en", serviceDetail?.service?.subtitle_en);
      setValue("subtitle_my", serviceDetail?.service?.subtitle_my);
      setValue("description_en", serviceDetail?.service?.description_en);
      setValue("description_my", serviceDetail?.service?.description_my);
      if(serviceDetail?.service?.showonhomepage==="true"){
        setValue("showonhomepage","true")
      }
    }
  }, [serviceDetail]);

  if (loadingDetail) {
    return <div className="w-full min-h-[70vh] bg-gray-200"></div>;
  }

  return (
    <div>
      <div>
        <button
          className=" flex items-center gap-3 font-medium mb-5 cursor-pointer"
          onClick={() => navigate(ROUTE_PATH.SERVICES.LIST)}
        >
          <ChevronLeft size={20} />
          <span>Back to List</span>
        </button>
      </div>
      <h3>Edit Service</h3>
      <div className=" mt-5">
        <form action="" onSubmit={handleSubmit(handleCreate)}>
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className=" space-y-1">
              <Label className=" text-gray-500 block">Title (en)</Label>
              <Input
                type="text"
                className=" bg-white"
                {...register("title_en", { required: true })}
              />
            </div>
            <div className=" space-y-1">
              <Label className=" text-gray-500 block">Title (my)</Label>
              <Input
                type="text"
                className=" bg-white"
                {...register("title_my", { required: true })}
              />
            </div>
            <div className=" space-y-1">
              <Label className=" text-gray-500 block">Sub Title (en)</Label>
              <Input
                type="text"
                className=" bg-white"
                {...register("subtitle_en", { required: true })}
              />
            </div>
            <div className=" space-y-1">
              <Label className=" text-gray-500 block">Sub Title (my)</Label>
              <Input
                type="text"
                className=" bg-white"
                {...register("subtitle_my", { required: true })}
              />
            </div>
            <div className=" space-y-1">
              <Label htmlFor="patient-note-en" className=" text-gray-500 block">
                Description (en)
              </Label>
              <Textarea
                id="patient-note-en"
                rows={5}
                {...register("description_en")}
                className=" bg-white"
              />
            </div>
            <div className=" space-y-1">
              <Label htmlFor="patient-note-my" className=" text-gray-500 block">
                Description (my)
              </Label>
              <Textarea
                id="patient-note-my"
                rows={5}
                {...register("description_my")}
                className=" bg-white"
              />
            </div>
            <div>
            <div className=" flex items-center gap-3 my-5">
              <input
                type="checkbox"
                {...register("showonhomepage")}
                id="showonhomepage"
              />
              <Label htmlFor="showonhomepage">Show on home page</Label>
            </div>
            <p className="text-green-800 text-bold">{serviceDetail?.service?.showonhomepage==="true" ? "It's shown on homepage now." : "It's show on service page now."}</p>
            </div>
            <div className={`flex flex-col col-span-1 lg:col-span-2`}>
              <Label className=" text-gray-600 mb-2">Upload Logo</Label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />

              {previewUrl ? (
                <div className="relative group w-fit bg-white">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className=" h-40 w-auto object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
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
              ) : (
                <div
                  onClick={triggerFileInput}
                  className="w-40 h-40 flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <svg
                    className="w-10 h-10 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-gray-500 text-center">
                    Click to upload image
                  </span>
                </div>
              )}

              {selectedImage && (
                <div className="mt-2 text-sm text-gray-500 truncate max-w-xs">
                  {selectedImage.name}
                </div>
              )}
            </div>
            <div>
              <Button className=" bg-secondary-yellow text-white hover:bg-secondary-yellow">
                {isLoading ? "loading" : "Edit"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
