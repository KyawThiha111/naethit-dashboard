import { useLoginMutation } from "@/api/endpoints/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTE_PATH } from "@/constants/route";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { register, handleSubmit } = useForm<LoginFormType>();
  const handleLogin = async (data: LoginFormType) => {
    try {
      const res = await login({ ...data }).unwrap();
      if (res.success) {
        navigate("/verify");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full h-screen grid place-items-center">
      <div className=" min-w-[300px]">
        <h2 className=" text-xl font-semibold text-center mb-5">Admin Login</h2>
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
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <Button className=" w-full mt-2 bg-secondary-yellow hover:bg-secondary-yellow text-white">
            {isLoading ? "..." : "Login"}
          </Button>
          <div>
            <Link to={ROUTE_PATH.RESET_PASSWORD} className=" text-sm underline">
              Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
