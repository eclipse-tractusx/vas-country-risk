import { render, screen, act } from "@testing-library/react";
import { test } from "@jest/globals";
import Reports from "../../../components/dashboard/Reports/Reports";
import { getReportsByCompanyUser } from "../../../components/services/reports-api";
import "@testing-library/jest-dom/extend-expect";

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
  console.log(customerUser);
  let findAllByText;
  await (async () => {
    ({ findAllByText } = render(<Reports />));
  });

  //screen.findAllByAltText("table");
  //screen.getByDisplayValue("Select a Report Bellow");
  //expect(document.querySelector("#ButtonSave")).toHaveClass("#ButtonSave");
});
