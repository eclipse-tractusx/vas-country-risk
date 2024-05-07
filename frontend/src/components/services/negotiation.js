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

const API_BASE_URL = getCountryRiskApi(); // Update with your actual base URL

// Function to fetch catalog items
export const fetchCatalogItems = async (authToken) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}` + process.env.REACT_APP_GET_QUERY_CATALOG,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Assuming bearer token is used for auth
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch catalog items:", error);
    throw error;
  }
};

// Function to trigger negotiation with selected items
export const triggerNegotiation = async (selectedItems, authToken) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}` + process.env.REACT_APP_POST_TRIGGER_NEGOTIATION,
      selectedItems,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Assuming bearer token is used for auth
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to trigger negotiation:", error);
    throw error;
  }
};
