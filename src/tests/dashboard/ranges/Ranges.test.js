import { render, act, screen ,fireEvent } from "@testing-library/react";
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

const NoErrorStatus = {
  status: 200,
};

jest.mock("../../../components/services/ranges-api", () => {


  return {
    __esModule: true,
    sendValues: jest.fn().mockReturnValue(NoErrorStatus),
    getAllRanges: jest.fn().mockReturnValue(range),
  };
});

test("Ranges Change Input Slider", async () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));
  sendValues.mockImplementation(() => Promise.resolve(NoErrorStatus));

  let getByTestId;
  let getByText;
  await act(async () => {
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

  const buttonSaveRanges = screen.getByText("Save Ranges");

  act(() => {
    fireEvent.click(buttonSaveRanges);
  });

  expect(buttonSaveRanges).toBeInTheDocument();

  const getSliderGreen = screen.getByTestId("input-slider-greenSlider");
  act(() => {
    fireEvent.blur(getSliderGreen);
  });
  expect(getSliderGreen).toBeInTheDocument();

  const getSliderYellowRight = screen.getByTestId("input-slider-yellow-left");
  act(() => {
    fireEvent.change(getSliderYellowRight, { target: { value: 40 } });
  });

  expect(getSliderYellowRight).toBeInTheDocument();

  const getSliderYellowLeft = screen.getByTestId("input-slider-yellow-right");
  act(() => {
    fireEvent.change(getSliderYellowLeft, { target: { value: 70 } });
  });

  expect(getSliderYellowLeft).toBeInTheDocument();

  const getSliderYellowRed = screen.getByTestId("input-slider-red-right");
  act(() => {
    fireEvent.change(getSliderYellowRed, { target: { value: 10 } });
  });

  expect(getSliderYellowRed).toBeInTheDocument();
});

test("Ranges Change Blur Slider", async () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));

  let getByTestId;
  await act(async () => {
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
  const getSliderGreen = screen.getByTestId("input-slider-greenSlider");
  act(() => {
    fireEvent.blur(getSliderGreen, { target: { value: 71} });
  });
  expect(getSliderGreen).toBeInTheDocument();

  const getSliderYellowRight = screen.getByTestId("input-slider-yellow-left");
  act(() => {
    fireEvent.blur(getSliderYellowRight, { target: { value: 11 } });
  });

  expect(getSliderYellowRight).toBeInTheDocument();

  const getSliderYellowLeft = screen.getByTestId("input-slider-yellow-right");
  act(() => {
    fireEvent.blur(getSliderYellowLeft, { target: { value: 70 } });
  });

  expect(getSliderYellowLeft).toBeInTheDocument();

  const getSliderYellowRed = screen.getByTestId("input-slider-red-right");
  act(() => {
    fireEvent.blur(getSliderYellowRed, { target: { value: 10 } });
  });

  expect(getSliderYellowRed).toBeInTheDocument();
});

test("Ranges Move Slider", async () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));

  let getByTestId;
  await act(async () => {
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
  const getSliderGreen = screen.getByTestId("slider-green");

  act(() => {
    fireEvent.mouseDown(getSliderGreen, {
      clientX: 1286,
      clientY: 367,
    });
  });

  expect(getSliderGreen).toBeInTheDocument();

  const getSliderYellow = screen.getByTestId("slider-yellow");

  act(() => {
    fireEvent.mouseDown(getSliderYellow, {
      clientX: 1281,
      clientY: 404,
    });
  });

  expect(getSliderYellow).toBeInTheDocument();

  const getSliderRed = screen.getByTestId("slider-red");

  act(() => {
    fireEvent.mouseDown(getSliderRed, {
      clientX: 1136,
      clientY: 440,
    });
  });

  expect(getSliderRed).toBeInTheDocument();
});


//Ranges Wrong values to give error
test("Ranges Change wrong values Slider", async () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));

  let getByTestId;
  await act(async () => {
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
  const getSliderGreen = screen.getByTestId("input-slider-greenSlider");
  act(() => {
    fireEvent.blur(getSliderGreen, { target: { value: 100} });
  });
  expect(getSliderGreen).toBeInTheDocument();

  const getSliderYellowRight = screen.getByTestId("input-slider-yellow-left");
  act(() => {
    fireEvent.blur(getSliderYellowRight, { target: { value: 100 } });
  });

  expect(getSliderYellowRight).toBeInTheDocument();

  const getSliderYellowLeft = screen.getByTestId("input-slider-yellow-right");
  act(() => {
    fireEvent.blur(getSliderYellowLeft, { target: { value: 100 } });
  });

  expect(getSliderYellowLeft).toBeInTheDocument();

  const getSliderYellowRed = screen.getByTestId("input-slider-red-right");
  act(() => {
    fireEvent.blur(getSliderYellowRed, { target: { value: 100 } });
  });

  expect(getSliderYellowRed).toBeInTheDocument();
});


//Change values automaticly if green bellow read and Yellow
test("Ranges automatic change green", async () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));

  let getByTestId;
  await act(async () => {
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
  const getSliderGreen = screen.getByTestId("input-slider-greenSlider");
  act(() => {
    fireEvent.blur(getSliderGreen, { target: { value: 4} });
  });
  expect(getSliderGreen).toBeInTheDocument();

  const getSliderYellowRight = screen.getByTestId("input-slider-yellow-left");
  act(() => {
    fireEvent.blur(getSliderYellowRight, { target: { value: 97 } });
  });

  expect(getSliderYellowRight).toBeInTheDocument();

  const getSliderYellowLeft = screen.getByTestId("input-slider-yellow-right");
  act(() => {
    fireEvent.blur(getSliderYellowLeft, { target: { value: 98 } });
  });

  expect(getSliderYellowLeft).toBeInTheDocument();

  const getSliderYellowRed = screen.getByTestId("input-slider-red-right");
  act(() => {
    fireEvent.blur(getSliderYellowRed, { target: { value: 96 } });
  });

  expect(getSliderYellowRed).toBeInTheDocument();
});


//Change values automaticly if red bellow read and Yellow
test("Ranges automatic change red", async () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));

  let getByTestId;
  await act(async () => {
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
  const getSliderGreen = screen.getByTestId("input-slider-greenSlider");
  act(() => {
    fireEvent.blur(getSliderGreen, { target: { value: 4} });
  });
  expect(getSliderGreen).toBeInTheDocument();

  const getSliderYellowRight = screen.getByTestId("input-slider-yellow-left");
  act(() => {
    fireEvent.blur(getSliderYellowRight, { target: { value: 97 } });
  });

  expect(getSliderYellowRight).toBeInTheDocument();

  const getSliderYellowLeft = screen.getByTestId("input-slider-yellow-right");
  act(() => {
    fireEvent.blur(getSliderYellowLeft, { target: { value: 98 } });
  });

  expect(getSliderYellowLeft).toBeInTheDocument();

  const getSliderYellowRed = screen.getByTestId("input-slider-red-right");
  act(() => {
    fireEvent.blur(getSliderYellowRed, { target: { value: 96 } });
  });

  expect(getSliderYellowRed).toBeInTheDocument();
});


//Change values automaticly if red above all
test("Ranges automatic change red if value above all", async () => {
  getAllRanges.mockImplementation(() => Promise.resolve(range));

  let getByTestId;
  await act(async () => {
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
  const getSliderGreen = screen.getByTestId("input-slider-greenSlider");
  act(() => {
    fireEvent.blur(getSliderGreen, { target: { value: 91} });
  });
  expect(getSliderGreen).toBeInTheDocument();

  const getSliderYellowRight = screen.getByTestId("input-slider-yellow-left");
  act(() => {
    fireEvent.blur(getSliderYellowRight, { target: { value: 89 } });
  });

  expect(getSliderYellowRight).toBeInTheDocument();

  const getSliderYellowLeft = screen.getByTestId("input-slider-yellow-right");
  act(() => {
    fireEvent.blur(getSliderYellowLeft, { target: { value: 90 } });
  });

  expect(getSliderYellowLeft).toBeInTheDocument();

  const getSliderYellowRed = screen.getByTestId("input-slider-red-right");
  act(() => {
    fireEvent.blur(getSliderYellowRed, { target: { value: 96 } });
  });

  expect(getSliderYellowRed).toBeInTheDocument();
});