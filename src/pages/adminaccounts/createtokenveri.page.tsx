import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useForm,SubmitHandler} from "react-hook-form"
import { useVerifyCreateAdminMutation } from "@/api/endpoints/getadmin.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface FormType{
    tokencode:string
}
export default function CreateVerify(){
    const {register,handleSubmit} = useForm<FormType>()
    const [verifyCode, {isLoading}] = useVerifyCreateAdminMutation()
    const navigate = useNavigate()
    const Submit:SubmitHandler<FormType> = async(data)=>{
       try {
         const res = await verifyCode(data).unwrap();
         if(res.success){
            toast.success(res.message)
            navigate("/admins/showadmins")
         }
       } catch (error) {
          console.log(error)
          alert("Delete the created account and try again!")
       }
    }
    return (
        <div className=" w-full h-screen grid place-items-center">
          <div className=" min-w-[300px]">
            <h2 className=" text-xl font-semibold text-center mb-5">OTP Code</h2>
            <form
             onSubmit={handleSubmit(Submit)}
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