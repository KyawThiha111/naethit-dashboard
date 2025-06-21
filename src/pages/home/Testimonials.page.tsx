import { useGetTestimonialsQuery } from "@/api/endpoints/home.api";
import DeleteTestimonialBtn from "@/components/action/DeleteTestimonialBtn";
import { Button } from "@/components/ui/button";
import { ROUTE_PATH } from "@/constants/route";
import { PenSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function TestimonialsPage() {
  const { data: testimonials, isLoading } = useGetTestimonialsQuery({});
  if (isLoading) return <p>Loading</p>;
  if (!testimonials) return <p>Data not found</p>;
  return (
    <div>
      <h3>Testimonial Lists</h3>
      <div className=" flex justify-between my-3">
        <p>Total : {testimonials?.FormattedResponse?.length}</p>
        <Link to={ROUTE_PATH.HOME.TESTIMONIAL.CREATE}>
          <Button className=" bg-secondary-blue text-white hover:bg-secondary-blue">
            Add New
          </Button>
        </Link>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {testimonials?.FormattedResponse?.map(
          (item: TestimonialType, idx: number) => (
            <div key={idx} className="flex flex-col  p-3 rounded-lg bg-white">
              <div className="space-y-2 mb-5">
                <h5 className=" text-lg font-semibold">
                  {item.patient_name_en}
                </h5>
                <p className=" text-gray-600">{item.patient_type_en}</p>
                <p className=" text-gray-700">{item.note_en}</p>
              </div>
              <div className=" flex justify-between py-2 border-t-2 mt-auto">
                <p>Action :</p>
                <div className=" flex items-center gap-3">
                  <Link
                    to={`/testimonials/edit/${item._id}`}
                    className=" block"
                  >
                    <PenSquare size={20} />
                  </Link>
                  <DeleteTestimonialBtn testimonialId={item._id} />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
