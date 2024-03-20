/********************************************************************************
 * Copyright (c) 2022,2024 BMW Group AG
 * Copyright (c) 2022,2024 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/
import React from "react";
import ReactDOM from "react-dom/client";

import {
  SharedThemeProvider,
  SharedCssBaseline,
} from "@catena-x/portal-shared-components";


import UserService from "./components/services/UserService";
import { getHostname } from "./components/services/EnvironmentService";

import RootComponent from "./components/dashboard/RootComponent/RootComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const hostname = getHostname();
if (hostname.includes("country-risk-dashboard.dev")) import("./index-dev.scss");
if (hostname.includes("country-risk-dashboard.int")) import("./index-int.scss");
else {
  import("./index-dev.scss");
}

const root = ReactDOM.createRoot(document.getElementById("root"));

UserService.init((user) => {
  root.render(
    <React.StrictMode>
      {" "}
      <SharedThemeProvider>
        {" "}
        <Router>
          <RootComponent user={user} />{" "}
        </Router>
      </SharedThemeProvider>{" "}
    </React.StrictMode>
  );
});
