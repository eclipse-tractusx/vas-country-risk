/* eslint-disable no-console */
import axios from "axios";

//Get Reports By User
export function getReportsByCompanyUser(token, customerUser) {
  return axios
    .get(process.env.REACT_APP_GET_REPORTS_BY_USER, {
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
    .get(process.env.REACT_APP_GET_REPORT_VALUES_BY_REPORT, {
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
    })
    .then((res) => res.data)
    .catch((err) => []);
}

//Save Reports By User
export function saveReports(token, customerUser, report) {
  return axios({
    method: "post",
    url: process.env.REACT_APP_SAVE_REPORTS,
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
    url: process.env.REACT_APP_SHARE_REPORTS,
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
    url: process.env.REACT_APP_UPDATE_REPORTS,
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
    url: process.env.REACT_APP_DELETE_REPORTS + `/${reportId}`,
    params: {
      name: customerUser.name,
      email: customerUser.email,
      companyName: customerUser.companyName,
    },

    headers: { Authorization: `Bearer ${token}` },
  });
}
