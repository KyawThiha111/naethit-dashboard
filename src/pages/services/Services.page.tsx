import { useGetServicesQuery } from "@/api/endpoints/service.api";
import DeleteServiceBtn from "@/components/action/DeleteServiceBtn";
import { Button } from "@/components/ui/button";
import { ROUTE_PATH } from "@/constants/route";
import { PenSquare } from "lucide-react";
import { Link } from "react-router-dom";

const api_url = import.meta.env.VITE_BASE_URL;

export default function ServicesPage() {
  const { data, isLoading } = useGetServicesQuery({});
  if (isLoading) {
    return <div className=" w-full min-h-[70vh] bg-gray-200 rounded-lg"></div>;
  }
  if (!data) return <p>data not found</p>;
  return (
    <div>
      <h3>Service Lists</h3>
      <div className=" flex justify-between my-3">
        <p>Total : {data?.services?.length}</p>
        <Link to={ROUTE_PATH.SERVICES.CREATE}>
          <Button className=" bg-secondary-blue text-white hover:bg-secondary-blue">
            Add New
          </Button>
        </Link>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.services?.map((item: ServiceType, idx: number) => (
          <div
            key={idx}
            className=" p-3 rounded-lg bg-white shadow flex flex-col"
          >
            <div className=" space-y-1 mb-5">
              <div className=" pb-3">
                <img
                  src={api_url + `${item.logo}`}
                  alt="logo"
                  className=" h-[60px]"
                />
              </div>
              <h5 className=" text-lg font-semibold">{item.title_en}</h5>
              <p className=" text-gray-600">{item.description_en}</p>
            </div>
            <div className=" flex justify-between py-2 border-t-2 mt-auto">
              <p>Action :</p>
              <div className=" flex items-center gap-3 ">
                <Link to={`/services/edit/${item._id}`} className=" block">
                  <PenSquare size={20} />
                </Link>
                <DeleteServiceBtn serviceId={item._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
