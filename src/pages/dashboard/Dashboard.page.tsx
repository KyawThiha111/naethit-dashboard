import { useGetCountDatasQuery } from "@/api/endpoints/home.api";
import ChartOne from "@/components/charts/ChartOne";
import ChartTwo from "@/components/charts/ChartTwo";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data, isLoading } = useGetCountDatasQuery({});
  const countDatas = data as CountDatasType;
  const clinics = countDatas?.formattedCountData?.clinicCount || {};
  const services = countDatas?.formattedCountData?.services || {};
  const testimonials = countDatas?.formattedCountData?.testimonalsCount || {};
  const blogs = countDatas?.formattedCountData?.blogsCount || {};
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {["", "", "", ""].map((_, idx) => (
          <Skeleton
            key={idx}
            className="w-full rounded-xl bg-gray-200 p-5 h-[100px]"
          ></Skeleton>
        ))}
      </div>
    );
  }
  if (!countDatas?.formattedCountData) return <p>Data not found</p>;
  return (
    <div className=" space-y-5">
      <div className=" grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        <ChartOne title={String(clinics.count)} subtitle={clinics.title} />
        <ChartOne title={String(services.count)} subtitle={services.title} />
        <ChartOne
          title={String(testimonials.count)}
          subtitle={testimonials.title}
        />
        <ChartOne title={String(blogs.count)} subtitle={blogs.title} />
      </div>
      <div className=" grid lg:grid-cols-2 gap-5">
        <ChartTwo />
        <ChartTwo />
      </div>
      <div>
        <ChartTwo />
      </div>
    </div>
  );
}
