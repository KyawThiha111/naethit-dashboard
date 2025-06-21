import { useDeleteMissionMutation } from "@/api/endpoints/aboutmission.api";
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

export default function DeleteMissionBtn({ missionId }: { missionId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteMission,{isLoading}] = useDeleteMissionMutation();
  const navigate = useNavigate()
  const handleDeleteMission= async () => {
    try {
      const res = await deleteMission({ id: missionId }).unwrap();
      toast.success(res.message);
      setIsOpen(false);
      navigate("/aboutmission/list")
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
            onClick={handleDeleteMission}
          >
            {isLoading ? "..." : "Yes"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
