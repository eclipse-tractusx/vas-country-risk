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
const LOCAL_SERVICES_FRONTEND =
  window.ENV?.REACT_APP_PORTAL_FRONTEND?.valueOf();
const REACT_APP_COUNTRY_RISK_API =
  window.ENV?.REACT_APP_COUNTRY_RISK_API?.valueOf();
const LOCAL_SERVICES_BACKEND = window.ENV?.REACT_APP_PORTAL_BACKEND?.valueOf();
const LOCAL_SERVICES_CENTRALIDP = window.ENV?.REACT_APP_AUTH_URL?.valueOf();
export const getHostname = () => window.location.hostname;

export const isLocal = () => getHostname() === "localhost";

export const getApiBase = () =>
  isLocal()
    ? LOCAL_SERVICES_BACKEND
    : window.location.origin.replace("portal", "portal-backend");

export const getAssetBase = () =>
  `${isLocal() ? LOCAL_SERVICES_FRONTEND : ""}/assets`;

export const getCentralIdp = () => {
  return LOCAL_SERVICES_CENTRALIDP;
};

export const getPortalLink = () => {
  return LOCAL_SERVICES_FRONTEND;
};
export const getCountryRiskApi = () => {
  return REACT_APP_COUNTRY_RISK_API;
};

export const getLogoutLink = () => {
  return LOCAL_SERVICES_FRONTEND + "/logout";
};

export const getClientId = () => "Cl2-CX-Portal";

export const getCountryRiskClientId = () => "Cl16-CX-CRisk";

export const getCountryRiskAppId = () => "app374";

export const getBpdmId = () => "Cl7-CX-BPDM";

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
  getCountryRiskAppId,
  getCountryRiskApi,
  getBpdmId,
};

export default EnvironmentService;
