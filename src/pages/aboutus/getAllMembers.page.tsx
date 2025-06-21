import { Link, useNavigate } from "react-router-dom";
import { useGetAllMemberQuery } from "@/api/endpoints/aboutmember.api";
import { SquarePen } from "lucide-react";
import DeleteMemberBtn from "@/components/action/DeleteMemberBtn";

export default function GetAllMemberPage() {
  const { data: MemberData, isLoading: FetchLoading } = useGetAllMemberQuery({});
  const navigate = useNavigate();

  if (FetchLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Our Team Members</h2>
        <Link
          to="/teammember/create"
          className="text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md shadow"
        >
          + Add New Member
        </Link>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MemberData?.members?.map((member: any, index: number) => (
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
                src={member?.photo}
                alt={member?.name?.en || "Team Member"}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => navigate(`/teammember/edit/${member?.id}`)}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <SquarePen className="w-5 h-5" />
              </button>
              <DeleteMemberBtn memberId={member?.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
