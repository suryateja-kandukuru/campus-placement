import React, { useContext, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import URL from "apps/campus-placement/src/app/constants/constants";
import { Button } from "primereact/button";
import { AppContext } from "@shared-components";

const FileUploader = () => {
  const context = useContext(AppContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token || "");

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      setUploading(true);
      axios
        .post(
          URL +
            `/student/uploadData?sheet=student_data&collegeId=${decoded?.id}`,
          formData
        )
        .then((response) => {
          console.log(response);
          setUploading(false);
          context?.state.toast.show({
            severity: "success",
            summary: "Success",
            detail: "File uploaded successfully",
            life: 3000,
          });
        })
        .catch((error) => {
          console.log(error);
          setUploading(false);
          context?.state.toast.show({
            severity: "error",
            summary: "Error",
            detail: "Error while file uploading",
            life: 3000,
          });
        });
    }
  };

  return (
    <div className="flex justify-center mt-[10%]">
      <div className="max-w-sm p-4 bg-white rounded-lg shadow-md">
        <label className="block text-gray-700 text-sm font-bold mb-2 text-2xl">
          Select Excel File:
        </label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="p-2 border rounded"
        />
        <Button
          onClick={handleUpload}
          className="mt-4 w-full rounded flex justify-center items-center"
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
};

export default FileUploader;
