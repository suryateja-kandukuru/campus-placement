import { lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import CompanySignUp from "../pages/SignUp/Components/CompanySignUp/CompanySignUp";
import CollegeSignUp from "../pages/SignUp/Components/CollegeSignUp/CollegeSignUp";
import FileUpload from "../pages/CollegeDashboard/components/FileUpload/FileUpload";
import Profile from "../pages/CollegeDashboard/components/Profile/Profile";
import ListOfJobs from "../pages/CollegeDashboard/components/ListOfJobs/ListOfStudents";
import CollegeDashboard from "../pages/CollegeDashboard/CollegeDashboard";
import UpdateProfile from "../pages/CollegeDashboard/components/UpdateProfile/UpdateProfile";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="college-signup" element={<CollegeSignUp />} />
          <Route path="company-signup" element={<CompanySignUp />} />
          <Route path="college" element={<CollegeDashboard />}>
            <Route path="list" element={<ListOfJobs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="upload" element={<FileUpload />} />
            <Route path="update-profile" element={<UpdateProfile />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
