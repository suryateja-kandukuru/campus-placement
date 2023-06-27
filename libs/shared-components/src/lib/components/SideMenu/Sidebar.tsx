import { Avatar } from "primereact/avatar";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const SideMenu = () => {
  const navigate = useNavigate();
  const email = jwtDecode(localStorage.getItem("token") || "")?.emailId;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="profile-container2">
        <div className="profile-details flex">
          <div className="profile-info">
            <p className="userEmail">{email}</p>
            <div
              className="logout flex justify-center items-center cursor-pointer"
              onClick={handleLogout}
            >
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
