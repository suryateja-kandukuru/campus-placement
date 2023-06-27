import { useContext, useEffect, useState } from "react";
import "./CompanyList.scss";
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

/* eslint-disable-next-line */
export interface ListOfStudentsProps {}

export function CompanyList() {
  const context = useContext(AppContext);

  const [jobs, setJobs] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const base = URL + "/job/jobsData?orgId=";
  const deleteURL = URL + "/job/deleteJob";
  const [list, setList] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  // wrtie a function to fetch data from backend
  const getJobs = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token || "");
    const response = await axios.get(base + decoded?.id);
    console.log(response.data);
    setList(response.data);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-info"
          rounded
          outlined
          className="m-2"
          onClick={() => handleDeleteDialog(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          className="m-2"
          onClick={() => handleDetails(rowData)}
        />
      </>
    );
  };

  const hideDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const handleDetails = (rowData) => {
    setJobs(rowData);
    setDeleteDialog(true);
  };

  const handleDeleteDialog = (rowData) => {
    setJobs(rowData);
    setDeleteDialog(true);
  };

  const handleDelete = async () => {
    hideDeleteDialog();

    try {
      await axios.delete(deleteURL + "?jobId=" + jobs?.id);
      context?.state.toast.show({
        severity: "success",
        summary: "Success",
        detail: "Student Deleted Successfully",
        life: 3000,
      });
      getJobs();
    } catch (e) {
      context?.state.toast.show({
        severity: "error",
        summary: "Error",
        detail: e.message,
        life: 3000,
      });
    }
  };

  const deleteDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={handleDelete}
      />
    </>
  );

  const productTemplate = (job, index) => (
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
            {job?.skills.map((skill, index) => (
              <Chip key={index} label={skill} className="mr-2 mb-2" />
            ))}
          </div>
        </div>
        <div className="px-6 pb-2">
          <h4 className="text-lg font-semibold">Certifications:</h4>
          <ul className="list-disc ml-6">
            {job.certifications.map((certification, index) => (
              <li key={index}>{certification}</li>
            ))}
          </ul>
        </div>
        <div className="px-6 pb-2">
          <h4 className="text-lg font-semibold">Education:</h4>
          <ul className="list-disc ml-6">
            {job.education.map((education, index) => (
              <li key={index}>{education}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between px-4 py-2">
          <Button
            type="button"
            icon="pi pi-pencil"
            className="p-button-rounded p-button-secondary"
          />
          <Button
            type="button"
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger"
            onClick={() => handleDeleteDialog(job)}
          />
        </div>
      </Card>
    </div>
  );

  return (
    <div>
      <p className="text-3xl text-purple-500 m-4 ml-0">List of Jobs:</p>

      {list?.length ? (
        <Carousel
          value={list}
          numVisible={3}
          numScroll={3}
          itemTemplate={productTemplate}
        />
      ) : (
        <Card>No Jobs Found</Card>
      )}

      <Dialog
        visible={deleteDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteDialogFooter}
        onHide={hideDeleteDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {jobs && (
            <span>
              Are you sure you want to delete <b>{jobs?.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default CompanyList;
