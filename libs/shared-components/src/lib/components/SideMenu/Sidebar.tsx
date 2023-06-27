import { Avatar } from "primereact/avatar";
import "./Sidebar.css";
import jwtDecode from "jwt-decode";

const SideMenu = () => {
  const email = jwtDecode(localStorage.getItem("token") || "")?.emailId;
  return (
    <>
      <div className="profile-container2">
        <div className="profile-details flex">
          <div className="profile-info">
            <p className="userEmail">{email}</p>
            <div className="logout flex justify-center items-center cursor-pointer">
              Log Out<i className="pi pi-sign-out mx-2"></i>
            </div>
          </div>
          <Avatar label={email[0] || "U"} size="large" shape="circle" />
        </div>
      </div>
    </>
  );
};

export default SideMenu;
