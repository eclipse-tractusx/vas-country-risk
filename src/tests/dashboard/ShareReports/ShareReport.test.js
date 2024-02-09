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
import ShareReport from "../../../components/dashboard/ShareReport/ShareReport";
import { ReportProvider } from "../../../contexts/reports";
import { getUserFromCompany } from "../../../components/services/company-api";
import { CompanyUserProvider } from "../../../contexts/companyuser";

const closeDialogs = () => {
  return true;
};

const closeDialogsDeleteAndUpdate = () => {
  return (
    200,
    "Report changed sucessfully!",
    "You do not have the permission to change this report!"
  );
};

const companyUsers = [
  {
    name: "Test User CX Admin",
    email: "cxadmin@cx.com",
    companyName: "CX-Test-Access",
  },
  {
    name: "Test User CX User",
    email: "cxuser@cx.com",
    companyName: "CX-Test-Access",
  },
];

jest.mock("../../../components/services/company-api", () => ({
  getUserFromCompany: jest.fn(() => companyUsers),
}));

test("Share Report Tests", async () => {
  getUserFromCompany.mockImplementation(() => Promise.resolve(companyUsers));
  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReportProvider>
          <ShareReport
            closeDialogs={closeDialogs}
            closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
          ></ShareReport>
        </ReportProvider>
      </CompanyUserProvider>
    );
  });

  const shareBtn = screen.getByText("Share");
  await act(async () => {
    fireEvent.click(shareBtn);
  });
  expect(shareBtn).toBeInTheDocument();
});

test("Close Share Report", async () => {
  getUserFromCompany.mockImplementation(() => Promise.resolve(companyUsers));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReportProvider>
          <ShareReport
            closeDialogs={closeDialogs}
            closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
          ></ShareReport>
        </ReportProvider>
      </CompanyUserProvider>
    );
  });

  const shareBtn = screen.getByText("Close");
  await act(async () => {
    fireEvent.click(shareBtn);
  });
  expect(shareBtn).toBeInTheDocument();
});
