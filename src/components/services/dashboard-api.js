/* eslint-disable no-console */
import axios from 'axios';


// Actions

export function getAll(){
    return axios.get(process.env.REACT_APP_DASHBOARD_URL).then(res => res.data)
    .catch(err => err)
}

