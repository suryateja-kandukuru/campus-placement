import { Outlet } from "react-router-dom";
import logo from "./../../assets/images/logo.svg";
import hamburger from "./../../assets/icons/hamburger.svg";
import { Header } from "@shared-components";

function Layout() {
  return (
    <>
      <div className="md:px-[50px]">
        <Header logo={logo} hamburger={hamburger} />
      </div>
      <div className="outlet w-full h-[calc(100%-64px)] md:h-[calc(100%-96px)] md:px-[72px] md:pb-14">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
