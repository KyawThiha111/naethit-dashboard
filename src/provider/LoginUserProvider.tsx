import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../constants/route";
import useAuth from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function LoginUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTE_PATH.LOGIN);
    }
  }, [isAuthenticated, navigate]);

  return (
    <>{isAuthenticated && <DashboardLayout>{children}</DashboardLayout>}</>
  );
}
