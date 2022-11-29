/* eslint-disable no-console */
import axios from "axios";

// Actions

export function getAllDates(token, customerUser) {
  return axios
    .get(process.env.REACT_APP_DATEFORM_URL, {
      params: {
        name: customerUser.name,
        email: customerUser.email,
        companyName: customerUser.companyName,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => err);
}
