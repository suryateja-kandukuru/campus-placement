import { startTransition, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import SideMenu from "../SideMenu/Sidebar";
import { LABELS } from "../../constants/constants";
import { AppContext } from "../../context/AppContext";
import { user } from "./User";
import "./Header.css";

export function Header({
  logo,
  hamburger,
}: {
  logo: string;
  hamburger: string;
}) {
  const { dispatch } = useContext<any>(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [visible, setVisible] = useState(false);
  return (
    <div className="header md:!h-24 !h-16">
      <div className="logoContainer">
        {/* <img src={logo} alt="Project Logo"></img> */}
        <h2>Campus Placement</h2>
      </div>

      <div className="sideMenu !m-0 flex justify-center items-center">
        <i
          className="pi pi-align-justify w-5 h-5 md:w-11 md:h-11 cursor-pointer"
          style={{ fontSize: "2rem" }}
          onClick={() => setVisible(true)}
        ></i>

        <Sidebar
          visible={visible}
          position="right"
          onHide={() => setVisible(false)}
        >
          <SideMenu user={user} />
        </Sidebar>
      </div>
    </div>
  );
}

export default Header;
