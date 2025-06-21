/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateMissionMutation } from "@/api/endpoints/aboutmission.api";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SubmitHandler } from "react-hook-form";
interface MissionDataType {
  titleen: string;
  titlemy: string;
  missionen: string;
  missionmy: string;
}

const AboutMissionCreate = () => {
  const [createMission, { isLoading }] = useCreateMissionMutation();
  const { register, handleSubmit } = useForm<MissionDataType>();

  const HandleCreateMission: SubmitHandler<MissionDataType> = async (data) => {
    try {
      const res = await createMission(data).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      console.log(error);
      alert(error?.data?.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create New Mission
      </h2>

      <form onSubmit={handleSubmit(HandleCreateMission)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              English Content
            </h3>

            <div>
              <Label
                htmlFor="titleen"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title (English)
              </Label>
              <Input
                {...register("titleen")}
                type="text"
                id="titleen"
                name="titleen"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter English title"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="missionen"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mission (English)
              </Label>
              <Textarea
                {...register("missionen")}
                id="missionen"
                name="missionen"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter English mission statement"
                required
              />
            </div>
          </div>

          {/* Myanmar Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Myanmar Content
            </h3>

            <div>
              <Label
                htmlFor="titlemy"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title (Myanmar)
              </Label>
              <Input
                {...register("titlemy")}
                type="text"
                id="titlemy"
                name="titlemy"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Myanmar title"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="missionmy"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mission (Myanmar)
              </Label>
              <Textarea
                {...register("missionmy")}
                id="missionmy"
                name="missionmy"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Myanmar mission statement"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "CREATE MISSION"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutMissionCreate;
