import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import {
  SharedThemeProvider,
  SharedCssBaseline,
} from "cx-portal-shared-components";
import UserService from "./components/services/UserService";

const root = ReactDOM.createRoot(document.getElementById("root"));
UserService.init((user) => {
  root.render(
    <React.StrictMode>
      <SharedCssBaseline />
      <SharedThemeProvider>
        <App />
      </SharedThemeProvider>
    </React.StrictMode>
  );
});
