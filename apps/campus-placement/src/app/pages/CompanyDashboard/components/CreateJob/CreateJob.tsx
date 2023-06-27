import React, { useContext, useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Chips } from "primereact/chips";
import { Button } from "primereact/button";
import URL from "apps/campus-placement/src/app/constants/constants";
import axios from "axios";
import { AppContext } from "@shared-components";
import jwtDecode from "jwt-decode";

const CreateJob = () => {
  const context = useContext(AppContext);
  const baseUrl = URL + "/job/createJob";
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    skills: [],
    education: [],
    batch: 0,
    certifications: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // organisationId
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token || "");
      const organisationId = decoded?.["id"];
      setLoader(true);
      const result = await axios.post(baseUrl, { ...formData, organisationId });
      setFormData({
        title: "",
        description: "",
        location: "",
        skills: [],
        education: [],
        batch: 0,
        certifications: [],
      });
      context?.state?.toast?.show({
        severity: "success",
        summary: "Success",
        detail: "Job created Successfully",
        life: 3000,
      });
      setLoader(false);
    } catch (e) {
      console.error(e);
      context?.state?.toast?.show({
        severity: "error",
        summary: "Error Message",
        detail: e.message,
        life: 3000,
      });
      setLoader(false);
    }
    // Perform save action with formData

    console.log(formData);
  };

  return (
    <div className="p-4">
      <Card className="p-4 shadow-lg">
        <div className="text-2xl text-black my-4  text-purple-600 font-bold">
          Create Job:
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Title</label>
            <InputText
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <InputText
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Location</label>
            <InputText
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Skills</label>
            <div className="flex space-x-2">
              <Chips
                value={formData.skills}
                name="skills"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Education</label>
            <div className="flex space-x-2">
              <Chips
                value={formData.education}
                name="education"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Batch</label>
            <InputText
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Certifications</label>
            <div className="flex space-x-2">
              <Chips
                className="!w-full"
                value={formData.certifications}
                name="certifications"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            label="Create Job"
            loading={loader}
            onClick={handleSave}
            className="m-auto  primary bg-[#6366F1]"
          />
        </div>
      </Card>
    </div>
  );
};

export default CreateJob;
