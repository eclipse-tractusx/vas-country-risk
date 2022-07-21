/* eslint-disable no-console */
import axios from "axios";

// Actions

export function getAllDates() {
  return axios
    .get(
      process.env.REACT_APP_DATEFORM_URL
    )
    .then((res) => res.data)
    .catch((err) => err);
}

