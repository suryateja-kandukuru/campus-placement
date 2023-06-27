import URL from "apps/campus-placement/src/app/constants/constants";
import "./Profile.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

/* eslint-disable-next-line */
export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  const base = URL + "/college/getCollegeByEmailId?emailId=";

  const [college, setCollege] = useState({});

  useEffect(() => {
    getCollege();
  }, []);

  // wrtie a function to fetch data from backend
  const getCollege = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token || "");
    console.log(decoded);
    const response = await axios.get(base + decoded?.emailId);
    setCollege(response.data);
  };

  return (
    <div>
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
      </div>
    </div>
  );
}

export default Profile;
