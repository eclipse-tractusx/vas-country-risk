import { render, act, fireEvent, useContext } from "@testing-library/react";
import { test } from "@jest/globals";
import * as React from "react";
import Reports from "../../../components/dashboard/Reports/Reports";
import {
  getReportsByCompanyUser,
  getReportValuesByReport,
  saveReports,
} from "../../../components/services/reports-api";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { RatesProvider, RatesContext } from "../../../contexts/rates";
import { CountryContext, CountryProvider } from "../../../contexts/country";
import {
  CompanyUserContext,
  CompanyUserProvider,
} from "../../../contexts/companyuser";

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
    type: "Global",
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

jest.mock("../../../components/services/reports-api", () => {
  const saveReports = jest.requireActual(
    "../../../components/services/reports-api"
  );

  return {
    __esModule: true,
    ...saveReports,
    getReportsByCompanyUser: jest.fn().mockReturnValue(reports),
    getReportValuesByReport: jest.fn().mockReturnValue(reportValues),
  };
});

//jest.spyOn(React,'useContext').mockImplementation(() =>(reports));

test("Renders Report", () => {
  getReportsByCompanyUser.mockImplementation(() => Promise.resolve(reports));
  getReportValuesByReport.mockImplementation(() =>
    Promise.resolve(reportValues)
  );

  const getContainer = () =>
    render(
      <RatesProvider value={rates}>
        <CountryProvider>
          <CompanyUserProvider value={customerUser}>
            <Reports />
          </CompanyUserProvider>
        </CountryProvider>
      </RatesProvider>
    );

  const saveRepBtn = getContainer().getByText("Save Reports");
  act(() => {
    fireEvent.click(saveRepBtn);
  });

  const optionOnlyMe = getContainer().getByText("Only For me");
  act(() => {
    fireEvent.click(optionOnlyMe);
  });

  const setName = getContainer()
    .getByTestId("inputReportName")
    .querySelector("input");
  act(() => {
    fireEvent.change(setName, { target: { value: "testreport" } });
  });

  const saveBtn = getContainer().getByText("Save");
  act(() => {
    fireEvent.click(saveBtn);
  });

  //expect(clearBtn).toBeInTheDocument();
  //expect(saveRepBtn).toBeInTheDocument()
  //expect(closeBtn).toBeInTheDocument();
});
