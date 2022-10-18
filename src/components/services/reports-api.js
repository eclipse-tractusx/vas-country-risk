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

//Save Reports By User
export function saveReports(token, customerUser) {
      return axios({
        method: "post",
        url: process.env.REACT_APP_SAVE_RANGES,
        data: null, //Add reports data here
        params: {
          name: customerUser.name,
          email: customerUser.email,
          company: customerUser.company,
        },
    
        headers: { Authorization: `Bearer ${token}` },
      });
  }
