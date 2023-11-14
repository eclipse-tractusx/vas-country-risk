/********************************************************************************
* Copyright (c) 2022,2023 BMW Group AG 
* Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
*
* See the NOTICE file(s) distributed with this work for additional
* information regarding copyright ownership.
*
* This program and the accompanying materials are made available under the
* terms of the Apache License, Version 2.0 which is available at
* https://www.apache.org/licenses/LICENSE-2.0.
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations
* under the License.
*
* SPDX-License-Identifier: Apache-2.0
********************************************************************************/
/* eslint-disable no-console */
import axios from "axios";
import  { getCountryRiskApi } from "./EnvironmentService"

// Actions
export function getAll(ratingsArray, years, token, customerUser, gates) {
  const ratingsParam = Array.isArray(ratingsArray)
    ? ratingsArray.map((rating) => JSON.stringify(rating))
    : [];

  return axios
    .get(getCountryRiskApi() + process.env.REACT_APP_DASHBOARD_URL, {
      params: {
        // Use the serialized and encoded ratingsParam
        "ratings[]": ratingsParam,
        year: years,
        name: customerUser.name,
        email: customerUser.email,
        companyName: customerUser.companyName,
        gate: gates,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => err);
}

export function getWorldMapInfo(
  ratingsArray,
  years,
  token,
  customerUser,
  gates
) {
  const ratingsParam = Array.isArray(ratingsArray)
    ? ratingsArray.map((rating) => JSON.stringify(rating))
    : [];

  return axios
    .get(getCountryRiskApi() + process.env.REACT_APP_DASHBOARD_WOLRD_MAP_URL, {
      params: {
        // Use the serialized and encoded ratingsParam
        "ratings[]": ratingsParam,
        year: years,
        name: customerUser.name,
        email: customerUser.email,
        companyName: customerUser.companyName,
        gate: gates,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => err);
}
