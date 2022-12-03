import { render, act } from "@testing-library/react";
import { test } from "@jest/globals";
import Reports from "../../../components/dashboard/Reports/Reports";
import { getReportsByCompanyUser } from "../../../components/services/reports-api";
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
}));

test("Renders Report", async () => {
  getReportsByCompanyUser.mockImplementation(() => Promise.resolve(reports));
  const customerUser = { name: "test" };

  let getByText;
  await act(async () => {
    ({ getByText } = render(
      <RatesProvider>
        <Reports />
      </RatesProvider>
    ));
  });
  expect(getByText("Save Reports")).toBeInTheDocument();
  await userEvent.click(getByText("Save Reports"));
});
