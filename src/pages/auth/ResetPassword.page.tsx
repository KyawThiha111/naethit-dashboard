/* eslint-disable @typescript-eslint/no-explicit-any */
import { useResetPasswordVerifyMutation } from "@/api/endpoints/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTE_PATH } from "@/constants/route";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [verify, { isLoading }] = useResetPasswordVerifyMutation();
  const { register, handleSubmit } = useForm<Omit<LoginFormType, "password">>();
  const handleLogin = async (data: Omit<LoginFormType, "password">) => {
    try {
      const res = await verify({ ...data }).unwrap();
      if (res.success) {
        navigate(ROUTE_PATH.RESET_PASSWORD_VERIFY);
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className=" w-full h-screen grid place-items-center">
      <div className=" min-w-[300px]">
        <h2 className=" text-xl font-semibold text-center mb-5">
          Forgot Password
        </h2>
        <form
          action=""
          onSubmit={handleSubmit(handleLogin)}
          className=" space-y-3"
        >
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <Button className=" w-full mt-2 bg-secondary-yellow hover:bg-secondary-yellow text-white">
            {isLoading ? "..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
