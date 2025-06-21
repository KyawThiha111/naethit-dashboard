import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useGetContactDataQuery,
  useEditContactDataMutation,
} from "@/api/endpoints/contactus.api";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface FormData {
  primary_phone_number: string;
  secondary_phone_number: string | null;
  tertiary_phone_number: string | null;
  primary_email: string;
  secondary_email: string | null;
  tertiary_email: string | null;
  head_office_1: string;
  head_office_2: string | null;
  head_office_3: string | null;
  weekdays_office_hr: string;
  sat_office_hr: string;
  sun_office_hr: string;
}

export default function EditContactPage() {
  const { data: ContactData, isLoading: fetchContactLoading } = useGetContactDataQuery({});
  const { register, setValue, handleSubmit } = useForm<FormData>();
  const [EditContactData, { isLoading: EditLoading }] = useEditContactDataMutation();

  useEffect(() => {
    if (!ContactData) return;
    const data = ContactData?.data;

    setValue("primary_phone_number", data?.primary_phone_number as string);
    setValue("secondary_phone_number", data?.secondary_phone_number as string | null);
    setValue("tertiary_phone_number", data?.tertiary_phone_number as string | null);
    setValue("primary_email", data?.primary_email as string);
    setValue("secondary_email", data?.secondary_email as string | null);
    setValue("tertiary_email", data?.tertiary_email as string | null);
    setValue("head_office_1", data?.head_office_1 as string);
    setValue("head_office_2", data?.head_office_2 as string | null);
    setValue("head_office_3", data?.head_office_3 as string | null);
    setValue("weekdays_office_hr", data?.weekdays_office_hr as string);
    setValue("sat_office_hr", data?.sat_office_hr as string);
    setValue("sun_office_hr", data?.sun_office_hr as string);
}, [ContactData, setValue]);


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await EditContactData(data).unwrap();
      if (res.success) {
        toast.success(res?.message || "Updated the data!");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Error while updating the data");
    }
  };

  if (fetchContactLoading) {
    return <h2 className="text-center text-lg font-semibold text-gray-600">Loading...</h2>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-tr from-white to-blue-50 shadow-lg rounded-xl font-sans">
      <h1 className="text-3xl font-bold text-blue-900 mb-10 text-center">Edit Contact Information</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "primary_phone_number", label: "Primary Phone Number" },
          { name: "secondary_phone_number", label: "Secondary Phone Number" },
          { name: "tertiary_phone_number", label: "Tertiary Phone Number" },
          { name: "primary_email", label: "Primary Email" },
          { name: "secondary_email", label: "Secondary Email" },
          { name: "tertiary_email", label: "Tertiary Email" },
          { name: "head_office_1", label: "Head Office 1" },
          { name: "head_office_2", label: "Head Office 2" },
          { name: "head_office_3", label: "Head Office 3" },
          { name: "weekdays_office_hr", label: "Weekdays Office Hours" },
          { name: "sat_office_hr", label: "Saturday Office Hours" },
          { name: "sun_office_hr", label: "Sunday Office Hours" },
        ].map(({ name, label }) => (
          <div key={name} className="space-y-2">
            <Label htmlFor={name} className="text-blue-800 font-semibold">
              {label}
            </Label>
            <Input
              {...register(name as keyof FormData)}
              type="text"
              id={name}
              className="bg-white border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 rounded-md p-2"
            />
            {!ContactData?.data?.[name as keyof FormData] && (
              <p className="text-sm text-red-400 italic">
                No data saved in the database for this input.
              </p>
            )}
          </div>
        ))}

        <div className="col-span-full mt-8 text-center">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition-all duration-300"
            disabled={EditLoading}
          >
            {EditLoading ? "Updating..." : "Update Contact Info"}
          </Button>
        </div>
      </form>
    </div>
  );
}
