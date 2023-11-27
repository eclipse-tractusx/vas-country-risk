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
import { render, act, fireEvent, screen } from "@testing-library/react";
import { test } from "@jest/globals";
import * as React from "react";
import Reports from "../../../components/dashboard/Reports/Reports";
import {
  getReportsByCompanyUser,
  getReportValuesByReport,
  saveReports,
  updateReports,
  deleteReport,
} from "../../../components/services/reports-api";
import '@testing-library/jest-dom';
import { RatesProvider } from "../../../contexts/rates";
import { CountryProvider } from "../../../contexts/country";
import { CompanyUserProvider } from "../../../contexts/companyuser";
import { ReportProvider } from "../../../contexts/reports";
import { ReloadProvider } from "../../../contexts/refresh";
import Ratings from "../../../components/dashboard/Ratings/Ratings";
import { getRatingsByYear } from "../../../components/services/ratingstable-api";
import { getUserFromCompany } from "../../../components/services/company-api";

const reports = [
  {
    id: 3,
    reportName: "Fabio Report 2",
    companyUserName: "Test User CX Admin",
    company: "CX-Test-Access",
    type: "Company",
    reportValues: null,
  },
];
const reportValues = [
  {
    id: 7,
    name: "Range",
    objectValue: [
      [0, "1"],
      [2, 11],
      [12, 100],
    ],
  },
];

const rates = [
  {
    id: 1,
    dataSourceName: "CPI Rating 2021",
    type: "Custom",
    yearPublished: 2021,
    fileName: null,
    companyUser: null,
    weight: 100,
  },
];

const customerUser = [
  {
    name: "Test",
    email: "test@test-cx.com",
    company: "testCompany",
  },
];

const response = {
  status: 204,
  name: "AxiosError",
  response: {
    status: 400,
  },
};

const passValuesFromComponent = (rates) => {
  return rates;
};

const passAutomaticWeightChange = (weight) => {
  return 1;
};

jest.mock("../../../components/services/reports-api", () => ({
  saveReports: jest.fn().mockReturnValue(response),
  getReportsByCompanyUser: jest.fn().mockReturnValue(reports),
  getReportValuesByReport: jest.fn().mockReturnValue(reportValues),
  updateReports: jest.fn().mockReturnValue(response),
  deleteReport: jest.fn().mockReturnValue(response),
}));

jest.mock("../../../components/services/ratingstable-api", () => ({
  getRatingsByYear: jest.fn().mockReturnValue(rates),
}));

jest.mock("../../../components/services/company-api", () => ({
  getUserFromCompany: jest.fn(() => customerUser),
}));

test("Renders Report Save", async () => {
  getReportsByCompanyUser.mockImplementation(() => Promise.resolve(reports));
  getReportValuesByReport.mockImplementation(() =>
    Promise.resolve(reportValues)
  );
  saveReports.mockImplementation(() => Promise.resolve({ status: 200 }));
  await act(async () => {
    render(
      <ReloadProvider>
        <RatesProvider value={rates}>
          <CountryProvider>
            <CompanyUserProvider value={customerUser}>
              <Reports />
            </CompanyUserProvider>
          </CountryProvider>
        </RatesProvider>
      </ReloadProvider>
    );
  });

  const saveRepBtn = screen.getByText("Save Reports");
  await act(async () => {
    fireEvent.click(saveRepBtn);
  });

  const optionOnlyMe = screen.getByText("Only For me");
  await act(async () => {
    fireEvent.click(optionOnlyMe);
  });

  const setWrongName = screen
    .getByTestId("inputReportName")
    .querySelector("input");
  await act(async () => {
    fireEvent.change(setWrongName, {
      target: { value: "testreportToLONGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG" },
    });
  });

  const setName = screen.getByTestId("inputReportName").querySelector("input");
  await act(async () => {
    fireEvent.change(setName, { target: { value: "testreport" } });
  });

  const saveBtn = screen.getByText("Save");
  await act(async () => {
    fireEvent.click(saveBtn);
  });
});

test("Renders Report Update", async () => {
  getReportsByCompanyUser.mockImplementation(() => Promise.resolve(reports));
  getReportValuesByReport.mockImplementation(() =>
    Promise.resolve(reportValues)
  );
  saveReports.mockImplementation(() => Promise.resolve(response));
  updateReports.mockImplementation(() => Promise.resolve(response));
  await act(async () => {
    render(
      <ReloadProvider>
        <RatesProvider value={rates}>
          <CountryProvider>
            <CompanyUserProvider value={customerUser}>
              <ReportProvider>
                <Reports />
              </ReportProvider>
            </CompanyUserProvider>
          </CountryProvider>
        </RatesProvider>
      </ReloadProvider>
    );
  });

  const selectItem = screen.getAllByTestId("radio-choose-report");
  await act(async () => {
    fireEvent.click(selectItem[0]);
  });

  const saveIcon = screen.getByTestId("saveIcon");
  await act(async () => {
    fireEvent.click(saveIcon);
  });

  const clickYes = screen.getByTestId("btnYes");
  await act(async () => {
    fireEvent.click(clickYes);
  });
});

test("Renders Report Delete", async () => {
  getReportsByCompanyUser.mockImplementation(() => Promise.resolve(reports));
  getReportValuesByReport.mockImplementation(() =>
    Promise.resolve(reportValues)
  );
  saveReports.mockImplementation(() => Promise.resolve(response));
  updateReports.mockImplementation(() => Promise.resolve(response));
  deleteReport.mockImplementation(() => Promise.resolve(response));
  await act(async () => {
    render(
      <ReloadProvider>
        <RatesProvider value={rates}>
          <CountryProvider>
            <CompanyUserProvider value={customerUser}>
              <ReportProvider>
                <Reports />
              </ReportProvider>
            </CompanyUserProvider>
          </CountryProvider>
        </RatesProvider>
      </ReloadProvider>
    );
  });

  const selectItem = screen.getAllByTestId("radio-choose-report");
  await act(async () => {
    fireEvent.click(selectItem[0]);
  });

  const saveIcon = screen.getByTestId("deleteIcon");
  await act(async () => {
    fireEvent.click(saveIcon);
  });

  const clickYes = screen.getByTestId("btnYes");
  await act(async () => {
    fireEvent.click(clickYes);
  });
});

test("Renders Report Save wiht custom Selection", async () => {
  getReportsByCompanyUser.mockImplementation(() => Promise.resolve(reports));
  getReportValuesByReport.mockImplementation(() =>
    Promise.resolve(reportValues)
  );
  saveReports.mockImplementation(() => Promise.resolve({ status: 200 }));
  getRatingsByYear.mockImplementation(() => Promise.resolve(rates));
  await act(async () => {
    render(
      <ReloadProvider>
        <RatesProvider value={rates}>
          <CountryProvider>
            <CompanyUserProvider value={customerUser}>
              <Ratings
                passValuesFromComponent={passValuesFromComponent}
                passAutomaticWeightChange={passAutomaticWeightChange}
                years={2021}
              />
              <Reports />
            </CompanyUserProvider>
          </CountryProvider>
        </RatesProvider>
      </ReloadProvider>
    );
  });

  //Select all Ratings
  const ratingsTable = screen.getAllByLabelText("Select all rows");
  await act(async () => {
    fireEvent.click(ratingsTable[0]);
  });
  expect(ratingsTable[0]).toBeInTheDocument();

  const saveRepBtn = screen.getByText("Save Reports");
  await act(async () => {
    fireEvent.click(saveRepBtn);
  });
});

test("Renders Report Share", async () => {
  getReportsByCompanyUser.mockImplementation(() => Promise.resolve(reports));
  getReportValuesByReport.mockImplementation(() =>
    Promise.resolve(reportValues)
  );
  saveReports.mockImplementation(() => Promise.resolve(response));
  updateReports.mockImplementation(() => Promise.resolve(response));
  deleteReport.mockImplementation(() => Promise.resolve(response));
  getUserFromCompany.mockImplementation(() => Promise.resolve(customerUser));
  await act(async () => {
    render(
      <ReloadProvider>
        <RatesProvider value={rates}>
          <CountryProvider>
            <CompanyUserProvider value={customerUser}>
              <ReportProvider>
                <Reports />
              </ReportProvider>
            </CompanyUserProvider>
          </CountryProvider>
        </RatesProvider>
      </ReloadProvider>
    );
  });

  const selectItem = screen.getAllByTestId("radio-choose-report");
  await act(async () => {
    fireEvent.click(selectItem[0]);
  });

  const saveIcon = screen.getByTestId("shareIcon");
  await act(async () => {
    fireEvent.click(saveIcon);
  });

  expect(saveIcon).toBeInTheDocument();
});

test("Renders Report Delete with error 401", async () => {
  getReportsByCompanyUser.mockImplementation(() => Promise.resolve(reports));
  getReportValuesByReport.mockImplementation(() =>
    Promise.resolve(reportValues)
  );
  saveReports.mockImplementation(() => Promise.resolve(response));
  updateReports.mockImplementation(() => Promise.resolve(response));
  deleteReport.mockImplementation(() => Promise.resolve(401));
  await act(async () => {
    render(
      <ReloadProvider>
        <RatesProvider value={rates}>
          <CountryProvider>
            <CompanyUserProvider value={customerUser}>
              <ReportProvider>
                <Reports />
              </ReportProvider>
            </CompanyUserProvider>
          </CountryProvider>
        </RatesProvider>
      </ReloadProvider>
    );
  });

  const selectItem = screen.getAllByTestId("radio-choose-report");
  await act(async () => {
    fireEvent.click(selectItem[0]);
  });

  const saveIcon = screen.getByTestId("deleteIcon");
  await act(async () => {
    fireEvent.click(saveIcon);
  });

  const clickYes = screen.getByTestId("btnYes");
  await act(async () => {
    fireEvent.click(clickYes);
  });
});

test("Renders Report Delete with error 500", async () => {
  getReportsByCompanyUser.mockImplementation(() => Promise.resolve(reports));
  getReportValuesByReport.mockImplementation(() =>
    Promise.resolve(reportValues)
  );
  saveReports.mockImplementation(() => Promise.resolve(response));
  updateReports.mockImplementation(() => Promise.resolve(response));
  deleteReport.mockImplementation(() => Promise.resolve(500));
  getUserFromCompany.mockImplementation(() => Promise.resolve(customerUser));
  await act(async () => {
    render(
      <ReloadProvider>
        <RatesProvider value={rates}>
          <CountryProvider>
            <CompanyUserProvider value={customerUser}>
              <ReportProvider>
                <Reports />
              </ReportProvider>
            </CompanyUserProvider>
          </CountryProvider>
        </RatesProvider>
      </ReloadProvider>
    );
  });

  const selectItem = screen.getAllByTestId("radio-choose-report");
  await act(async () => {
    fireEvent.click(selectItem[0]);
  });

  const saveIcon = screen.getByTestId("deleteIcon");
  await act(async () => {
    fireEvent.click(saveIcon);
  });

  const clickYes = screen.getByTestId("btnYes");
  await act(async () => {
    fireEvent.click(clickYes);
  });
});
