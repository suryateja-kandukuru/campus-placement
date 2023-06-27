import React, { useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import URL from "apps/campus-placement/src/app/constants/constants";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./CompanyProfile.scss";
import { AppContext } from "@shared-components";

export function UpdateProfile() {
  const context = useContext(AppContext);
  const base = URL + "/company/getCompanyByEmailId?emailId=";
  const save = URL + "/company/updateCompany";
  const [company, setCompany] = useState({
    id: "",
    companyName: "",
    description: "",
    yearFounded: "",
    companyWebsiteLink: "",
    phoneNumber: "",
    address: "",
    emailId: "",
    employesCount: "",
    primaryContactPerson: "",
    primaryContactNumber: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loader, setLoading] = useState(false);

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token || "");
    try {
      const response = await axios.get(base + decoded?.emailId);
      setLoading(false);
      setCompany(response.data);
      setFormData(response.data);
    } catch (e) {
      setLoading(false);
      context?.state?.toast?.show({
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
      context?.state?.toast?.show({
        severity: "success",
        summary: "Success",
        detail: "Profile updated Successfully",
        life: 3000,
      });
      setCompany(response.data);
      setFormData(response.data);
      setEditMode(false);
      getCompany();
    } catch (error) {
      setLoading(false);

      context?.state?.toast?.show({
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
    setFormData(company);
  };

  return (
    <div className="update-profile">
      {editMode ? (
        <div className="bg-gray-100 p-4 rounded-lg w-[50%] m-auto !mt-2 ">
          <div className="text-2xl text-black my-4 text-center text-purple-600 font-bold">
            Edit User Profile:
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <div className="flex gap-4">
              <div className="mb-4">
                <label
                  htmlFor="companyName"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Company Name
                </label>
                <InputText
                  id="companyName"
                  name="companyName"
                  value={formData?.companyName || ""}
                  onChange={handleChange}
                  className="p-inputtext-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Description
                </label>
                <InputText
                  id="description"
                  name="description"
                  value={formData?.description || ""}
                  onChange={handleChange}
                  className="p-inputtext-sm"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mb-4">
                <label
                  htmlFor="yearFounded"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Year Founded
                </label>
                <InputText
                  id="yearFounded"
                  name="yearFounded"
                  value={formData?.yearFounded || ""}
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
            </div>
            <div className="flex gap-4">
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
                  htmlFor="employesCount"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Employees Count
                </label>
                <InputText
                  id="employesCount"
                  name="employesCount"
                  value={formData?.employesCount || ""}
                  onChange={handleChange}
                  className="p-inputtext-sm"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mb-4">
                <label
                  htmlFor="primaryConatactPerson"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Primary Contact Email Id
                </label>
                <InputText
                  id="primaryConatactPerson"
                  name="primaryConatactPerson"
                  value={formData?.primaryConatactPerson || ""}
                  onChange={handleChange}
                  className="p-inputtext-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="primaryContactNumber"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Primary Contact Number
                </label>
                <InputText
                  id="primaryContactNumber"
                  name="primaryContactNumber"
                  value={formData?.primaryContactNumber || ""}
                  onChange={handleChange}
                  className="p-inputtext-sm"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mb-4">
                <label
                  htmlFor="companyWebsiteLink"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Website Link
                </label>
                <InputText
                  id="companyWebsiteLink"
                  name="companyWebsiteLink"
                  value={formData?.companyWebsiteLink || ""}
                  onChange={handleChange}
                  className="p-inputtext-sm"
                />
              </div>
              <div className="flex justify-start !mt-4 h-[50px] w-[250px] items-center">
                <Button label="Save" loading={loader} className="mr-2" />
                <Button
                  label="Cancel"
                  className="p-button-secondary"
                  onClick={handleCancel}
                />
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg w-[50%] m-auto !mt-[10%]">
          <div className="text-2xl text-black my-4 text-purple-500 font-bold">
            User Profile:
          </div>

          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            College Name: {company?.companyName || "N/A"}
          </p>
          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            Email ID: {company?.emailId}
          </p>
          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            Address: {company?.address || "N/A"}
          </p>
          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            Phone Number: {company?.phoneNumber || "N/A"}
          </p>

          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            College Website Link: {company?.companyWebsiteLink || "N/A"}
          </p>
          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            Employees Count: {company?.employesCount || "N/A"}
          </p>
          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            Primary Contact Person: {company?.primaryConatactPerson || "N/A"}
          </p>
          <p className="mb-2 bg-gray-300 p-5 rounded-xl">
            Primary Contact Number: {company?.primaryContactNumber || "N/A"}
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

export default UpdateProfile;
