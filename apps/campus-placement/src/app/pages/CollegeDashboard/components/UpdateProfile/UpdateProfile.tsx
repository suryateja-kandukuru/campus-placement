import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import URL from "apps/campus-placement/src/app/constants/constants";
import axios from "axios";
import jwtDecode from "jwt-decode";

export function Profile() {
  const base = URL + "/college/getCollegeByEmailId?emailId=";

  const [college, setCollege] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getCollege();
  }, []);

  const getCollege = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token || "");
    const response = await axios.get(base + decoded?.emailId);
    setCollege(response.data);
    setFormData(response.data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token || "");

    try {
      const response = await axios.post(base, {
        ...formData,
        id: decoded?.id,
      });
      setCollege(response.data);
      setFormData(response.data);
      setEditMode(false);
    } catch (error) {
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
    <div>
      {editMode ? (
        <div className="bg-gray-100 p-4 rounded-lg">
          <form onSubmit={handleSubmit}>
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
            <div className="flex justify-end">
              <Button label="Save" className="mr-2" />
              <Button
                label="Cancel"
                className="p-button-secondary"
                onClick={handleCancel}
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="mb-2">College Name: {college?.collegeName || "N/A"}</p>
          <p className="mb-2">Email ID: {college?.emailId}</p>
          <p className="mb-2">Address: {college?.address || "N/A"}</p>
          <p className="mb-2">Phone Number: {college?.phoneNumber || "N/A"}</p>
          <p className="mb-2">
            Alternate Number: {college?.alternateNumber || "N/A"}
          </p>
          <p className="mb-2">
            College Website Link: {college?.collegeWebsiteLink || "N/A"}
          </p>
          <Button
            label="Edit"
            className="p-button-primary"
            onClick={handleEdit}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
