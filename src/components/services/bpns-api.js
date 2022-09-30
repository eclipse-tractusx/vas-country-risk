/* eslint-disable no-console */
import axios from "axios";

// Actions
export function getBpns(token, customerUser) {
  return axios
    .get(process.env.REACT_APP_GET_BPNS, {
      params: {
        name: customerUser.name,
        email: customerUser.email,
        company: customerUser.company,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => []);
}
