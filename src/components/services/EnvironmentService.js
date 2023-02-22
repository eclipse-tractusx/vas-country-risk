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
const LOCAL_SERVICES_FRONTEND = process.env.REACT_APP_PORTAL_URL;
const LOCAL_SERVICES_BACKEND = process.env.REACT_APP_PORTAL_BACKEND_URL;

export const getHostname = () => window.location.hostname;

export const isLocal = () => getHostname() === "localhost";

export const getApiBase = () =>
  isLocal()
    ? LOCAL_SERVICES_BACKEND
    : window.location.origin.replace("portal", "portal-backend");

export const getAssetBase = () =>
  `${isLocal() ? LOCAL_SERVICES_FRONTEND : ""}/assets`;

export const getCentralIdp = () => {
  return process.env.REACT_APP_AUTH_URL;
};

export const getPortalLink = () => {
  return process.env.REACT_APP_PORTAL_URL;
};

export const getLogoutLink = () => {
  return process.env.REACT_APP_PORTAL_URL + "/logout";
};

export const getClientId = () => "Cl2-CX-Portal";

export const getCountryRiskClientId = () => "Cl16-CX-CRisk";

export const getClientIdSemantic = () => "Cl3-CX-Semantic";

export const getClientIdDigitalTwin = () => "Cl4-CX-DigitalTwin";

const EnvironmentService = {
  isLocal,
  getHostname,
  getApiBase,
  getAssetBase,
  getCentralIdp,
  getClientId,
  getClientIdSemantic,
  getClientIdDigitalTwin,
  getCountryRiskClientId,
};

export default EnvironmentService;
