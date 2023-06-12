import { startTransition, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "@shared-components";
import logo from "./../../assets/images/logo.svg";
import hamburger from "./../../assets/icons/hamburger.svg";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  /**
   * need to remove
   */
  // useEffect(() => {
  //   startTransition(() => {
  //     navigate("chat-bot");
  //   });
  // }, []);

  return (
    <>
      {!["", "login", "sign-up", "college-signup", "company-signup"].some(
        (path) => location.pathname.includes(path)
      ) && (
        <div className="md:px-[50px]">
          <Header logo={""} hamburger={hamburger} />
        </div>
      )}

      <div
        className={`outlet w-full ${
          ["", "login", "sign-up", "college-signup", "company-signup"].some(
            (path) => location.pathname.includes(path)
          )
            ? "h-full"
            : "h-[calc(100%-64px)] md:h-[calc(100%-96px)] md:px-[72px]"
        }   md:pb-14 
      `}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
