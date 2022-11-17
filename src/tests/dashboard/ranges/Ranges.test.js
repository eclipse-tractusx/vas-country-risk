import { render, act, fireEvent } from "@testing-library/react";
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
    id: null,
    range: "Min",
    value: 25,
    description: "Min Range",
    companyUser: {
      id: null,
      name: "Test User CX Admin",
      email: "cxadmin@cx.com",
      company: "CX-Test-Access",
    },
  },
  {
    id: null,
    range: "Between",
    value: 50,
    description: "BetWeen Range",
    companyUser: {
      id: null,
      name: "Test User CX Admin",
      email: "cxadmin@cx.com",
      company: "CX-Test-Access",
    },
  },
  {
    id: null,
    range: "Max",
    value: 100,
    description: null,
    companyUser: {
      id: null,
      name: "Test User CX Admin",
      email: "cxadmin@cx.com",
      company: "CX-Test-Access",
    },
  },
];

jest.mock("../../../components/services/ranges-api", () => ({
  getAllRanges: jest.fn().mockReturnValue(range),
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

  const saveRangesButton = getByText("Save Ranges");
  expect(saveRangesButton).toBeInTheDocument();
  act(() => {
    fireEvent.click(saveRangesButton);
  });
});
