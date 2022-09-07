/* eslint-disable no-console */
import axios from "axios";

// Actions
export function getRatingsByYear(Year, token) {
  var yearAPI;

  if (Year === "") {
    yearAPI = 2022;
  } else {
    yearAPI = Year;
  }

  return axios
    .get(process.env.REACT_APP_DASHBOARD_URL_RATINGSTABLE, {
      params: {
        year: yearAPI,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => err);
}
