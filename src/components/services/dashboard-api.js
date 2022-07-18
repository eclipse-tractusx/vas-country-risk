/* eslint-disable no-console */
import axios from "axios";

// Actions

export function getAll(ratings) {
  return axios
    .get(
      process.env.REACT_APP_DASHBOARD_URL +
        "ratings=" +
        ratings.getRatings +
        "&name=fdmota&company=test&year=2021"
    )
    .then((res) => res.data)
    .catch((err) => err);
}
