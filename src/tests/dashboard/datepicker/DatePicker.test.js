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
import { render, act, screen, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import DatePicker from "../../../components/dashboard/DatePicker/DatePicker";
import { getAllDates } from "../../../components/services/dateform-api";
import "@testing-library/jest-dom/extend-expect";
import { ReportProvider } from "../../../contexts/reports";
import { CompanyUserProvider } from "../../../contexts/companyuser";

const date = [2022];

jest.mock("../../../components/services/dateform-api", () => ({
  getAllDates: jest.fn(() => date),
}));

const mockpassYearSelected = jest.fn();

test("DatePicker Test", async () => {
  getAllDates.mockImplementation(() => Promise.resolve(date));
  const customerUser = { name: "test" };
  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReportProvider>
          <DatePicker passYearSelected={mockpassYearSelected} />
        </ReportProvider>
      </CompanyUserProvider>
    );
  });

  const picker = screen.getByText("Select a Year");

  expect(picker).toBeInTheDocument();

});
