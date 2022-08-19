/* eslint-disable no-console */
import axios from "axios";

// Actions
export function uploadCsvFile(formData) {
  return axios({
    method: "post",
    url: "http://localhost:8080/api/dashboard/uploadCsv",
    data: formData,
    headers: {
      "Content-Type": `multipart/form-data`,
    },
  });
}
