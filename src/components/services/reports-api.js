/* eslint-disable no-console */
import axios from "axios";

//Get Reports By User
export function getReportsByCompanyUser(token, customerUser) {
  return axios
    .get(process.env.REACT_APP_GET_REPORTS_BY_USER, {
      params: {
        name: customerUser.name,
        email: customerUser.email,
        company: customerUser.company,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => []);
}

export function getReportValuesByReport(token, report) {
  return axios
    .get(process.env.REACT_APP_GET_REPORT_VALUES_BY_REPORT, {
      params: {
        reportName: report.reportName || "fake rating",
        companyUserName: report.companyUserName || "joao",
        company: report.company || "CGI",
        type: report.type || "Company",
        id: report.id || "1",
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
      company: customerUser.company,
    },

    headers: { Authorization: `Bearer ${token}` },
  });
}
