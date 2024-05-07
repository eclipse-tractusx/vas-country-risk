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
import { render, act, fireEvent, screen } from "@testing-library/react";
import { test } from "@jest/globals";
import '@testing-library/jest-dom';
import GatePicker from "../../../components/dashboard/GatePicker/GatePicker";
import { getUserBpdmGates } from "../../../components/services/gate-api";
import { CompanyUserProvider } from "../../../contexts/companyuser";

const gates = [
  {
    id: 1,
    gateName: "BMW",
    companyGateValue: "",
  },
  {
    id: 2,
    gateName: "BMW M GmbH",
    companyGateValue: "",
  },
];

jest.mock("../../../components/services/gate-api", () => ({
  getUserBpdmGates: jest.fn(() => gates),
}));

test("Gate Picker Test", async () => {
  getUserBpdmGates.mockImplementation(() => Promise.resolve(gates));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <GatePicker />
      </CompanyUserProvider>
    );
  });
});
