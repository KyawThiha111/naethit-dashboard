/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state: any) => state?.auth);
  return { isAuthenticated: auth.isAuthenticated };
}
