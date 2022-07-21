/* eslint-disable no-console */
import axios from "axios";

// Actions

export function getRatingsByYear() {
  return axios
    .get(
      process.env.REACT_APP_DASHBOARD_URL_RATINGSTABLE + "year=2021" 
        
    )
    .then((res) => res.data)
    .catch((err) => err);
}

