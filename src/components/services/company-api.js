/* eslint-disable no-console */
import axios from "axios";

// Actions
export function getUserFromCompany(token, customerUser) {
  return axios
    .get(process.env.REACT_APP_GET_COMPANY_USERS, {
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
