import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import "./CollegeSignUp.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "apps/campus-placement/src/app/constants/constants";
import { AppContext } from "@shared-components";

const CollegeSignUp = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (data: any) => {
    setFormData(data);
    try {
      await axios.post(URL + "/user/signUpCollege", {
        emailId: data.email,
        password: data.password,
      });
      context?.state.toast.show({
        severity: "success",
        summary: "Success Message",
        detail: "Singup Successfull.",
        life: 3000,
      });
    } catch (e: any) {
      context?.state.toast.show({
        severity: "error",
        summary: "Error Message",
        detail: e.message,
        life: 3000,
      });
    }
    reset();
  };

  const getFormErrorMessage = (name: any) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div className="form-demo h-full flex justify-center items-center graduate-bg">
      <div className="flex justify-content-center bg-white p-4 rounded">
        <div className="card">
          <h5 className="text-center text-2xl">College SignUp</h5>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address. E.g. example@email.com",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="email"
                  className={classNames({ "p-error": !!errors.email })}
                >
                  Email*
                </label>
              </span>
              {getFormErrorMessage("email")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required." }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="password"
                  className={classNames({ "p-error": errors.password })}
                >
                  Password*
                </label>
              </span>
              {getFormErrorMessage("password")}
            </div>
            <div
              className="text-blue-500 underline text-right cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Click here for login
            </div>
            <Button type="submit" label="Submit" className="mt-2 text-black" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollegeSignUp;
