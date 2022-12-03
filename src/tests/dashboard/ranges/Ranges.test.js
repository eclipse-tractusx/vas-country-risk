import { render, act } from "@testing-library/react";
import { test } from "@jest/globals";
import RangeSlider from "../../../components/dashboard/RangeSlider/RangeSlider";
import { getAllRanges } from "../../../components/services/ranges-api";
import "@testing-library/jest-dom/extend-expect";
import { RangesProvider } from "../../../contexts/ranges";
import { ReportProvider } from "../../../contexts/reports";

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
}));

test("Ranges Test", async () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));
  const customerUser = { name: "test" };

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
});
