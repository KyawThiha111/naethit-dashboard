import { Route, Routes } from "react-router-dom";
import { RouteConfig } from "./route-config";
import { ROUTE_ACCESS } from "@/constants/route";
import LoginUserProvider from "@/provider/LoginUserProvider";
import AuthProvider from "@/provider/AuthProvider";

const RouteList = () => {
  return (
    <Routes>
      {RouteConfig.map(({ path, element, access_type }, index) => {
        let routeElement = element;

        // Apply protection based on access type
        if (access_type === ROUTE_ACCESS.PRIVATE) {
          routeElement = <LoginUserProvider>{element}</LoginUserProvider>;
        } else if (access_type === ROUTE_ACCESS.AUTH) {
          routeElement = <AuthProvider>{element}</AuthProvider>;
        }

        return <Route key={index} path={path} element={routeElement} />;
      })}
    </Routes>
  );
};

export default RouteList;
