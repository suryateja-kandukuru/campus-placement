import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import CompanySignUp from "../pages/SignUp/Components/CompanySignUp/CompanySignUp";
import CollegeSignUp from "../pages/SignUp/Components/CollegeSignUp/CollegeSignUp";

// Lazy Loaded Components
// const Login = lazy(() => import("../pages/Login/Login"));
// const SignUp = lazy(() => import("../pages/SignUp/SignUp"));
// const CollegeSignUp = lazy(
//   () => import("../pages/SignUp/Components/CollegeSignUp/CollegeSignUp")
// );
// const CompanySignUp = lazy(
//   () => import("../pages/SignUp/Components/CompanySignUp/CompanySignUp")
// );

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="college-signup" element={<CollegeSignUp />} />
        <Route path="company-signup" element={<CompanySignUp />} />
      </Route>
    </Routes>
  );
};

export default Router;
