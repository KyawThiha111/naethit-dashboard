/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useEditTestimonialMutation,
  useGetTestimonialDetailQuery,
} from "@/api/endpoints/home.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ROUTE_PATH } from "@/constants/route";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
export default function TestimonialsEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading: isSingleLoading } = useGetTestimonialDetailQuery({
    id,
  });
  const [updateTestimonial, { isLoading }] = useEditTestimonialMutation();
  const { register, handleSubmit, setValue } =
    useForm<Omit<TestimonialType, "_id">>();
  const handleEdit = async (data: Omit<TestimonialType, "_id">) => {
    try {
      const res = await updateTestimonial({ data, id }).unwrap();
      if (res.success) {
        toast.success(res.mesage);
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  useEffect(() => {
    if (data) {
      setValue("patient_name_en", data?.testimonal?.patient_name_en);
      setValue("patient_name_my", data?.testimonal?.patient_name_my);
      setValue("patient_type_en", data?.testimonal?.patient_type_en);
      setValue("patient_type_my", data?.testimonal?.patient_type_my);
      setValue("note_en", data?.testimonal?.note_en);
      setValue("note_my", data?.testimonal?.note_my);
    }
  }, [data]);

  if (isSingleLoading) {
    return <div className=" w-full min-h-[70vh] bg-gray-200 "></div>;
  }
  return (
    <div>
      <div>
        <button
          className=" flex items-center gap-3 font-medium mb-5 cursor-pointer"
          onClick={() => navigate(ROUTE_PATH.HOME.TESTIMONIAL.LIST)}
        >
          <ChevronLeft size={20} />
          <span>Back to List</span>
        </button>
      </div>
      <h3>Edit Testimonial</h3>
      <div className=" mt-5">
        <form action="" onSubmit={handleSubmit(handleEdit)}>
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className=" space-y-1">
              <Label className=" text-gray-500 block">Patient Name (en)</Label>
              <Input
                type="text"
                className=" bg-white"
                {...register("patient_name_en", { required: true })}
              />
            </div>
            <div className=" space-y-1">
              <Label className=" text-gray-500 block">Patient Name (my)</Label>
              <Input
                type="text"
                className=" bg-white"
                {...register("patient_name_my", { required: true })}
              />
            </div>
            <div className=" space-y-1">
              <Label className=" text-gray-500 block">Patient Type (en)</Label>
              <Input
                type="text"
                className=" bg-white"
                {...register("patient_type_en", { required: true })}
              />
            </div>
            <div className=" space-y-1">
              <Label className=" text-gray-500 block">Patient Type (my)</Label>
              <Input
                type="text"
                className=" bg-white"
                {...register("patient_type_my", { required: true })}
              />
            </div>
            <div className=" space-y-1">
              <Label htmlFor="patient-note-en" className=" text-gray-500 block">
                Patient Note (en)
              </Label>
              <Textarea
                id="patient-note-en"
                rows={5}
                {...register("note_en", { required: true })}
                className=" bg-white"
              />
            </div>
            <div className=" space-y-1">
              <Label htmlFor="patient-note-my" className=" text-gray-500 block">
                Patient Note (my)
              </Label>
              <Textarea
                id="patient-note-my"
                rows={5}
                {...register("note_my", { required: true })}
                className=" bg-white"
              />
            </div>
            <div>
              <Button className=" bg-secondary-yellow text-white hover:bg-secondary-yellow">
                {isLoading ? "loading" : "Update"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
