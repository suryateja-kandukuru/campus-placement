import { useContext, useEffect, useState } from "react";
import "./ListOfStudents.scss";
import jwtDecode from "jwt-decode";
import axios from "axios";
import URL from "apps/campus-placement/src/app/constants/constants";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AppContext } from "@shared-components";
import { useNavigate } from "react-router-dom";

/* eslint-disable-next-line */
export interface ListOfStudentsProps {}

export function ListOfStudents(props: ListOfStudentsProps) {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const [student, setStudent] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const base = URL + "/student/studentsData?collegeId=";
  const deleteURL = URL + "/student/deleteStudent?id=";
  const [list, setList] = useState({});

  useEffect(() => {
    getCollege();
  }, []);

  // wrtie a function to fetch data from backend
  const getCollege = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token || "");
      const response = await axios.get(base + decoded?.id);
      setList(response.data);
    } catch (e) {
      console.error(e);
      context?.state.toast.show({
        severity: "error",
        summary: "Error",
        detail: e.message,
        life: 3000,
      });
    }
  };

  const handleMatchedJobs = async (rowData) => {
    context?.dispatch?.({
      type: "SetStudentDetails",
      payload: rowData,
    });

    navigate("/college/matched-jobs?id=" + rowData.id);
  };

  const handleAppliedJob = async (rowData) => {
    navigate("/college/applied-jobs?id=" + rowData.id);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-info"
          title="Matched Jobs"
          rounded
          outlined
          className="m-2"
          onClick={(e) => {
            e.preventDefault();
            handleMatchedJobs(rowData);
          }}
        />
        <Button
          icon="pi pi-check"
          title="Applied Jobs"
          rounded
          outlined
          className="m-2"
          onClick={(e) => {
            e.preventDefault();
            handleAppliedJob(rowData);
          }}
        />
        <Button
          icon="pi pi-trash"
          title="Delete Student"
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
    setStudent(rowData);
    setDeleteDialog(true);
  };

  const handleDeleteDialog = (rowData) => {
    setStudent(rowData);
    setDeleteDialog(true);
  };

  const handleDelete = async () => {
    hideDeleteDialog();

    try {
      await axios.post(deleteURL + student?.id);
      context?.state.toast.show({
        severity: "success",
        summary: "Success",
        detail: "Student Deleted Successfully",
        life: 3000,
      });
      getCollege();
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

  return (
    <div>
      <p className="text-3xl text-purple-500 m-4 ml-0">List of students:</p>
      <DataTable value={list}>
        <Column field="name" header="Name" />
        <Column field="registrationNumber" header="Registration Number" />
        <Column field="address" header="Address" />
        <Column field="mobileNumber" header="Mobile Number" />
        <Column field="emailId" header="Email ID" />
        <Column field="skills" header="Skills" />
        <Column field="education" header="Education" />
        <Column field="batch" header="Batch" />
        <Column field="certifications" header="Certifications" />
        <Column
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>

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
          {student && (
            <span>
              Are you sure you want to delete <b>{student?.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default ListOfStudents;
