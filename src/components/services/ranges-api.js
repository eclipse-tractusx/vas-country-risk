/* eslint-disable no-console */
import axios from "axios";

// Actions
export function getAllRanges() {
  return axios
    .get("http://localhost:8080/api/dashboard/UserRanges")  
    .then((res) => res.data)
    .catch((err) => err);
}

export function sendValues(valuesHigh, valuesMid, valuesLow) {

    var formData = new FormData();

    formData.append('rangeHigh', valuesHigh);
    formData.append('rangeMid', valuesMid);
    formData.append('rangeLow', valuesLow);

    return axios({
        method: 'post',
        url: 'http://localhost:8080/api/dashboard/sendRanges',
        data: formData,
      });

}

