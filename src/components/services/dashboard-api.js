/* eslint-disable no-console */
import axios from "axios";

// Actions
export function getAll(ratingsArray, years, token, customerUser, gates) {
  return axios
    .get(process.env.REACT_APP_DASHBOARD_URL, {
      params: {
        ratings: ratingsArray,
        year: years,
        name: customerUser.name,
        email: customerUser.email,
        companyName: customerUser.companyName,
        gate: gates,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => err);
}

export function getWorldMapInfo(
  ratingsArray,
  years,
  token,
  customerUser,
  gates
) {
  return axios
    .get(process.env.REACT_APP_DASHBOARD_WOLRD_MAP_URL, {
      params: {
        ratings: ratingsArray,
        year: years,
        name: customerUser.name,
        email: customerUser.email,
        companyName: customerUser.companyName,
        gate: gates,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => err);
}
