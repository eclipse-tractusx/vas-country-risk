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
import Keycloak from "keycloak-js";

import { ROLES } from "../../types/Constants";

import {
  getCentralIdp,
  getClientId,
  getClientIdSemantic,
  getClientIdDigitalTwin,
  getCountryRiskClientId,
  getBpdmId,
  getCountryRiskAppId,
} from "./EnvironmentService";
import { error, info } from "./LogService";

const keycloakConfig = {
  url: getCentralIdp(),
  realm: "CX-Central",
  clientId: getClientId(),
};

const keycloakConfigCountryRisk = {
  url: getCentralIdp(),
  realm: "CX-Central",
  clientId: getCountryRiskAppId(),
};

const keycloakConfigBpdm = {
  url: getCentralIdp(),
  realm: "CX-Central",
  clientId: getBpdmId(),
};

// TODO: add an ESLint exception until there is a solution
//* eslint @typescript-eslint/no-explicit-any: "off" */

const KC = new Keycloak(keycloakConfigCountryRisk);

const init = (onAuthenticatedCallback) => {
  KC.init({
    onLoad: "login-required",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
    pkceMethod: "S256",
  }).then((authenticated) => {
    if (authenticated) {
      info(`${getUsername()} authenticated`);
      onAuthenticatedCallback(getLoggedUser());
    } else {
      doLogin();
    }
  });
};

KC.onTokenExpired = () => {
  KC.updateToken(50)
    .then((refreshed) => {
      info(`${getUsername()} refreshed ${refreshed}`);
      //TODO: update token in redux store
      //store.dispatch(setLoggedUser(getLoggedUser()))
    })
    .catch(() => {
      error(`${getUsername()} refresh failed`);
    });
};

const doLogin = KC.login;

const doLogout = KC.logout;

const getToken = () => KC.token;

const getParsedToken = () => KC.tokenParsed;

const updateToken = () => KC.updateToken(5).catch(doLogin);

const getUsername = () => KC.tokenParsed.preferred_username;

const getName = () => KC.tokenParsed?.name;

const getEmail = () => KC.tokenParsed?.email;

const getCompany = () => KC.tokenParsed?.organisation;

const getTenant = () => KC.tokenParsed?.tenant;

// TODO: add a more sustainable logic for role management with multiple clients
// not sustainable because client roles need to be unique across all clients
const getRoles = () => {
  const rolesCountryRisk =
    KC.tokenParsed?.resource_access[keycloakConfigCountryRisk.clientId]
      ?.roles || [];
  const rolesBpdm =
    KC.tokenParsed?.resource_access[keycloakConfigBpdm.clientId]?.roles || [];
  return rolesCountryRisk.concat(rolesBpdm);
};

const hasRole = (role) => getRoles()?.includes(role);

const isAdmin = () => hasRole(ROLES.CX_ADMIN);

const isLoggedIn = () => !!KC.token;

const getLoggedUser = () => ({
  userName: getUsername(),
  name: getName(),
  email: getEmail(),
  company: getCompany(),
  tenant: getTenant(),
  roles: getRoles(),
  isAdmin: isAdmin(),
  token: getToken(),
  parsedToken: getParsedToken(),
});

const UserService = {
  doLogin,
  doLogout,
  getToken,
  getParsedToken,
  getEmail,
  getUsername,
  getName,
  getCompany,
  getTenant,
  getRoles,
  hasRole,
  init,
  isAdmin,
  isLoggedIn,
  updateToken,
};

export default UserService;
