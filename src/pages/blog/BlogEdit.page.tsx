import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useEditBlogMutation,
  useGetBlogDetailQuery,
} from "@/api/endpoints/blog.api";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTE_PATH } from "@/constants/route";
import { useGetCataQuery } from "@/api/endpoints/blogcata.api";
const categories = [
  { title: "Articles", value: "articles" },
  { title: "Events", value: "events" },
];

export default function BlogEditPage() {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { data: blogDetail, isLoading: isBlogLoading } = useGetBlogDetailQuery(
    { id: blogId },
    { skip: !blogId }
  );

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editBlog, { isLoading }] = useEditBlogMutation();
  const {data:CataData} = useGetCataQuery({});
  const { register, handleSubmit, setValue } = useForm<BlogTypePayload>({
    defaultValues: {
      titleen: blogDetail?.blog?.title?.en || "",
      titlemy: blogDetail?.blog?.title?.my || "",
      descriptionen: blogDetail?.blog?.description?.en || "",
      descriptionmy: blogDetail?.blog?.description?.my || "",
      timelength: blogDetail?.blog?.timelength || "",
      catagory: blogDetail?.blog?.category || "",
      postdate:blogDetail?.blog?.postdate || ""
    },
  });

  const handleCreateBlog = async (data: BlogTypePayload) => {
    if (!selectedImage) return alert("Please choose photo");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("img", selectedImage);

    try {
      const res = await editBlog({ data: formData, id: blogId }).unwrap();
      if (res.success) {
        toast.success(res.message);
        navigate(ROUTE_PATH.BLOG.LIST);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(blogDetail);

  useEffect(() => {
    if (blogDetail) {
      setPreviewUrl(blogDetail.blog.image);
      setSelectedImage(blogDetail.blog.image);
      setValue("titleen", blogDetail?.blog?.title?.en);
      setValue("titlemy", blogDetail?.blog?.title?.my);
      setValue("descriptionen", blogDetail?.blog?.description?.en);
      setValue("descriptionmy", blogDetail?.blog?.description?.my);
      setValue("timelength", blogDetail?.blog?.timelength);
      setValue("catagory", blogDetail?.blog?.category);
      const rawPostDate = blogDetail?.blog?.postdate;
      if(rawPostDate){
        const formattedDate = new Date(rawPostDate).toISOString().split("T")[0];
        setValue("postdate",formattedDate);
      }
    }
  }, [blogDetail]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  return (
    <div>
      <div>
        <button
          className=" flex items-center gap-3 font-medium mb-5 cursor-pointer"
          onClick={() => navigate("/blogs")}
        >
          <ChevronLeft size={20} />
          <span>Back to List</span>
        </button>
      </div>
      {isBlogLoading ? (
        <div>
          <Skeleton className=" w-full h-[calc(100vh-200px)] bg-gray-200"></Skeleton>
        </div>
      ) : (
        <>
          <div>
            <h3>Edit Blog</h3>
          </div>
          <div className=" mt-5">
            <form action="" onSubmit={handleSubmit(handleCreateBlog)}>
              <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className=" space-y-1">
                  <Label htmlFor="title-en" className=" text-gray-500">
                    Title (en)
                  </Label>
                  <Input
                    type="text"
                    className=" bg-white"
                    placeholder="Title (en)"
                    id="title-en"
                    {...register("titleen", { required: true })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="title-my" className=" text-gray-600">
                    Title (my)
                  </Label>
                  <Input
                    type="text"
                    className=" bg-white"
                    placeholder="Title (my)"
                    id="title-my"
                    {...register("titlemy", { required: true })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="description-en" className=" text-gray-600">
                    Content (en)
                  </Label>
                  <Textarea
                    className=" bg-white"
                    placeholder="Content (en)"
                    rows={7}
                    id="description-en"
                    {...register("descriptionen", { required: true })}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="description-my" className=" text-gray-600">
                    Content (my)
                  </Label>
                  <Textarea
                    className=" bg-white"
                    placeholder="Content (my)"
                    rows={7}
                    id="description-my"
                    {...register("descriptionmy", { required: true })}
                  />
                </div>
                <div className=" space-y-1">
                  <Label htmlFor="read-time" className=" text-gray-600">
                    Read Time
                  </Label>
                  <Input
                    type="text"
                    className=" bg-white"
                    placeholder="Read time"
                    id="read-time"
                    {...register("timelength", { required: true })}
                  />
                </div>
                <div className=" space-y-1">
                  <Label htmlFor="postdate" className=" text-gray-600">
                    Post Date
                  </Label>
                  <Input
                    type="date"
                    className=" bg-white"
                    placeholder="Read time"
                    id="postdate"
                    {...register("postdate", { required: true })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="category" className=" text-gray-600">
                    Choose Category
                  </Label>
                  <select
                    id="category"
                    defaultValue={blogDetail?.blog?.category}
                    {...register("catagory", { required: true })}
                    className=" p-2 block w-full"
                  >
                    {CataData?.data?.map((cate:TypeOfEachCata,index:number) => (
                      <option key={index} value={cate.cata_name}>
                        {cate.cata_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <Select
              defaultValue={blogDetail?.blog?.category}
              onValueChange={(e) => setValue("catagory", e)}
              required
            >
              <SelectTrigger className="bg-white w-full ">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className=" bg-white w-full">
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className=" hover:bg-gray-50 cursor-pointer"
                    >
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}
                {/* <Select onValueChange={(e) => setValue("tag", e)} required>
              <SelectTrigger className="bg-white w-full ">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className=" bg-white w-full">
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className=" hover:bg-gray-50 cursor-pointer"
                    >
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}
                <div className={`flex flex-col col-span-1 lg:col-span-2`}>
                  <Label className=" text-gray-600 mb-2">Upload Image</Label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />

                  {previewUrl ? (
                    <div className="relative group w-fit bg-white">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className=" h-40 w-auto object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={triggerFileInput}
                      className="w-40 h-40 flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                    >
                      <svg
                        className="w-10 h-10 text-gray-400 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm text-gray-500 text-center">
                        Click to upload image
                      </span>
                    </div>
                  )}

                  {selectedImage && (
                    <div className="mt-2 text-sm text-gray-500 truncate max-w-xs">
                      {selectedImage.name}
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  className=" bg-secondary-yellow text-white w-fit hover:bg-secondary-yellow"
                >
                  {isLoading ? "..." : " Update"}
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
