import { render, act } from "@testing-library/react";
import { test } from "@jest/globals";
import RangeSlider from "../../../components/dashboard/RangeSlider/RangeSlider";
import {
  getAllRanges,
  sendValues,
} from "../../../components/services/ranges-api";
import "@testing-library/jest-dom/extend-expect";
import { RangesProvider } from "../../../contexts/ranges";
import { ReportProvider } from "../../../contexts/reports";
import userEvent from "@testing-library/user-event";

const range = [
  {
    id: 0,
    range: "Max",
    value: 80,
    description: "Max value",
    companyUser: {
      id: 0,
      name: "John",
      email: "John@email.com",
      company: "TestCompany",
    },
  },
];

jest.mock("../../../components/services/ranges-api", () => ({
  getAllRanges: jest.fn(() => range),
  sendValues: jest.fn(),
}));

test("Ranges Test", async () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));
  sendValues.mockImplementation(() => Promise.resolve(range));
  const customerUser = { name: "test" };
  console.log(customerUser);
  let getByText;
  await act(async () => {
    ({ getByText } = render(
      <ReportProvider>
        <RangesProvider>
          <RangeSlider />
        </RangesProvider>
      </ReportProvider>
    ));
  });
  expect(getByText("Save Ranges")).toBeInTheDocument();
  await userEvent.click(getByText("Save Ranges"));
});
