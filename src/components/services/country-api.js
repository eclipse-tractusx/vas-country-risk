/* eslint-disable no-console */
import axios from "axios";

//Get BPN Countries
export function getCountryByUser(token, customerUser) {
  return axios
    .get(process.env.REACT_APP_GET_BPN_COUNTRYS, {
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

// Get Country bt ISO2
export function getCountrys(token, customerUser) {
  return axios
    .get(process.env.REACT_APP_GET_COUNTRYS, {
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
