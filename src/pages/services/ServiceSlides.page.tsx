import { useGetServiceSlidesQuery } from "@/api/endpoints/serviceslide.api";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import DeleteServiceSlideBtn from "@/components/action/DeleteServiceSlide";
export default function ShowServiceSlide() {
  const { data: ServiceSlideData, isLoading: GetLoading } =
    useGetServiceSlidesQuery({});

  if (GetLoading) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  if (!ServiceSlideData) {
    return <div className="text-center py-10 text-red-500">No data found.</div>;
  }

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Service Slides
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ServiceSlideData.slides.map((data: any, index: number) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden p-4 border border-gray-100 hover:shadow-lg transition duration-200"
          >
            <h2 className="text-xl font-bold text-center  mb-2">{index+1}</h2>
            <h2 className="text-lg font-medium mb-2 text-gray-700">
              Name: <span className="text-black font-bold">{data?.slidename}</span>
            </h2>

            <div className="mb-4">
              <p className="text-sm text-gray-500 italic mb-1">For larger screen:</p>
              <img
                src={`${BACKEND_URL}${data?.lgscreenphoto}`}
                alt="Large Screen"
                className="h-40 w-full object-cover rounded-md border"
              />
            </div>

            <div>
              <p className="text-sm italic text-gray-500 mb-1">For moblie screen</p>
              <img
                src={`${BACKEND_URL}${data?.smscreenphoto}`}
                alt="Small Screen"
                className="h-40 w-full object-cover rounded-md border"
              />
            </div>
            {/* Delete Btn */}

           <div className="text-center mt-3">
             <DeleteServiceSlideBtn id={data._id}/>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
}

