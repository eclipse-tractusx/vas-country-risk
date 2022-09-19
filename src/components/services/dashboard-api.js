/* eslint-disable no-console */
import axios from "axios";

// Actions
export function getAll(ratingsArray, years, token, companyUser) {
  const ratings = new Map();

  if (ratingsArray) {
    ratings.set("ratings", JSON.stringify(ratingsArray));
  }

  const valor = companyUser[0];
  console.log(companyUser[0]); 

  return axios
    .get(process.env.REACT_APP_DASHBOARD_URL, {
      params: {
        ratings: ratings.get("ratings"),
        year: years,
        name: companyUser[0],
        company: companyUser[2],
        email: companyUser[1]
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => err);
}

export function getWorldMapInfo(ratingsArray, years, token) {
  const ratings = new Map();

  if (ratingsArray) {
    ratings.set("ratings", JSON.stringify(ratingsArray));
  }

  return axios
    .get(process.env.REACT_APP_DASHBOARD_WOLRD_MAP_URL, {
      params: {
        ratings: ratings.get("ratings"),
        year: years,
        name: "fabio",
        company: "test",
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => err);
}
