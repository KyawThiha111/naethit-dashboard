import { useDeleteMemberMutation } from "@/api/endpoints/aboutmember.api";
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
import { useNavigate } from "react-router-dom";

export default function DeleteMemberBtn({ memberId }: { memberId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteMember,{isLoading}] = useDeleteMemberMutation();
  const navigate = useNavigate()
  const handleDeleteMember= async () => {
    try {
      const res = await deleteMember({ id: memberId}).unwrap();
      toast.success(res.message);
      setIsOpen(false);
      navigate("/teammember/list")
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
            onClick={handleDeleteMember}
          >
            {isLoading ? "..." : "Yes"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
