import "regenerator-runtime/runtime";
import { Toast } from "primereact/toast";
import { AppContext, AppContextProvider } from "@shared-components";
import Router from "./routes/Routes";
import "./app.scss";
import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { interceptor } from "./interceptor/interceptor";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export function App(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const myToast = useRef<any>(null);
  const { context, dispatch } = useContext<any>(AppContext);
  axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;
  if (localStorage?.getItem("token") && location?.pathname !== "/login") {
    console.log("im called");
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage?.getItem("token")}`;
  }

  useEffect(() => {
    dispatch({
      type: "SetToastRef",
      payload: myToast.current,
    });
    if (localStorage.getItem("token")) {
      dispatch({
        type: "SET_AUTH",
        payload: localStorage.getItem("token"),
      });
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <Toast ref={myToast} />
      <Router />
    </div>
  );
}

export default App;
