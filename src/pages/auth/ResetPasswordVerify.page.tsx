/* eslint-disable @typescript-eslint/no-explicit-any */
import { useResetPasswordMutation } from "@/api/endpoints/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTE_PATH } from "@/constants/route";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ResetPasswordType {
  tokencode: string;
  newpassword: string;
  confirmpassword: string;
}

export default function ResetPasswordVerifyPage() {
  const navigate = useNavigate();
  const [reset, { isLoading }] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Omit<ResetPasswordType, "email">>();
  const handleLogin = async (data: Omit<ResetPasswordType, "email">) => {
    try {
      const res = await reset({ ...data }).unwrap();
      if (res.success) {
        toast.success(res.message);
        navigate(ROUTE_PATH.DASHBOARD);
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const password = watch("newpassword");
  return (
    <div className=" w-full h-screen grid place-items-center">
      <div className=" min-w-[300px]">
        <h2 className=" text-xl font-semibold text-center mb-5">
          Reset Password
        </h2>
        <form
          action=""
          onSubmit={handleSubmit(handleLogin)}
          className=" space-y-3"
        >
          <Input
            type="number"
            placeholder="Enter your otp code"
            {...register("tokencode", { required: true })}
            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <Input
            type="password"
            placeholder="Password"
            {...register("newpassword", { required: true })}
          />
          {errors.newpassword && (
            <p className="text-red-500 text-sm">{errors.newpassword.message}</p>
          )}
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmpassword", {
              required: "Please confirm password",
              validate: (value) =>
                value === password || "Password do not match",
            })}
          />
          {errors.confirmpassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmpassword.message}
            </p>
          )}
          <Button className=" w-full mt-2 bg-secondary-yellow hover:bg-secondary-yellow text-white">
            {isLoading ? "..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
