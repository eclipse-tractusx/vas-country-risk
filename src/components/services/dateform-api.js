/* eslint-disable no-console */
import axios from "axios";

// Actions

export function getAllDates(token) {
  return axios
    .get(process.env.REACT_APP_DATEFORM_URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => err);
}
