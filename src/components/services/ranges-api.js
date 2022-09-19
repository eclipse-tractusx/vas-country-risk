/* eslint-disable no-console */
import axios from "axios";
import { Range } from "../model/Range";

// Actions
export function getAllRanges(token, companyUser) {
  return axios
    .get(process.env.REACT_APP_GET_RANGES, {
      params: {
        name: companyUser[0],
        company: companyUser[2],
        email: companyUser[1],
        id: 1
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => err);
}

export function sendValues(rangesList, companyUser, token) {
  const rangeDTOS = [];
  rangesList.forEach((element) => {
    let range = "";
    if (element[0] === 0) {
      range = new Range("Min", element[1], "Min Range");
    } else if (element[1] === 100) {
      range = new Range("Max", element[1], "Max Range");
    } else {
      range = new Range("Between", element[1], "BetWeen Range");
    }
    rangeDTOS.push(range);
  });

  return axios({
    method: "post",
    url: process.env.REACT_APP_SAVE_RANGES,
    data: rangeDTOS,
    params: {
      name: companyUser[0],
      company: companyUser[2],
      email: companyUser[1],
      id: 1
    },

    headers: { Authorization: `Bearer ${token}` },
  });
}
