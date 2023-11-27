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
import {
  render,
  act,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react";
import { test } from "@jest/globals";
import '@testing-library/jest-dom';
import { RangesProvider } from "../../../contexts/ranges";
import { ReportProvider } from "../../../contexts/reports";
import { CompanyUserProvider } from "../../../contexts/companyuser";
import React from "react";
import {
  getWorldMapInfo,
  getAll,
} from "../../../components/services/dashboard-api";
import { CountryProvider } from "../../../contexts/country";
import {
  getCountrys,
  getCountryByUser,
} from "../../../components/services/country-api";
import CustomCompanyMap from "../../../components/dashboard/CustomCompanyMap/CustomCompanyMap";
import { ZoomableGroup } from "react-simple-maps";

const worldMapInfo = [
  {
    country: {
      id: null,
      country: "Afghanistan",
      iso3: "AFG",
      iso2: "AF",
      continent: "World",
      latitude: null,
      longitude: null,
      totalBpn: null,
    },
    score: 16.0,
  },
  {
    country: {
      id: null,
      country: "Albania",
      iso3: "ALB",
      iso2: "AL",
      continent: "World",
      latitude: null,
      longitude: null,
      totalBpn: null,
    },
    score: 39.0,
  },
  {
    country: {
      id: null,
      country: "Portugal",
      iso3: "PRT",
      iso2: "PT",
      continent: "World",
      latitude: null,
      longitude: null,
      totalBpn: null,
    },
    score: 62.0,
  },
  {
    country: {
      id: null,
      country: "Denmark",
      iso3: "DNK",
      iso2: "DK",
      continent: "World",
      latitude: null,
      longitude: null,
      totalBpn: null,
    },
    score: 0,
  },
];

const getAllData = [
  {
    id: 1,
    bpn: "67-188-3753",
    legalName: "Hane-VonRueden",
    street: "Morrow",
    houseNumber: "830",
    zipCode: "62200",
    city: "Niutang",
    country: "China",
    score: 0.0,
    rating: "",
    longitude: "119.900272",
    latitude: "31.731975",
  },
  {
    id: 2,
    bpn: "20-182-5867",
    legalName: "Williamson LLC",
    street: "1st",
    houseNumber: "43",
    zipCode: "633104",
    city: "Ob’",
    country: "Russia",
    score: 0.0,
    rating: "",
    longitude: "82.6615789",
    latitude: "55.0214573",
  },
];

const CountryByBPN = [
  {
    id: 11,
    country: "Argentina",
    iso3: "ARG",
    iso2: "AR",
    continent: "WORLD",
    latitude: "-34.9964963",
    longitude: "-64.9672817",
    totalBpn: null,
  },
  {
    id: 16,
    country: "Azerbaijan",
    iso3: "AZE",
    iso2: "AZ",
    continent: "WORLD",
    latitude: "40.3936294",
    longitude: "47.7872508",
    totalBpn: null,
  },
  {
    id: 183,
    country: "Portugal",
    iso3: "PRT",
    iso2: "PT",
    continent: "WORLD",
    latitude: "39.6621648",
    longitude: "-8.1353519",
    totalBpn: null,
  },
];

jest.mock("../../../components/services/dashboard-api", () => ({
  getWorldMapInfo: jest.fn().mockReturnValue(worldMapInfo),
  getAll: jest.fn().mockReturnValue(getAllData),
}));
jest.mock("../../../components/services/country-api", () => ({
  getCountrys: jest.fn().mockReturnValue(CountryByBPN),
  getCountryByUser: jest.fn().mockReturnValue(CountryByBPN),
}));

jest.mock("react-simple-maps", () => ({
  ...jest.requireActual("react-simple-maps"),
  ZoomableGroup: ({ children }) => <>{children}</>,
}));

const mockRatings = {
  weight: 1,
  getRatings: "all",
  years: "all",
  minMapWidth: 0,
  minMapHeight: 0,
  maxMapWidth: 1000,
  maxMapHeight: 1000,
};

test("Custom Company Map Test", async () => {
  getWorldMapInfo.mockImplementation(() => Promise.resolve(worldMapInfo));
  getAll.mockImplementation(() => Promise.resolve(getAllData));
  getCountrys.mockImplementation(() => Promise.resolve(CountryByBPN));
  getCountryByUser.mockImplementation(() => Promise.resolve(CountryByBPN));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <RangesProvider>
          <CountryProvider>
            <ReportProvider>
              <CustomCompanyMap ratings={mockRatings} />
            </ReportProvider>
          </CountryProvider>
        </RangesProvider>
      </CompanyUserProvider>
    );
  });

  const zoomableGroup = screen.getByTestId("geo-custom-company-map");
  zoomableGroup.setAttribute(
    "transform",
    "translate(-2691.6091382329055 -1092.06218050271) scale(11.999999999999999)"
  );

  fireEvent.mouseEnter(zoomableGroup);

  fireEvent.mouseOver(zoomableGroup);

  waitFor(() => screen.getByTestId("geo-custom-company-map"));

  act(() => {
    fireEvent.mouseEnter(zoomableGroup);
    fireEvent.click(zoomableGroup);
  });
  expect(zoomableGroup).toBeInTheDocument();

  const prtCountryCode = screen.getByTestId("geo-show-marker-PRT");
  act(() => {
    fireEvent.mouseEnter(prtCountryCode);
    fireEvent.click(prtCountryCode);
  });
});

test("Custom Company Map Test with no rating selected", async () => {
  getWorldMapInfo.mockImplementation(() => Promise.resolve([]));
  getAll.mockImplementation(() => Promise.resolve(getAllData));
  getCountrys.mockImplementation(() => Promise.resolve(CountryByBPN));
  getCountryByUser.mockImplementation(() => Promise.resolve(CountryByBPN));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <RangesProvider>
          <CountryProvider>
            <ReportProvider>
              <CustomCompanyMap ratings={mockRatings} />
            </ReportProvider>
          </CountryProvider>
        </RangesProvider>
      </CompanyUserProvider>
    );
  });

  const prtCountryCode = screen.getByTestId("geo-show-marker-PRT");
  act(() => {
    fireEvent.mouseEnter(prtCountryCode);
    fireEvent.click(prtCountryCode);
  });
});

test("Custom Company Map Test with no score on rating", async () => {
  getWorldMapInfo.mockImplementation(() => Promise.resolve(worldMapInfo));
  getAll.mockImplementation(() => Promise.resolve(getAllData));
  getCountrys.mockImplementation(() => Promise.resolve(CountryByBPN));
  getCountryByUser.mockImplementation(() => Promise.resolve(CountryByBPN));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <RangesProvider>
          <CountryProvider>
            <ReportProvider>
              <CustomCompanyMap ratings={mockRatings} />
            </ReportProvider>
          </CountryProvider>
        </RangesProvider>
      </CompanyUserProvider>
    );
  });

  const prtCountryCode = screen.getByTestId("geo-show-marker-AZE");
  act(() => {
    fireEvent.mouseEnter(prtCountryCode);
    fireEvent.click(prtCountryCode);
  });
});
