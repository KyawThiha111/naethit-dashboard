import { useGetBlogsQuery } from "@/api/endpoints/blog.api";
import DeleteBlogBtn from "@/components/action/DeleteBlogBtn";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";

type BlogType = {
  id: string;
  title: {
    en: string;
  };
  description: {
    en: string;
  };
  image: string;
};

export default function BlogListPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetBlogsQuery({});
  if (isLoading) return <p>Loading ...</p>;
  console.log(data);
  return (
    <div className="">
      <div className=" space-y-2 mb-3">
        <h3>Blogs </h3>
        <div className=" flex items-center justify-between gap-5">
          <p className=" font-medium">Total Blogs - {data.blogs.length}</p>
          <Button
            className=" bg-secondary-blue text-white hover:bg-secondary-blue"
            onClick={() => navigate("/blogs/create")}
          >
            Add New
          </Button>
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {data.blogs.map((blog: BlogType, idx: number) => (
          <div
            key={idx}
            className=" w-full p-3 rounded-lg shadow space-y-3 bg-white"
          >
            <div>
              <img
                src={blog.image}
                alt={blog.title.en}
                className=" w-full max-h-40 object-cover rounded-xl overflow-hidden"
              />
            </div>
            <div>
              <h4 className=" font-medium">{blog.title.en}</h4>
            </div>
            <div className=" flex items-center justify-between border-t-2 pt-2">
              <p className=" text-sm font-medium">Action -</p>
              <div className=" flex items-center gap-3">
                <button onClick={() => navigate(`/blogs/edit/${blog.id}`)}>
                  <SquarePen size={20} />
                </button>
                <DeleteBlogBtn blogId={blog.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
