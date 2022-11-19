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
import {
  CompanyUserContext,
  CompanyUserProvider,
} from "../../../contexts/companyuser";
import React, { useContext } from "react";

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

const customerUser = {
  name: "Test",
  email: "test@test-cx.com",
  company: "testCompany",
};

jest.mock("../../../components/services/ranges-api", () => {
  const sendValues = jest.requireActual(
    "../../../components/services/ranges-api"
  );

  return {
    __esModule: true,
    ...sendValues,
    getAllRanges: jest.fn().mockReturnValue(range),
  };
});

test("Ranges Click Button to Save", () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));

  const getContainer = () =>
    render(
      <CompanyUserProvider>
        <ReportProvider>
          <RangesProvider>
            <RangeSlider />
          </RangesProvider>
        </ReportProvider>
      </CompanyUserProvider>
    );

  const buttonSaveRanges = getContainer().getByText("Save Ranges");
  act(() => {
    fireEvent.click(buttonSaveRanges);
  });

  expect(buttonSaveRanges).toBeInTheDocument();
});

test("Ranges Change Input Slider", async () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));

  let getByTestId;
  await act(async () => {
    ({ getByTestId } = render(
      <CompanyUserProvider>
        <ReportProvider>
          <RangesProvider>
            <RangeSlider />
          </RangesProvider>
        </ReportProvider>
      </CompanyUserProvider>
    ));
  });
  const getSliderGreen = getByTestId("input-slider-greenSlider");
  act(() => {
    fireEvent.blur(getSliderGreen);
  });
  expect(getSliderGreen).toBeInTheDocument();

  const getSliderYellowRight = getByTestId("input-slider-yellow-left");
  act(() => {
    fireEvent.change(getSliderYellowRight, { target: { value: 40 } });
  });

  expect(getSliderYellowRight).toBeInTheDocument();

  const getSliderYellowLeft = getByTestId("input-slider-yellow-right");
  act(() => {
    fireEvent.change(getSliderYellowLeft, { target: { value: 70 } });
  });

  expect(getSliderYellowLeft).toBeInTheDocument();

  const getSliderYellowRed = getByTestId("input-slider-red-right");
  act(() => {
    fireEvent.change(getSliderYellowRed, { target: { value: 10 } });
  });

  expect(getSliderYellowRed).toBeInTheDocument();
});

test("Ranges Change Blur Slider", async () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));

  let getByTestId;
  await act(async () => {
    ({ getByTestId } = render(
      <CompanyUserProvider>
        <ReportProvider>
          <RangesProvider>
            <RangeSlider />
          </RangesProvider>
        </ReportProvider>
      </CompanyUserProvider>
    ));
  });
  const getSliderGreen = getByTestId("input-slider-greenSlider");
  act(() => {
    fireEvent.blur(getSliderGreen, { target: { value: 40 } });
  });
  expect(getSliderGreen).toBeInTheDocument();

  const getSliderYellowRight = getByTestId("input-slider-yellow-left");
  act(() => {
    fireEvent.blur(getSliderYellowRight, { target: { value: 40 } });
  });

  expect(getSliderYellowRight).toBeInTheDocument();

  const getSliderYellowLeft = getByTestId("input-slider-yellow-right");
  act(() => {
    fireEvent.blur(getSliderYellowLeft, { target: { value: 70 } });
  });

  expect(getSliderYellowLeft).toBeInTheDocument();

  const getSliderYellowRed = getByTestId("input-slider-red-right");
  act(() => {
    fireEvent.blur(getSliderYellowRed, { target: { value: 10 } });
  });

  expect(getSliderYellowRed).toBeInTheDocument();
});
