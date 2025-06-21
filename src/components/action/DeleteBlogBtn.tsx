import { useDeleteBlogMutation } from "@/api/endpoints/blog.api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteBlogBtn({ blogId }: { blogId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();
  const handleDeleteBlog = async () => {
    try {
      const res = await deleteBlog({ id: blogId }).unwrap();
      toast.success(res.message);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger onClick={() => setIsOpen(true)}>
        <Trash2 size={20} className=" text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent className=" bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setIsOpen(false)}
            className=" bg-gray-800 text-white"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className=" bg-red-500 hover:bg-red-500 text-white"
            onClick={handleDeleteBlog}
          >
            {isLoading ? "..." : "Yes"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
