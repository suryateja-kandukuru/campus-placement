import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import URL from "apps/campus-placement/src/app/constants/constants";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AppContext } from "@shared-components";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
/* eslint-disable-next-line */
export interface ListOfStudentsProps {}

export function ViewStudentApplications(props: ListOfStudentsProps) {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const [student, setStudent] = useState(null);
  const [dialog, setDialog] = useState(false);

  const base = URL + "/job/getStudentProfiles?jobId=";
  const scheduleUrl = URL + "/interview/scheduleInterview";
  const [list, setList] = useState({});

  const [scheduledTime, setScheduledTime] = useState("");
  const [scheduledDate, setScheduledDate] = useState(null);
  const [meetLink, setMeetLink] = useState("");
  const [inviteLoader, setInviteLoader] = useState(false);
  useEffect(() => {
    getCollege();
  }, []);

  // wrtie a function to fetch data from backend
  const getCollege = async () => {
    try {
      const id = location?.search?.split("?id=")[1];
      const response = await axios.get(base + id);
      setList(response.data);
    } catch (e) {
      console.error(e);
      context?.state?.toast?.show({
        severity: "error",
        summary: "Error",
        detail: e.message,
        life: 3000,
      });
    }
  };

  const handleInvitationDialog = (rowData) => {
    setStudent(rowData);
    setDialog(true);
  };

  const handleSubmit = async (e) => {
    try {
      console.log(e);
      e.preventDefault();
      setInviteLoader(true);

      const id = location?.search?.split("?id=")[1];
      console.log(scheduledDate);
      const dateObj = new Date(scheduledDate);

      const options = {
        timeZone: "Asia/Kolkata",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const time = dateObj.toLocaleTimeString("en-US", options);
      const date = dateObj.toLocaleDateString("en-US", options);
      console.log(date);
      await axios.post(scheduleUrl, {
        studentId: student?.id,
        jobId: id,
        scheduledTime: time + " " + "IST",
        scheduledDate: date.split(",")[0],
        meetLink,
      });
      context?.state?.toast?.show({
        severity: "success",
        summary: "Success",
        detail: "Interview Scheduled Successfully",
        life: 3000,
      });
      setDialog(false);
      setInviteLoader(false);
    } catch (e) {
      setDialog(false);
      setInviteLoader(false);
      context?.state?.toast?.show({
        severity: "error",
        summary: "Error Message",
        detail: e.message,
        life: 3000,
      });
    }

    // Handle form submission here
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-calendar-times"
          title="Schedule Interview"
          rounded
          outlined
          className="m-2"
          onClick={(e) => {
            e.preventDefault();
            handleInvitationDialog(rowData);
          }}
        />
      </>
    );
  };

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
        visible={dialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Schedule Interview"
        modal
        onHide={() => setDialog(false)}
      >
        <div className="confirmation-content">
          <form onSubmit={handleSubmit}>
            <div className="p-field m-4 flex flex-col">
              <label htmlFor="scheduledDate">Scheduled Date</label>

              <Calendar
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.value)}
                showTime
                hourFormat="24"
              />
            </div>

            <div className="p-field m-4 flex flex-col">
              <label htmlFor="meetLink">Meet Link</label>
              <InputText
                id="meetLink"
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              label="Send Invitation"
              loading={inviteLoader}
              className="w-full  primary bg-[#6366F1]"
            />
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default ViewStudentApplications;
