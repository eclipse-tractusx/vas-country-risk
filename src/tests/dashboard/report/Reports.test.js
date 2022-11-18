import { render, act } from "@testing-library/react";
import { test } from "@jest/globals";
import Reports from "../../../components/dashboard/Reports/Reports";
import { getReportsByCompanyUser ,
  getReportValuesByReport,
  saveReports
} from "../../../components/services/reports-api";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { RatesProvider } from "../../../contexts/rates";

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

jest.mock("../../../components/services/reports-api", () => ({
  getReportsByCompanyUser: jest.fn(() => reports),
  getReportValuesByReport: jest.fn(() => reports),
  saveReports: jest.fn(),
}));

test("Renders Report", async () => {
  getReportsByCompanyUser.mockImplementation(() => Promise.resolve(reports));
  getReportValuesByReport.mockImplementation(() => Promise.resolve(reports));
  saveReports.mockImplementation(() => Promise.resolve(reports));
  const customerUser = { name: "test" };
  console.log(customerUser);
  let getByText;
  let getByTestId;
  await act(async () => {
    ({ getByText, getByTestId } = render(
      <RatesProvider>
        <Reports />
      </RatesProvider>
    ));
  });


  expect(getByTestId("radioClear")).toBeInTheDocument();
  userEvent.click(getByTestId("radioClear"));

  expect(getByText("Save Reports")).toBeInTheDocument();
  await userEvent.click(getByText("Save Reports"));

  expect(getByText("Close")).toBeInTheDocument();
  userEvent.click(getByText("Close"));
});
