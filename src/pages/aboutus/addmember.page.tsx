/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCreateMemberMutation } from "@/api/endpoints/aboutmember.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface FormDataType {
  name_en: string;
  name_my: string;
  position_en: string;
  position_my: string;
  memberphoto: FileList;
}
export default function AddTeamMember() {
  const navigate = useNavigate();
  const [createMember, { isLoading }] = useCreateMemberMutation();
  const [imageURlPreview, setImageUrlPreview] = useState<string | null>(null);
  const { register, handleSubmit, watch } = useForm<FormDataType>();

  const onSubmit: SubmitHandler<FormDataType> = async (data) => {
    const formData = new FormData();
    formData.append("name_en", data?.name_en);
    formData.append("name_my", data?.name_my);
    formData.append("position_en", data?.position_en);
    formData.append("position_my", data?.position_my);
    if (data.memberphoto && data.memberphoto.length > 0) {
      formData.append("memberphoto", data?.memberphoto[0]);
    }
    try {
      const res = await createMember(formData).unwrap();
      if (res.success) {
        toast.success(res?.message || "Successful!");
        setImageUrlPreview(null);
        navigate("/teammember/list");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "An error occured!");
    }
  };

  const memeberphotoList = watch("memberphoto");
  useEffect(() => {
    if (memeberphotoList && memeberphotoList.length > 0) {
      const file = memeberphotoList[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      setImageUrlPreview(URL.createObjectURL(file));
    }
  }, [memeberphotoList]);
  return (
    <div>
      <h1>Add team member!</h1>
      <div className=" mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className=" space-y-1">
              <Label htmlFor="name_en" className=" text-gray-600">
                Name (en)
              </Label>
              <Input
                {...register("name_en")}
                type="text"
                className=" bg-white"
                placeholder="Type Name in English"
                id="name_en"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name-my" className=" text-gray-600">
                Name (my)
              </Label>
              <Input
                {...register("name_my")}
                type="text"
                className=" bg-white"
                placeholder="Type name in Burmese"
                id="name-my"
              />
            </div>

            <div className=" space-y-1">
              <Label htmlFor="position_en" className=" text-gray-600">
                Position (en)
              </Label>
              <Input
                {...register("position_en")}
                type="text"
                className=" bg-white"
                placeholder="Type Postion in English"
                id="position_en"
              />
            </div>
            <div className=" space-y-1">
              <Label htmlFor="position_my" className=" text-gray-600">
                Position (en)
              </Label>
              <Input
                {...register("position_my")}
                type="text"
                className=" bg-white"
                placeholder="Type Postion in English"
                id="position_my"
              />
            </div>
            <div className={`flex flex-col col-span-1 lg:col-span-2`}>
              <Label className=" text-gray-600 mb-2">Upload Image</Label>
              {imageURlPreview && (
                <div className="relative group w-fit bg-white">
                  <img
                    src={imageURlPreview}
                    alt="Preview"
                    className=" h-40 w-auto object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setImageUrlPreview("")}
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
                {...register("memberphoto")}
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
  );
}
