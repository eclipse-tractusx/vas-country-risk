/* eslint-disable no-console */
import axios from "axios";

// Actions
export function uploadCsvFile(formData, token, customerUser) {
  return axios({
    method: "post",
    url: "http://localhost:8080/api/dashboard/uploadCsv",
    data: formData,
    params: {
      name: customerUser.name,
      email: customerUser.email,
      companyName: customerUser.companyName,
    },
    headers: {
      "Content-Type": `multipart/form-data`,
      Authorization: `Bearer ${token}`,
    },
  });
}
