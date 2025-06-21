import { useVerifyMutation } from "@/api/endpoints/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

export default function VerifyPage() {
  //   const navigate = useNavigate();
  const [codeVerify, { isLoading }] = useVerifyMutation();
  const { register, handleSubmit } = useForm<VerifyFormType>();
  const handleLogin = async (data: VerifyFormType) => {
    try {
      await codeVerify({ ...data }).unwrap();
      //   navigate("/verify");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full h-screen grid place-items-center">
      <div className=" min-w-[300px]">
        <h2 className=" text-xl font-semibold text-center mb-5">OTP Code</h2>
        <form
          action=""
          onSubmit={handleSubmit(handleLogin)}
          className=" space-y-3"
        >
          <Input
            type="number"
            placeholder="Enter your otp code"
            {...register("tokencode", { required: true })}
            className=" appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <Button className=" w-full mt-2 bg-secondary-yellow hover:bg-secondary-yellow text-white">
            {isLoading ? "..." : "Verify Code"}
          </Button>
        </form>
      </div>
    </div>
  );
}
