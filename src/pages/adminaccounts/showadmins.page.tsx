import {jwtDecode} from "jwt-decode";
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useGetAdminDataQuery } from "@/api/endpoints/getadmin.api";
import { SearchCheck} from "lucide-react"
import DeleteAdminBtn from "@/components/action/DeleteAdmin";
interface JWTTokenType{
  id: string,
  position: string,
  iat:string,
  exp: string
}
export default function ShowAdmins(){
 const {accessToken} = useSelector((state:RootState)=>state.auth);
 const {data:AdminData,isLoading:adminLoading} = useGetAdminDataQuery({});
 let decoded;
 let loginid:string;
 if (accessToken) {
   decoded = jwtDecode<JWTTokenType>(accessToken);
   loginid = decoded.id;
  console.log("Decoded Token:", decoded);
  console.log("User ID:", loginid);
}
if(adminLoading){
    return <div>...Loading</div>
}
if(!AdminData){
    return <div>...No admin found! Try again.</div>
}
    return(
        <div>
          <h2>Our exisitng admins</h2>
          {AdminData?.data?.map((admin:EachAdmin,index:number)=>{
           return <div
                        key={index}
                        className="border-2 border-black p-5 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <h1 className="text-xl font-bold mb-2">
                          {index + 1}. {admin.adminname}
                          <span>{admin._id===loginid&&(
                            <div className="text-green-700 flex items-center gap-2">
                                <div className="text-gray-700">You</div>
                                <span className="font-bold"><SearchCheck/></span>
                            </div>
                          )}</span>
                        </h1>
                        <p className="text-gray-700">{admin.position}</p>
                        <p className="text-gray-700">{admin.email}</p>
                        <div className="flex justify-between mt-3">
                         {admin._id===loginid&&(
                            <DeleteAdminBtn id={admin._id}/>
                         )}
                        </div>
                      </div>
          })}
        </div>
    )
}