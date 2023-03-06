/********************************************************************************
* Copyright (c) 2022,2023 BMW Group AG 
* Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
*
* See the NOTICE file(s) distributed with this work for additional
* information regarding copyright ownership.
*
* This program and the accompanying materials are made available under the
* terms of the Apache License, Version 2.0 which is available at
* https://www.apache.org/licenses/LICENSE-2.0.
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations
* under the License.
*
* SPDX-License-Identifier: Apache-2.0
********************************************************************************/
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


//Change values automaticly if red above all and save value on enter press
test("Ranges automatic change red if value above all and enter press", async () => {
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
    fireEvent.click(getSliderGreen);
    fireEvent.change(getSliderGreen, { target: { value: 8 } });
    fireEvent.keyDown(getSliderGreen, { key: "Enter" });
  });
  expect(getSliderGreen).toBeInTheDocument();

  const getSliderYellowRight = screen.getByTestId("input-slider-yellow-left");
  act(() => {
    fireEvent.click(getSliderYellowRight);
    fireEvent.change(getSliderYellowRight, { target: { value: 6 } });
    fireEvent.keyDown(getSliderYellowRight, { key: "Enter" });
  });

  expect(getSliderYellowRight).toBeInTheDocument();

  const getSliderYellowLeft = screen.getByTestId("input-slider-yellow-right");
  act(() => {
    fireEvent.click(getSliderYellowLeft);
    fireEvent.change(getSliderYellowLeft, { target: { value: 4 } });
    fireEvent.keyDown(getSliderYellowLeft, { key: "Enter" });
  });

  expect(getSliderYellowLeft).toBeInTheDocument();

  const getSliderYellowRed = screen.getByTestId("input-slider-red-right");
  act(() => {
    fireEvent.click(getSliderYellowRed);
    fireEvent.change(getSliderYellowRed, { target: { value: 2 } });
    fireEvent.keyDown(getSliderYellowRed, { key: "Enter" });
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