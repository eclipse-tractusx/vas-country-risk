/* eslint-disable no-console */
import axios from "axios";

// Actions
export function uploadCsvFile(formData, token) {
  return axios({
    method: "post",
    url: "http://localhost:8080/api/dashboard/uploadCsv",
    data: formData,
    headers: {
      "Content-Type": `multipart/form-data`,
      Authorization: `Bearer ${token}`,
    },
  });
}
