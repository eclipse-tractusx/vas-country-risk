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
import { CompanyUserProvider } from "../../../contexts/companyuser";
import React from "react";
import { getWorldMapInfo } from "../../../components/services/dashboard-api";
import { getCountrys } from "../../../components/services/country-api";
import { getBpns } from "../../../components/services/bpns-api";
import CustomWorldMap from "../../../components/dashboard/CustomWorld/CustomWorldMap";

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
const bpns = [
  {
    id: null,
    bpn: "Oozz",
    legalName: "Omba",
    address: "239 Goodland Place",
    city: "Łapsze Niżne",
    country: "Qatar",
    longitude: "-8.335096",
    latitude: "41.4009304",
  },
  {
    id: null,
    bpn: "Quatz",
    legalName: "Eire",
    address: "71 Bunting Hill",
    city: "Raposeira",
    country: "Portugal",
    longitude: "-8.335096",
    latitude: "41.4009304",
  },
  {
    id: null,
    bpn: "Twitterbeat",
    legalName: "Fiveclub",
    address: "1412 Algoma Center",
    city: "Hangchuan",
    country: "China",
    longitude: "125.323544",
    latitude: "43.817071",
  },
];

jest.mock("../../../components/services/dashboard-api", () => ({
  getWorldMapInfo: jest.fn().mockReturnValue(worldMapInfo),
}));
jest.mock("../../../components/services/bpns-api", () => ({
  getBpns: jest.fn().mockReturnValue(bpns),
}));
jest.mock("../../../components/services/country-api", () => ({
  getCountrys: jest.fn().mockReturnValue(worldMapInfo),
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

test("Custom World Map Test", async () => {
  getWorldMapInfo.mockImplementation(() => Promise.resolve(worldMapInfo));
  getBpns.mockImplementation(() => Promise.resolve(bpns));
  getCountrys.mockImplementation(() => Promise.resolve(worldMapInfo));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <RangesProvider>
          <CustomWorldMap ratings={mockRatings} />
        </RangesProvider>
      </CompanyUserProvider>
    );
  });

  const zoomableGroup = screen.getByTestId("geo");
  zoomableGroup.setAttribute(
    "transform",
    "translate(-2691.6091382329055 -1092.06218050271) scale(11.999999999999999)"
  );

  fireEvent.mouseEnter(zoomableGroup);

  fireEvent.mouseOver(zoomableGroup);

  waitFor(() => screen.getByTestId("geo"));

  act(() => {
    fireEvent.mouseEnter(zoomableGroup);
    fireEvent.click(zoomableGroup);
  });
  expect(zoomableGroup).toBeInTheDocument();
});

test("Custom World Map Test Pick Prt", async () => {
  getWorldMapInfo.mockImplementation(() => Promise.resolve(worldMapInfo));
  getBpns.mockImplementation(() => Promise.resolve(bpns));
  getCountrys.mockImplementation(() => Promise.resolve(worldMapInfo));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <RangesProvider>
          <CustomWorldMap ratings={mockRatings} />
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
