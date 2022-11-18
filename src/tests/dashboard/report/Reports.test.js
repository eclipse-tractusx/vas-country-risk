import { render, act, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import Reports from "../../../components/dashboard/Reports/Reports";
import {
  getReportsByCompanyUser,
  getReportValuesByReport,
  saveReports
} from "../../../components/services/reports-api";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { RatesProvider } from "../../../contexts/rates";
import {
  CompanyUserContext,
  CompanyUserProvider,
} from "../../../contexts/companyuser";

const reports = [
  {
    id: 1,
    reportName: "fake rating",
    companyUserName: "joao",
    company: "CGI",
    type: "Company",
    reportValues: null,
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
    getReportValuesByReport: jest.fn(() => reports),
  };
});




test("Renders Report", async () => {
  getReportsByCompanyUser.mockImplementation(() => Promise.resolve(reports));
  getReportValuesByReport.mockImplementation(() => Promise.resolve(reports));

  /*const getContainer = () => 
  render(
    <CompanyUserProvider value={customerUser}>
      <RatesProvider>
        <Reports />
      </RatesProvider>
    </CompanyUserProvider>
  );*/

  let getByTestId;
  let getByText;
  await act(async () => {
    ({ getByTestId, getByText } = render(
      <CompanyUserProvider value={customerUser}>
        <RatesProvider>
          <Reports />
        </RatesProvider>
      </CompanyUserProvider>
    ));
  });

  expect(getByTestId("radioClear")).toBeInTheDocument();
  userEvent.click(getByTestId("radioClear"));

  expect(getByText("Save Reports")).toBeInTheDocument();
  await userEvent.click(getByText("Save Reports"));

  expect(getByText("Close")).toBeInTheDocument();
  userEvent.click(getByText("Close"));
});
