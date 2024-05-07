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
const LogLevel = {
  SEVERE: "SEVERE",
  ERROR: " ERROR",
  WARN: "  WARN",
  INFO: "  INFO",
  DEBUG: " DEBUG",
};

export const logtime = () => new Date().toISOString().substring(11, 19);

export const log = (level, message) =>
  console.log(`${logtime()} ${level} ${message}`);

export const info = (message) => log(LogLevel.INFO, message);
export const warn = (message) => log(LogLevel.WARN, message);
export const error = (message) => log(LogLevel.ERROR, message);

const LogService = {
  LogLevel,
  logtime,
  log,
  info,
  warn,
  error,
};

export default LogService;
