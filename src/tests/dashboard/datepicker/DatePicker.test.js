import { render, act } from "@testing-library/react";
import { test } from "@jest/globals";
import DatePicker from "../../../components/dashboard/DatePicker/DatePicker";
import { getAllDates } from "../../../components/services/dateform-api";
import "@testing-library/jest-dom/extend-expect";
import { ReportProvider } from "../../../contexts/reports";

const date = [2022];

jest.mock("../../../components/services/dateform-api", () => ({
  getAllDates: jest.fn(() => date),
}));

const mockpassYearSelected = jest.fn();

test("DatePicker Test", async () => {
  getAllDates.mockImplementation(() => Promise.resolve(date));

  let getByText;
  await act(async () => {
    ({ getByText } = render(
      <ReportProvider>
        <DatePicker passYearSelected={mockpassYearSelected} />
      </ReportProvider>
    ));
  });
  expect(getByText("Select a Year")).toBeInTheDocument();
});
