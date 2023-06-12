import * as ReactDOM from "react-dom/client";

import App from "./app/app";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "@shared-components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AppContextProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AppContextProvider>
  </BrowserRouter>
);
