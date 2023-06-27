import React, { useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import URL from "apps/campus-placement/src/app/constants/constants";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./UpdateProfile.scss";
import { AppContext } from "@shared-components";
export function Profile() {
  const context = useContext(AppContext);
  const base = URL + "/college/getCollegeByEmailId?emailId=";
  const save = URL + "/college/updateCollege";
  const [college, setCollege] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loader, setLoading] = useState(false);
  useEffect(() => {
    getCollege();
  }, []);

  const getCollege = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token || "");
    try {
      const response = await axios.get(base + decoded?.emailId);
      setLoading(false);
      setCollege(response.data);
      setFormData(response.data);
    } catch (e) {
      setLoading(false);
      context?.state.toast.show({
        severity: "error",
        summary: "Error",
        detail: e.message,
        life: 3000,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token || "");

    try {
      const response = await axios.post(save, {
        ...formData,
        id: decoded?.id,
        emailId: decoded?.emailId,
      });
      setLoading(false);
      context?.state.toast.show({
        severity: "success",
        summary: "Success",
        detail: "Profile updated Successfully",
        life: 3000,
      });
      setCollege(response.data);
      setFormData(response.data);
      setEditMode(false);
    } catch (error) {
      setLoading(false);

      context?.state.toast.show({
        severity: "error",
        summary: "Error",
        detail: e.message,
        life: 3000,
      });
      console.error("Error updating profile:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData(college);
  };

  return (
    <div className="update-profile">
      {editMode ? (
        <div className="bg-gray-100 p-4 rounded-lg w-[50%] m-auto !mt-2 ">
          <div className="text-2xl text-black my-4 text-purple-500 font-bold text-center font-bold">
            Edit User Profile:
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <div className="mb-4">
              <label
                htmlFor="collegeName"
                className="block text-gray-700 font-bold mb-1"
              >
                College Name
              </label>
              <InputText
                id="collegeName"
                name="collegeName"
                value={formData?.collegeName || ""}
                onChange={handleChange}
                className="p-inputtext-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="emailId"
                className="block text-gray-700 font-bold mb-1"
              >
                Email ID
              </label>
              <InputText
                id="emailId"
                name="emailId"
                value={formData?.emailId || ""}
                onChange={handleChange}
                className="p-inputtext-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 font-bold mb-1"
              >
                Address
              </label>
              <InputText
                id="address"
                name="address"
                value={formData?.address || ""}
                onChange={handleChange}
                className="p-inputtext-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-bold mb-1"
              >
                Phone Number
              </label>
              <InputText
                id="phoneNumber"
                name="phoneNumber"
                value={formData?.phoneNumber || ""}
                onChange={handleChange}
                className="p-inputtext-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="alternateNumber"
                className="block text-gray-700 font-bold mb-1"
              >
                Alternate Number
              </label>
              <InputText
                id="alternateNumber"
                name="alternateNumber"
                value={formData?.alternateNumber || ""}
                onChange={handleChange}
                className="p-inputtext-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="collegeWebsiteLink"
                className="block text-gray-700 font-bold mb-1"
              >
                College Website Link
              </label>
              <InputText
                id="collegeWebsiteLink"
                name="collegeWebsiteLink"
                value={formData?.collegeWebsiteLink || ""}
                onChange={handleChange}
                className="p-inputtext-sm"
              />
            </div>
            <div className="flex justify-end !mt-4">
              <Button label="Save" loading={loader} className="mr-2" />
              <Button
                label="Cancel"
                className="p-button-secondary"
                onClick={handleCancel}
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg w-[50%] m-auto !mt-[10%]">
          <div className="text-2xl text-black my-4 text-purple-500 font-bold">
            User Profile:
          </div>
          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            College Name: {college?.collegeName || "N/A"}
          </p>
          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            Email ID: {college?.emailId}
          </p>
          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            Address: {college?.address || "N/A"}
          </p>
          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            Phone Number: {college?.phoneNumber || "N/A"}
          </p>
          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            Alternate Number: {college?.alternateNumber || "N/A"}
          </p>
          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            College Website Link: {college?.collegeWebsiteLink || "N/A"}
          </p>
          <Button
            label="Edit"
            className="p-button-primary grid m-auto !mt-4 !w-[120px] flex "
            loading={loader}
            onClick={handleEdit}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
