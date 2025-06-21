import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { systemLogout } from "@/redux/auth.slice";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LogoutBtn({ toggle }: { toggle?: () => void }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger
        onClick={() => setOpen(true)}
        className=" flex gap-2 items-center px-3 py-2"
      >
        <LogOut size={18} />
        <p>Log out</p>
      </AlertDialogTrigger>
      <AlertDialogContent className=" bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to logout?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false);
              if (toggle) toggle();
            }}
            className=" bg-gray-800 text-white"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className=" bg-red-500 hover:bg-red-500 text-white"
            onClick={() => {
              dispatch(systemLogout());
              setOpen(false);
              if (toggle) toggle();
            }}
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
