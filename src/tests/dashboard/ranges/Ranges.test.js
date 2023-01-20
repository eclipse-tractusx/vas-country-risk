import { render, screen, fireEvent, act } from "@testing-library/react";

import { test } from "@jest/globals";
import RangeSlider from "../../../components/dashboard/RangeSlider/RangeSlider";
import {
  getAllRanges,
  sendValues,
} from "../../../components/services/ranges-api";
import "@testing-library/jest-dom/extend-expect";

import userEvent from "@testing-library/user-event";
import React, { useContext } from "react";
import { RangesContext, RangesProvider } from "../../../contexts/ranges";
import { ReportProvider } from "../../../contexts/reports";
import { CompanyUserProvider } from "../../../contexts/companyuser";

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
  sendValues: jest.fn(() => range),
  getAllRanges: jest.fn().mockReturnValue(range),
}));

it("should validate the green input", async () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));
  render(
    <CompanyUserProvider>
      <ReportProvider>
        <RangesProvider>
          <RangeSlider />
        </RangesProvider>
      </ReportProvider>
    </CompanyUserProvider>
  );
  const input = screen.getByTestId("input-slider-greenSlider");

  // simulate user input
  await userEvent.type(input, "51");
  await userEvent.tab();

  // check if the input value is updated
  expect(input.value).toBe("51");
});

it("should update green value", async () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));
  render(
    <CompanyUserProvider>
      <ReportProvider>
        <RangesProvider>
          <RangeSlider />
        </RangesProvider>
      </ReportProvider>
    </CompanyUserProvider>
  );

  const greenSlider = screen.getByTestId("slider-green");

  await act(async () => {
    fireEvent.mouseDown(greenSlider, {
      clientX: 1286,
      clientY: 367,
    });
  });
});

it("should update yellow value", async () => {
  await act(async () => {
    getAllRanges.mockImplementation(() => Promise.resolve(range));
    render(
      <CompanyUserProvider>
        <ReportProvider>
          <RangesProvider>
            <RangeSlider />
          </RangesProvider>
        </ReportProvider>
      </CompanyUserProvider>
    );
  });

  const yellowSlider = screen.getByTestId("slider-yellow");

  await act(async () => {
    fireEvent.mouseDown(yellowSlider, {
      clientX: 1435,
      clientY: 640,
      screenX: 1435,
      screenY: 640,
      button: 0,
      buttons: 1,
    });
  });
});
