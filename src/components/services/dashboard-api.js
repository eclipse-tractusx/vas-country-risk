/* eslint-disable no-console */
import axios from "axios";

// Actions

export function getAll() {
  return axios
    .get(
      process.env.REACT_APP_DASHBOARD_URL +
        "ratings=CPI Rating,PERC Asia Risk Guide&name=fdmota&company=test&year=2021"
    )
    .then((res) => res.data)
    .catch((err) => err);
}
