import "regenerator-runtime/runtime";
import { Toast } from "primereact/toast";
import { AppContext, AppContextProvider } from "@shared-components";
import Router from "./routes/Routes";
import "./app.scss";
import { useContext, useEffect, useRef } from "react";

export function App(): JSX.Element {
  const myToast = useRef<any>(null);
  const { dispatch } = useContext<any>(AppContext);

  useEffect(() => {
    dispatch({
      type: "SetToastRef",
      payload: myToast.current,
    });
  }, []);

  return (
    <div className="w-full h-screen">
      <Toast ref={myToast} />
      <Router />
    </div>
  );
}

export default App;
