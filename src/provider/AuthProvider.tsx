import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../constants/route";
import useAuth from "@/hooks/useAuth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTE_PATH.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);
  return <>{!isAuthenticated && children}</>;
}
