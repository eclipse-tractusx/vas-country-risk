/* eslint-disable no-console */
import axios from 'axios';

const apiUrl = process.env.REACT_APP_DASHBOARD_URL;

// Actions

export function getAll(){
    return axios.get(apiUrl).then(res => res.data)
    .catch(err => err)
}

