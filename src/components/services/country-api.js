/* eslint-disable no-console */
import axios from "axios";

// Actions
export function getAllCountrys(token) {
  return axios
    .get(process.env.REACT_APP_GET_COUNTRYS, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => err);
}
