/* eslint-disable no-console */
import axios from "axios";

// Actions
export function getRatingsByYear(Year) {
  var yearAPI;

  if (Year === undefined) {
    yearAPI = 2021;
  } else {
    yearAPI = Year;
  }

  return axios
    .get(process.env.REACT_APP_DASHBOARD_URL_RATINGSTABLE, {
      params: {
        year: yearAPI,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
}
