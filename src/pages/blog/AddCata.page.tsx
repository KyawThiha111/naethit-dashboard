import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";

import { toast } from "react-hot-toast";
import { useAddCataMutation } from "@/api/endpoints/blogcata.api";
import { useGetCataQuery } from "@/api/endpoints/blogcata.api";
import DeleteCataBtn from "@/components/action/DeleteCataBtn";
interface FormType {
  cata_name: string;
}
export default function AddCata() {
  const { register, handleSubmit } = useForm<FormType>();
  const [addCata, { isLoading: AddLoading }] = useAddCataMutation();
  const {data:CataData,isLoading:DataLoading} = useGetCataQuery({})
  const Submit: SubmitHandler<FormType> = async (data) => {
    try {
      const res = await addCata(data).unwrap();
      if (res.success) {
        toast.success(res?.message || "Add a new Catagory");
      }
    } catch (error:any) {
      console.log(error);
      alert(error?.data?.message);
    }
  };
  return (
    <div>
      <h1 className="text-center text-xl font-bold">Catagory Add and Delete</h1>
      <div className="w-[50%] mx-auto py-10 my-5 bg-gray-100 shadow-2xl">
        <h2 className="text-center font-bold">Add a new catagory</h2>
        <div>
          <form
            onSubmit={handleSubmit(Submit)}
            className="flex justify-center mt-5 w-[80%] mx-auto"
          >
            <Input
              type="text"
              className="bg-white text-gray-500 rounded-r-none w-full"
              placeholder="New Catagory for blogs"
              id="cata_name"
              {...register("cata_name", { required: true })}
            />
            <Button
              type="submit"
              className="bg-secondary-yellow text-white rounded-l-none"
            >
              {AddLoading ? "..." : "Update"}
            </Button>
          </form>
        </div>
      </div>
      <div className="w-[50%] mx-auto py-10 my-5 bg-gray-100 shadow-2xl">
      <h2 className="text-center font-bold">Existing Catagories</h2>
      {
        DataLoading?(
            <div>...Loading</div>
        ):(
            <div className="w-[50%] mx-auto">
               <ul>
                {CataData?.data.map((cata:TypeOfEachCata,index:number)=>(
                  <li key={index} className="flex justify-between py-3">
                       <p className=" text-blue-900 font-bold">{index+1}{". "}{cata?.cata_name}</p>
                       <DeleteCataBtn blogId={cata?._id}/>
                    </li>
                ) 
                )}
               </ul>
            </div>
        )
      }
      </div>
    </div>
  );
}
