import { render, screen, act } from "@testing-library/react";
import { test } from "@jest/globals";
import Reports from "../../../components/dashboard/Reports/Reports";
import { getReportsByCompanyUser } from "../../../components/services/reports-api";

jest.mock("../../../components/services/reports-api", () => ({
  getReportsByCompanyUser: jest.fn(() => []),
}));

test("Renders Report", async () => {
  getReportsByCompanyUser.mockImplementation(() => Promise.resolve([]));
  const customerUser = { name: "test" };
  await (async () => render(<Reports />));
});
