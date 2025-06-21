import { Link } from "react-router-dom";
import { useGetAllLeadersQuery } from "@/api/endpoints/aboutleader.api";
import DeleteLeaderBtn from "@/components/action/DeleteLeaderBtn";
import { SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = "https://naethitasanv2.onrender.com";
export default function GetAllLeaderPage() {
  const { data: LeaderData, isLoading: FetchLoading } = useGetAllLeadersQuery(
    {}
  );
  const navigate = useNavigate()
  if (FetchLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-600">
        Loading...
      </div>
    );
  }
  
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Our Team Leaders</h2>
        <Link
          to="/ourleader/create"
          className="text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md shadow"
        >
          + Add New Leader
        </Link>
      </div>
      {/* Leader Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {LeaderData?.members?.map((member: any, index: number) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {index + 1}. {member?.name?.en}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{member?.position?.en}</p>

            <div className="overflow-hidden rounded-md border border-gray-300">
              <img
                src={`${BACKEND_URL}${member?.photo}`}
                alt={member?.name?.en || "Team Member"}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => navigate(`/ourleader/edit/${member?.id}`)}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <SquarePen className="w-5 h-5" />
              </button>
              <DeleteLeaderBtn memberId={member?.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
