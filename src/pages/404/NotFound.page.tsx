import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className=" w-full min-h-[70vh] grid place-items-center">
      <div className="text-center space-y-3">
        <h4 className=" text-gray-600">Page Not Found</h4>
        <h3 className=" text-4xl">404</h3>
        <Link to={"/"} className=" block">
          <Button className=" text-secondary-blue">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
