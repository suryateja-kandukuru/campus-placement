import { lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import CompanySignUp from "../pages/SignUp/Components/CompanySignUp/CompanySignUp";
import CollegeSignUp from "../pages/SignUp/Components/CollegeSignUp/CollegeSignUp";
import FileUpload from "../pages/CollegeDashboard/components/FileUpload/FileUpload";
import ListOfJobs from "../pages/CollegeDashboard/components/ListOfStudents/ListOfStudents";
import CollegeDashboard from "../pages/CollegeDashboard/CollegeDashboard";
import UpdateProfile from "../pages/CollegeDashboard/components/UpdateProfile/UpdateProfile";
import PrivateRoute from "./PrivateRoute";
import CompanyDashboard from "../pages/CompanyDashboard/CompanyDashboard";
import CompanyProfile from "../pages/CompanyDashboard/components/Profile/CompanyProfile";
import CompanyList from "../pages/CompanyDashboard/components/ListOfCompanies/CompanyList";
import CreateJob from "../pages/CompanyDashboard/components/CreateJob/CreateJob";
import MatchedJobs from "../pages/CollegeDashboard/components/MatchedJobs/MatchedJobs";
import AppliedJob from "../pages/CollegeDashboard/components/AppliedJob/AppliedJob";
import ViewStudentApplications from "../pages/CompanyDashboard/components/ViewStudentApplications/ViewStudentApplication";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="college-signup" element={<CollegeSignUp />} />
        <Route path="company-signup" element={<CompanySignUp />} />
        <Route element={<PrivateRoute allowedRoles={["college"]} />}>
          <Route path="college" element={<CollegeDashboard />}>
            <Route path="" element={<Navigate to={"list"} replace={true} />} />
            <Route path="list" element={<ListOfJobs />} />
            <Route path="upload" element={<FileUpload />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="matched-jobs" element={<MatchedJobs />} />
            <Route path="applied-jobs" element={<AppliedJob />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute allowedRoles={["company"]} />}>
          <Route path="company" element={<CompanyDashboard />}>
            <Route path="" element={<Navigate to={"list"} replace={true} />} />
            <Route path="list" element={<CompanyList />} />
            <Route path="create" element={<CreateJob />} />
            <Route path="update-profile" element={<CompanyProfile />} />
            <Route
              path="view-application"
              element={<ViewStudentApplications />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
