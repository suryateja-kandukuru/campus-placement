import { memo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

import logo from "./../../assets/images/logo.svg";
import hamburger from "./../../assets/icons/hamburger.svg";
import { Header } from "@shared-components";
type props = {
  allowedRoles: string[];
};

const PrivateRoute = ({ allowedRoles }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  const decoded = jwtDecode(token || "");
  const isAllowed = !!token;

  const isAccessiblie = allowedRoles.includes(decoded?.role);

  if (!isAccessiblie) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return isAllowed ? (
    <>
      <div className="md:px-[50px] bg-violet-500 text-white">
        <Header logo={logo} hamburger={hamburger} />
      </div>
      <div className="outlet w-full h-[calc(100%-64px)] md:h-[calc(100%-96px)] md:px-[72px] md:pb-14">
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default memo(PrivateRoute);
