/********************************************************************************
 * Copyright (c) 2022,2024 BMW Group AG
 * Copyright (c) 2022,2024 Contributors to the Eclipse Foundation
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

import axios from "axios";
import { getCountryRiskApi } from "./EnvironmentService";
import UserService from "./UserService";

// Uploads a CSV file to the server.
export function uploadCsvFile(file, ratingName, year, type, customerUser) {
  const url = getCountryRiskApi() + process.env.REACT_APP_UPLOAD_FILE;
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(url, formData, {
    params: {
      name: customerUser.name,
      email: customerUser.email,
      companyName: customerUser.companyName,
    },
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${UserService.getToken()}`,
      ratingName: ratingName,
      year: year,
      type: type,
    },
  });
}
