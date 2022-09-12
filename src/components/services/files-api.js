/* eslint-disable no-console */
import axios from "axios";

// Actions
export function downloadSampleCsvFile(token) {
  return axios
    .get(process.env.REACT_APP_DASHBOARD_FILE_TEMPLATE_DOWNLOAD, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res)
    .catch((err) => err);
}
