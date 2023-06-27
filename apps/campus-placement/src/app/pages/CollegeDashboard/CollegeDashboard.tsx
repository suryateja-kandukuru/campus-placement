import { Outlet } from "react-router-dom";
import "./CollegeDashboard.scss";
import FileUpload from "./components/FileUpload/FileUpload";

/* eslint-disable-next-line */
export interface CollegeDashboardProps {}

export function CollegeDashboard(props: CollegeDashboardProps) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default CollegeDashboard;
