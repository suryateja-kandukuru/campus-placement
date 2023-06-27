import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { AppContext } from "@shared-components";
import axios from "axios";
import URL from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./Login.scss";
import Gradute from "../../../assets/images/graduate.jpg";
const Login = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      localStorage.clear();
      setLoader(true);
      // const jsonResult = await fetch(URL + "/user/login", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     emailId: data.email,
      //     password: data.password,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //     "ngrok-skip-browser-warning": true,
      //   },
      // });
      // const result = await jsonResult.json();
      const result = await axios.post(URL + "/user/login", {
        emailId: data.email,
        password: data.password,
      });
      setLoader(false);
      const decoded = jwt_decode(result?.data);

      localStorage.setItem("token", result?.data);
      if (decoded.role === "college") {
        navigate(`/college`, { replace: true });
      } else if (decoded.role === "company") {
        navigate("/company", { replace: true });
      } else {
        navigate("/login");
      }
    } catch (e: any) {
      console.log(e);
      setLoader(false);
      context?.state?.toast?.show({
        severity: "error",
        summary: "Error Message",
        detail: e.message,
        life: 3000,
      });
    }
  };

  return (
    <div className="login-container flex justify-center items-center h-screen">
      <div className="w-96 form-container max-w-md p-6  rounded shadow">
        <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <InputText
              id="email"
              type="text"
              className={classNames("w-full", {
                "p-invalid": errors.email,
              })}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="password">
              Password
            </label>
            <InputText
              id="password"
              type="password"
              className={classNames("w-full", {
                "p-invalid": errors.password,
              })}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
          <Button
            type="button"
            label="sign-up here..."
            link
            className="w-full  primary bg-[#6366F1]"
            onClick={(e) => {
              e.preventDefault();
              navigate("/sign-up");
            }}
          />

          <Button
            type="submit"
            label="Login"
            loading={loader}
            className="w-full  primary bg-[#6366F1]"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
