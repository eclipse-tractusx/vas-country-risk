/* eslint-disable no-console */
import axios from "axios";

// Actions
export function uploadCsvFile(formData, token, companyUser) {
  return axios({
    method: "post",
    url: "http://localhost:8080/api/dashboard/uploadCsv",
    data: formData,
    params: {
      name: companyUser[0],
      company: companyUser[2],
      email: companyUser[1],
      id: 1
    },
    headers: {
      "Content-Type": `multipart/form-data`,
      Authorization: `Bearer ${token}`,
    },
  });
}
