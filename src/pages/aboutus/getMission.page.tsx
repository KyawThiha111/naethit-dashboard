/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useGetMissionQuery } from "@/api/endpoints/aboutmission.api";
import { SquarePen } from "lucide-react";
import DeleteMissionBtn from "@/components/action/DeleteMissionBtn";
import { useNavigate } from "react-router-dom";
export default function GetMissionPage() {
  const { data: MissionsData, isLoading } = useGetMissionQuery({});
  const navigate = useNavigate();
  if (isLoading) {
    return <div>...Loading</div>;
  }
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl text-gray-700">
            Exisitng missions on the page!
          </h1>
          <p className="text-gray-800">
            You can either edit or delete the mission cards!
          </p>
        </div>

        <Link to="/aboutmission/create">
          <button className="bg-blue-500 py-3 px-4 text-white text-xl">
            Create
          </button>
        </Link>
      </div>

      {/* Missions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {MissionsData?.data?.map((mission: any, index: number) => (
          <div
            key={index}
            className="border-2 border-black p-5 rounded-lg hover:shadow-md transition-shadow"
          >
            <h1 className="text-xl font-bold mb-2">
              {index + 1}. {mission?.title?.en}
            </h1>
            <p className="text-gray-700">{mission?.mission?.en}</p>
            <div className="flex justify-between mt-3">
              <button className="text-blue-800">
                <SquarePen onClick={()=>navigate(`/aboutmission/edit/${mission?._id}`)} />
              </button>
              <DeleteMissionBtn missionId={mission?._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
