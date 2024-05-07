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
import React, { createContext, useEffect, useState, useContext } from "react";
import { CompanyUserContext } from "../companyuser";
import { getReportValuesByReport } from "../../components/services/reports-api";
import UserService from "../../components/services/UserService";

const ReportContext = createContext({});

const ReportProvider = ({ children, updatedReport }) => {
  const [reportValuesContext, setReportValuesContext] = useState(
    updatedReport || []
  );

  const { companyUser } = useContext(CompanyUserContext);

  const [report, setReport] = useState("");

  useEffect(() => {
    getReportValuesByReport(UserService.getToken(), report, companyUser).then(
      (response) => {
        setReportValuesContext(response);
      }
    );
  }, [report]);

  const updateReport = (report) => {
    setReport(report);
  };

  return (
    <ReportContext.Provider
      value={{ report, reportValuesContext, updateReport }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export { ReportContext, ReportProvider };
