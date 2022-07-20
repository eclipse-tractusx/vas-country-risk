/* eslint-disable no-console */
import axios from "axios";

// Actions
export function getAll(ratingsArray) {
  const ratings = new Map();
  const year = 2021;
  if (ratingsArray) {
    ratings.set("ratings", JSON.stringify(ratingsArray));
  }
  return axios
    .get(process.env.REACT_APP_DASHBOARD_URL, {
      params: {
        ratings: ratings.get("ratings"),
        year: year,
        name: "fabio",
        company: "test",
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
}
