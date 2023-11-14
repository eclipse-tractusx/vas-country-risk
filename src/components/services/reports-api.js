/********************************************************************************
* Copyright (c) 2022,2023 BMW Group AG 
* Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
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
/* eslint-disable no-console */
import axios from "axios";
import { getCountryRiskApi } from "./EnvironmentService";

//Get Reports By User
export function getReportsByCompanyUser(token, customerUser) {
  return axios
    .get(getCountryRiskApi() + process.env.REACT_APP_GET_REPORTS_BY_USER, {
      params: {
        name: customerUser.name,
        email: customerUser.email,
        companyName: customerUser.companyName,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => []);
}

export function getReportValuesByReport(token, report, customerUser) {
  return axios
    .get(
      getCountryRiskApi() + process.env.REACT_APP_GET_REPORT_VALUES_BY_REPORT,
      {
        params: {
          reportName: report.reportName || "",
          companyUserName: report.companyUserName || "",
          company: report.company || "",
          type: report.type || "",
          id: report.id || "",
          name: customerUser.name,
          email: customerUser.email,
          companyName: customerUser.companyName,
        },
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((res) => res.data)
    .catch((err) => []);
}

//Save Reports By User
export function saveReports(token, customerUser, report) {
  return axios({
    method: "post",
    url: getCountryRiskApi()+process.env.REACT_APP_SAVE_REPORTS,
    data: report,
    params: {
      name: customerUser.name,
      email: customerUser.email,
      companyName: customerUser.companyName,
    },

    headers: { Authorization: `Bearer ${token}` },
  });
}

export function shareReports(token, customerUser, report) {
  return axios({
    method: "post",
    url:getCountryRiskApi()+ process.env.REACT_APP_SHARE_REPORTS,
    data: report,
    params: {
      name: customerUser.name,
      email: customerUser.email,
      companyName: customerUser.companyName,
    },

    headers: { Authorization: `Bearer ${token}` },
  });
}

//Update Reports By User
export function updateReports(token, customerUser, report) {
  return axios({
    method: "put",
    url:getCountryRiskApi()+ process.env.REACT_APP_UPDATE_REPORTS,
    data: report,
    params: {
      name: customerUser.name,
      email: customerUser.email,
      companyName: customerUser.companyName,
    },

    headers: { Authorization: `Bearer ${token}` },
  });
}

export function deleteReport(token, customerUser, reportId) {
  return axios({
    method: "delete",
    url:
      getCountryRiskApi() +
      process.env.REACT_APP_DELETE_REPORTS +
      `/${reportId}`,
    params: {
      name: customerUser.name,
      email: customerUser.email,
      companyName: customerUser.companyName,
    },

    headers: { Authorization: `Bearer ${token}` },
  });
}
