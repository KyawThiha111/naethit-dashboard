/* eslint-disable @typescript-eslint/no-explicit-any */

import { Trash2, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  useDeleteRequestMessageMutation,
  useGetRequestMessageQuery,
} from "@/api/endpoints/contactus.api";
import toast from "react-hot-toast";

export default function RequestPage() {
  const { data, isLoading } = useGetRequestMessageQuery({});
  const [deleteMessage, { isLoading: deleteLoading }] =
    useDeleteRequestMessageMutation();

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      const res = await deleteMessage({ id }).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (!data) {
    return <p>Data not found</p>;
  }

  console.log(data);

  return (
    <div className=" space-y-5">
      <div>
        <h4> User Request Messages</h4>
      </div>
      <div className=" space-y-5">
        {data?.messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No messages found</p>
          </div>
        ) : (
          data?.messages.map((message: RequestMessageType) => (
            <Card key={message._id} className="relative bg-white">
              <CardContent className="p-4 ">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-secondary-blue">
                          {message.sendername}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {message.email}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {message.phone}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2 font-medium">
                        {message.subject}
                      </p>
                      <p className="text-sm leading-relaxed">
                        {message.message}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatTimestamp(message.createdAt)}
                      </div>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete message</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className=" bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Message</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this message from{" "}
                          {message.sendername}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteMessage(message._id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          {deleteLoading ? "..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
