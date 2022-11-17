import { render, act } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import App from "../../../App";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  SharedThemeProvider,
  SharedCssBaseline,
} from "cx-portal-shared-components";

test("Renders index.js", async () => {
  await act(async () => {
    render(
      <React.StrictMode>
        <SharedCssBaseline />
        <SharedThemeProvider>
          <App />
        </SharedThemeProvider>
      </React.StrictMode>
    );
  });
});
