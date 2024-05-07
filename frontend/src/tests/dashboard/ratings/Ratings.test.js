/********************************************************************************
* Copyright (c) 2022,2024 BMW Group AG
* Copyright (c) 2022,2024 Contributors to the Eclipse Foundation
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
import { render, act, fireEvent, screen } from "@testing-library/react";
import { test } from "@jest/globals";
import '@testing-library/jest-dom';
import Ratings from "../../../components/dashboard/Ratings/Ratings";
import { RatesProvider } from "../../../contexts/rates";
import { ReportProvider } from "../../../contexts/reports";
import { getRatingsByYear } from "../../../components/services/ratingstable-api";
import { CompanyUserProvider } from "../../../contexts/companyuser";
import { deleteRating } from "../../../components/services/ratingstable-api";
import { ReloadProvider } from "../../../contexts/refresh";

const ratingsData = [
  {
    id: 1,
    dataSourceName: "CPI Rating 2021",
    type: "Global",
    yearPublished: 2021,
    fileName: null,
    companyUser: null,
  },
];

const passValuesFromComponent = (rates) => {
  return ratingsData;
};

const passAutomaticWeightChange = (weight) => {
  return 1;
};

const response = {
  status: 204,
  name: "AxiosError",
  data: {
    status: 401,
  },
};

jest.mock("../../../components/services/ratingstable-api", () => ({
  getRatingsByYear: jest.fn().mockReturnValue(ratingsData),
  deleteRating: jest.fn().mockReturnValue(response),
}));

test("Renders Ratings", async () => {
  getRatingsByYear.mockImplementation(() => Promise.resolve(ratingsData));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReportProvider>
          <RatesProvider>
            <Ratings
              passValuesFromComponent={passValuesFromComponent}
              passAutomaticWeightChange={passAutomaticWeightChange}
              years={2021}
            ></Ratings>
          </RatesProvider>
        </ReportProvider>
      </CompanyUserProvider>
    );
  });

  //Select all Ratings
  const ratingsTable = screen.getByLabelText("Select all rows");
  await act(async () => {
    fireEvent.click(ratingsTable);
  });
  expect(ratingsTable).toBeInTheDocument();

  //Open Dialog
  const btndialog = screen.getByText("Show More Ratings");
  await act(async () => {
    fireEvent.click(btndialog);
  });

  //Close Dialog
  const closebtn = screen.getByTestId("closeDialog");
  await act(async () => {
    fireEvent.click(closebtn);
  });
  expect(closebtn).toBeInTheDocument();
});

test("Renders Delete and close dialog", async () => {
  getRatingsByYear.mockImplementation(() => Promise.resolve(ratingsData));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReportProvider>
          <RatesProvider>
            <Ratings
              passValuesFromComponent={passValuesFromComponent}
              passAutomaticWeightChange={passAutomaticWeightChange}
              years={2021}
            ></Ratings>
          </RatesProvider>
        </ReportProvider>
      </CompanyUserProvider>
    );
  });

  //Select all Ratings
  const ratingsTable = screen.getByLabelText("Select all rows");
  await act(async () => {
    fireEvent.click(ratingsTable);
  });
  expect(ratingsTable).toBeInTheDocument();

  const deleteItem = screen.getByTestId("deleteRatingIcon");
  await act(async () => {
    fireEvent.click(deleteItem);
  });

  const closeBtn = screen.getByTestId("btnNoRating");
  await act(async () => {
    fireEvent.click(closeBtn);
  });
});

test("Renders Delete and Deletes Rating", async () => {
  getRatingsByYear.mockImplementation(() => Promise.resolve(ratingsData));
  deleteRating.mockImplementation(() => Promise.resolve(response));

  await act(async () => {
    render(
      <ReloadProvider>
        <CompanyUserProvider>
          <ReportProvider>
            <RatesProvider>
              <Ratings
                passValuesFromComponent={passValuesFromComponent}
                passAutomaticWeightChange={passAutomaticWeightChange}
                years={2021}
              ></Ratings>
            </RatesProvider>
          </ReportProvider>
        </CompanyUserProvider>
      </ReloadProvider>
    );
  });

  const deleteItem = screen.getByTestId("deleteRatingIcon");
  await act(async () => {
    fireEvent.click(deleteItem);
  });

  const clickYes = screen.getByTestId("btnYesRating");
  await act(async () => {
    fireEvent.click(clickYes);
  });

  const closeAlert = screen.getByTestId("CloseIcon");
  await act(async () => {
    fireEvent.click(closeAlert);
  });
});

test("Input Weight in rating", async () => {
  getRatingsByYear.mockImplementation(() => Promise.resolve(ratingsData));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReportProvider>
          <RatesProvider>
            <Ratings
              passValuesFromComponent={passValuesFromComponent}
              passAutomaticWeightChange={passAutomaticWeightChange}
              years={2021}
            ></Ratings>
          </RatesProvider>
        </ReportProvider>
      </CompanyUserProvider>
    );
  });

  const ratingsTable = screen.getByLabelText("Select all rows");
  await act(async () => {
    fireEvent.click(ratingsTable);
  });

  const inputWeight = screen.getAllByRole("cell");
  await act(async () => {
    fireEvent.doubleClick(inputWeight[2]);
    //fireEvent.keyDown(inputWeight[2], { key: "9" });
    fireEvent.keyDown(inputWeight[2], { key: "Enter" });
  });
});
