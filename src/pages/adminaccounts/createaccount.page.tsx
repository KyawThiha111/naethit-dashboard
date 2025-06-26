import { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { useForm,SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useCreateAdminMutation } from "@/api/endpoints/getadmin.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface FormType {
  adminname: string;
  email: string;
  password: string;
  position: string;
}

export default function CreateAccount() {
  const { register,handleSubmit} = useForm<FormType>();
  const [createAdmin, {isLoading}] = useCreateAdminMutation({})
  const navigate = useNavigate()
  const Submit:SubmitHandler<FormType> = async(data)=>{
      try {
        const res = await createAdmin(data).unwrap();
        if(res.success){
         navigate("/admins/verifyaccount")
         toast.success("Enter the code sent to your gmail!")
        }
      } catch (error:any) {
        console.log(error?.data?.message)
        alert(error?.data?.message)
      }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
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

      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Create New Admin Account
        </h2>

        <form onSubmit={handleSubmit(Submit)} className="space-y-6">
          {/* Admin Name */}
          <div>
            <Label
              htmlFor="adminname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Admin Name
            </Label>
            <Input
              {...register("adminname")}
              id="adminname"
              placeholder="Enter admin name"
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Enter password"
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              required
            />
          </div>

          {/* Position */}
          <div>
            <Label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Position
            </Label>
            <Input
              {...register("position")}
              id="position"
              placeholder="Enter position"
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Create Admin"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
