import { useCreateServiceSlideMutation } from "@/api/endpoints/serviceslide.api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface FormType {
  slidename: string;
  lgscreenphoto: FileList;
  smscreenphoto: FileList;
}
export default function CreateServiceSlide() {
  const { register, handleSubmit, watch } = useForm<FormType>();
  const [smimgPreviewUrl, setSmImgPreviewUrl] = useState<string | null>(null);
  const [lgimgPreviewUrl, setLgImgPreviewUrl] = useState<string | null>(null);
  const [addSlide, { isLoading }] = useCreateServiceSlideMutation();
  const smImgPhotoList = watch("smscreenphoto");
  const lgImgPhotoList = watch("lgscreenphoto");
  const navigate = useNavigate();
  const Submit: SubmitHandler<FormType> = async (data) => {
    const fromData = new FormData();
    fromData.append("slidename", data?.slidename);
    if (data.lgscreenphoto && data.lgscreenphoto.length > 0) {
      fromData.append("lgscreenphoto", data.lgscreenphoto[0]);
    }
    if (data.smscreenphoto && data.smscreenphoto.length > 0) {
      fromData.append("smscreenphoto", data.smscreenphoto[0]);
    }
    try {
      const res = await addSlide(fromData).unwrap();
      if (res.success) {
        toast.success(res?.message || "Successful!");
        setLgImgPreviewUrl(null);
        setSmImgPreviewUrl(null);
        navigate("/serviceslide/list");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "An error occured!");
    }
  };
  useEffect(() => {
    if (smImgPhotoList && smImgPhotoList.length > 0) {
      const file = smImgPhotoList[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      setSmImgPreviewUrl(URL.createObjectURL(file));
    }
  }, [smImgPhotoList]);
  useEffect(() => {
    if (lgImgPhotoList && lgImgPhotoList.length > 0) {
      const file = lgImgPhotoList[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      setLgImgPreviewUrl(URL.createObjectURL(file));
    }
  }, [lgImgPhotoList]);
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h2 className="text-2xl text-center">Add New Slide</h2>
          <Link to="/serviceslide/list">
            <h2 className="text-blue-600 hover:text-blue-900 hover:text-xl">
              Service Slide List
            </h2>
          </Link>
        </div>
        <div className=" mt-5">
          <form onSubmit={handleSubmit(Submit)}>
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className=" space-y-1">
                <Label htmlFor="name_en" className=" text-gray-600">
                  Slide Name
                </Label>
                <Input
                  {...register("slidename")}
                  type="text"
                  className=" bg-white"
                  placeholder="Type slide name"
                  id="name_en"
                />
              </div>
              <div className={`flex flex-col col-span-1 lg:col-span-2`}>
                <Label className=" text-gray-600 mb-2">Larger-Screen Image</Label>
                {lgimgPreviewUrl && (
                  <div className="relative group w-fit bg-white">
                    <img
                      src={lgimgPreviewUrl}
                      alt="Preview"
                      className=" h-40 w-auto object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => setLgImgPreviewUrl(null)}
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
                  {...register("lgscreenphoto")}
                  type="file"
                  accept="image/*"
                />
              </div>
              <div className={`flex flex-col col-span-1 lg:col-span-2`}>
                <Label className=" text-gray-600 mb-2">Mobile-Screen Image</Label>
                {smimgPreviewUrl && (
                  <div className="relative group w-fit bg-white">
                    <img
                      src={smimgPreviewUrl}
                      alt="Preview"
                      className=" h-40 w-auto object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => setSmImgPreviewUrl(null)}
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
                  {...register("smscreenphoto")}
                  type="file"
                  accept="image/*"
                />
              </div>
              <Button
                type="submit"
                className=" bg-secondary-yellow text-white w-fit hover:bg-secondary-yellow"
              >
                {isLoading ? "..Posting" : " Create"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
