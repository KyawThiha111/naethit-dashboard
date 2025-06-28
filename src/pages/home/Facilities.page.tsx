import { useGetFacilitiesQuery } from "@/api/endpoints/home.api";
import DeleteFacilitieBtn from "@/components/action/DeleteFacilitieBtn";
import { Button } from "@/components/ui/button";
import { ROUTE_PATH } from "@/constants/route";
import { PenSquare } from "lucide-react";
import { Link } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;

export default function FacilitiesPage() {
  const { data: facilities, isLoading } = useGetFacilitiesQuery({});
  if (isLoading) return <p>Loading</p>;
  if (!facilities) return <p>Data not found</p>;
  return (
    <div>
      <h3>Facilities Lists</h3>
      <div className=" flex justify-between my-3">
        <p>Total : {facilities?.facilities?.length}</p>
        <Link to={ROUTE_PATH.HOME.FACILITIES.CREATE}>
          <Button className=" bg-secondary-blue text-white hover:bg-secondary-blue">
            Add New
          </Button>
        </Link>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {facilities?.facilities?.map((item: FacilitieType, idx: number) => (
          <div key={idx} className="flex flex-col  p-3 rounded-lg bg-white">
            <div className="space-y-2 mb-5">
              <div>
                <img
                  src={url + item.photo}
                  alt="photo"
                  className=" w-full h-[200px] object-cover"
                />
              </div>
              <h5 className=" text-lg font-semibold">{item.clinicname_en}</h5>
              <p className=" text-gray-600">{item.openinghr_en}</p>
            </div>
            <div className=" flex justify-between py-2 border-t-2 mt-auto">
              <p>Action :</p>
              <div className=" flex items-center gap-3">
                <Link to={`/facilities/edit/${item._id}`} className=" block">
                  <PenSquare size={20} />
                </Link>
                <DeleteFacilitieBtn facilitieId={item._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
