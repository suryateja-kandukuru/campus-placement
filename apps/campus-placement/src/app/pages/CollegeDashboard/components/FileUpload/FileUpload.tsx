import React, { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import URL from "apps/campus-placement/src/app/constants/constants";

const FileUploader = () => {
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
        })
        .catch((error) => {
          console.log(error);
          setUploading(false);
        });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-sm p-4 bg-white rounded-lg shadow-md">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Excel File:
        </label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="p-2 border rounded"
        />
        <button
          onClick={handleUpload}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
