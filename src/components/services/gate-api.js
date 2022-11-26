/* eslint-disable no-console */
import axios from "axios";

// Actions
export function getUserBpdmGates(token, customerUser) {
  return axios
    .get(process.env.REACT_APP_GET_USER_BPDM_GATES, {
      params: {
        name: customerUser.name,
        email: customerUser.email,
        companyName: customerUser.companyName,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => []);
}

export function getDataFromSelectedGate(token, customerUser) {
  return axios
    .get(process.env.REACT_APP_GET_FROM_SELECTED_GATE, {
      params: {
        name: customerUser.name,
        email: customerUser.email,
        companyName: customerUser.companyName,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => []);
}
