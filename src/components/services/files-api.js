/* eslint-disable no-console */
import axios from "axios";

// Actions
export function downloadSampleCsvFile(token, customerUser) {
  return axios
    .get(process.env.REACT_APP_DASHBOARD_FILE_TEMPLATE_DOWNLOAD, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        name: customerUser.name,
        email: customerUser.email,
        companyName: customerUser.companyName,
      },
    })
    .then((res) => res)
    .catch((err) => err);
}
