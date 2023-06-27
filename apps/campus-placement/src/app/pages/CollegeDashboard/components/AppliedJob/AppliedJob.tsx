import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import URL from "apps/campus-placement/src/app/constants/constants";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AppContext } from "@shared-components";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";
import { Carousel } from "primereact/carousel";
import { useLocation } from "react-router-dom";

/* eslint-disable-next-line */
export interface ListOfStudentsProps {}

export function AppliedJob() {
  const location = useLocation();
  const context = useContext(AppContext);

  const [jobs, setJobs] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const base = URL + "/job/appliedJobs?studentId=";
  const [list, setList] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  // wrtie a function to fetch data from backend
  const getJobs = async () => {
    try {
      const id = location?.search?.split("?id=")[1];
      const response = await axios.get(base + id);
      setList(response.data);
    } catch (e) {
      context?.state.toast.show({
        severity: "error",
        summary: "Error",
        detail: e.message,
        life: 3000,
      });
      console.error(e);
    }
  };

  const productTemplate = (job) => (
    <div key={job.id} className="w-64 m-2">
      <Card className="shadow-lg rounded-lg">
        <div className="flex items-center justify-between p-2">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <div className="text-gray-600">{job.location}</div>
        </div>
        <div className="px-2 pb-2">
          <p className="text-sm text-gray-600">{job.description}</p>
        </div>
        <div className="px-6 pb-2">
          <h4 className="text-lg font-semibold">Skills:</h4>
          <div className="flex flex-wrap">
            {job?.skills?.map((skill, index) => (
              <Chip key={index} label={skill} className="mr-2 mb-2" />
            ))}
          </div>
        </div>
        <div className="px-6 pb-2">
          <h4 className="text-lg font-semibold">Certifications:</h4>
          <ul className="list-disc ml-6">
            {job?.certifications?.map((certification, index) => (
              <li key={index}>{certification}</li>
            ))}
          </ul>
        </div>
        <div className="px-6 pb-2">
          <h4 className="text-lg font-semibold">Education:</h4>
          <ul className="list-disc ml-6">
            {job?.education?.map((education, index) => (
              <li key={index}>{education}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );

  return (
    <div>
      <p className="text-3xl text-purple-500 m-4 ml-0">List of Applied Jobs:</p>

      {list?.length ? (
        <Carousel
          value={list}
          numVisible={3}
          numScroll={3}
          itemTemplate={productTemplate}
        />
      ) : (
        <Card>No Applied Jobs Found</Card>
      )}
    </div>
  );
}

export default AppliedJob;
