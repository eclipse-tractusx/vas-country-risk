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
import { render, act, fireEvent, screen, within } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { CompanyUserProvider } from "../../../contexts/companyuser";
import { downloadSampleCsvFile } from "../../../components/services/files-api";
import UploadDownloadZone from "../../../components/dashboard/UploadDownloadZone/UploadDownloadZone";
import { ReloadProvider } from "../../../contexts/refresh";
import { Button, Dropzone, Input, Alert } from "cx-portal-shared-components";
import UserService, {
  getRoles,
  getName,
  getEmail,
  getCompany,
  getToken,
} from "../../../components/services/UserService";

const file = [];

jest.mock("cx-portal-shared-components", () => ({
  ...jest.requireActual("cx-portal-shared-components"),
  Dropzone: ({ children }) => <>{children}</>,
}));

jest.mock("../../../components/services/UserService", () => ({
  getRoles: jest.fn().mockReturnValue(() => ["Company Admin"]),
  getName: jest.fn(() => "User"),
  getEmail: jest.fn(() => "user@test.com"),
  getCompany: jest.fn(() => "companyTest"),
  getToken: jest.fn(() => "NotAToken"),
}));

jest.mock("../../../components/services/files-api", () => ({
  downloadSampleCsvFile: jest.fn().mockReturnValue(file),
}));

test("UploadDownload Unit Test", async () => {
  downloadSampleCsvFile.mockImplementation(() => Promise.resolve(file));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReloadProvider>
          <UploadDownloadZone />
        </ReloadProvider>
      </CompanyUserProvider>
    );
  });

  const downloadBtn = screen.getByText("Download Template");
  await act(async () => {
    fireEvent.click(downloadBtn);
  });

  expect(downloadBtn).toBeInTheDocument();
});

test("UploadDownload Unit Test and Close", async () => {
  downloadSampleCsvFile.mockImplementation(() => Promise.resolve(file));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReloadProvider>
          <UploadDownloadZone />
        </ReloadProvider>
      </CompanyUserProvider>
    );
  });

  //Upload Template
  const uploadBtn = screen.getByText("Upload Rating");
  await act(async () => {
    fireEvent.click(uploadBtn);
  });

  expect(uploadBtn).toBeInTheDocument();

  const optionOnlyMe = screen.getByText("Only For me");
  act(() => {
    fireEvent.click(optionOnlyMe);
  });

  expect(optionOnlyMe).toBeInTheDocument();

  const errorName = screen.getByTestId("inputelement").querySelector("input");
  act(() => {
    fireEvent.change(errorName, {
      target: { value: "nameToMuchLongForBeingAcceptednTheBox" },
    });
  });

  expect(errorName).toBeInTheDocument();

  const correctName = screen.getByTestId("inputelement").querySelector("input");
  act(() => {
    fireEvent.change(correctName, { target: { value: "correctName" } });
  });

  expect(correctName).toBeInTheDocument();

  const pickYear = screen.getByTestId("yearselect");

  act(() => {
    fireEvent.mouseDown(pickYear);
    fireEvent.click(pickYear);
  });

  const selectCompoEl = screen.getByTestId("yearselect");

  const button = within(selectCompoEl).getByRole("button");
  fireEvent.mouseDown(button);

  const listbox = within(screen.getByRole("presentation")).getByRole("listbox");

  const options = within(listbox).getAllByRole("option");

  fireEvent.click(options[1]);

  const nextBtn = screen.getByText("Next");
  await act(async () => {
    fireEvent.click(nextBtn);
  });

  expect(nextBtn).toBeInTheDocument();
  const closeButton = screen.getByTestId("closeSecond");

  act(() => {
    fireEvent.click(closeButton);
  });

  expect(closeButton).toBeInTheDocument();
});

test("UploadDownload Unit and Change Type", async () => {
  downloadSampleCsvFile.mockImplementation(() => Promise.resolve(file));
  getRoles.mockReturnValue(["Company Admin"]);
  getName.mockImplementation(() => Promise.resolve(["Company Admin"]));
  getEmail.mockImplementation(() => Promise.resolve(["Company Admin"]));
  getCompany.mockImplementation(() => Promise.resolve(["Company Admin"]));
  getToken.mockImplementation(() => Promise.resolve(["Company Admin"]));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReloadProvider>
          <UploadDownloadZone />
        </ReloadProvider>
      </CompanyUserProvider>
    );
  });

  //Upload Template
  const uploadBtn = screen.getByText("Upload Rating");
  await act(async () => {
    fireEvent.click(uploadBtn);
  });

  expect(uploadBtn).toBeInTheDocument();

  const optionOnlyMe = screen.getByText("Only For me");
  act(() => {
    fireEvent.click(optionOnlyMe);
  });

  expect(optionOnlyMe).toBeInTheDocument();

  const forTheCompany = screen.getByText("For the company");
  act(() => {
    fireEvent.click(forTheCompany);
  });

  expect(forTheCompany).toBeInTheDocument();
});
