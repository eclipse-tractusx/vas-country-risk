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
import { render, act, fireEvent, screen } from "@testing-library/react";
import { test } from "@jest/globals";
import '@testing-library/jest-dom';
import RightMap from "../../../components/dashboard/RightMap/RightMap";
import {
  getCountrys,
  getCountryByUser,
} from "../../../components/services/country-api";
import {
  getWorldMapInfo,
  getAll,
} from "../../../components/services/dashboard-api";
import { getBpns } from "../../../components/services/bpns-api";
import { toPng } from "html-to-image";
import { CountryProvider } from "../../../contexts/country";
import CountryPicker from "../../../components/dashboard/CountryPicker/CountryPicker";
import { ReportProvider } from "../../../contexts/reports";
import { CompanyUserProvider } from "../../../contexts/companyuser";

const getWorldMapData = [
  {
    country: {
      id: 0,
      country: "Germany",
      iso3: "DEU",
      iso2: "DE",
      continent: "Europe",
      latitude: "-2.9814344",
      longitude: "23.8222636",
      totalBpn: 11,
    },
    score: 90,
  },
];

const tableinfoData = [
  {
    id: 0,
    bpn: "BPN-NUMBER",
    legalName: "Divape Company",
    address: "15874 Sutteridge Trail",
    city: "Covilhã",
    country: "Portugal",
    score: 90,
    rating: "Fake Rating",
    longitude: "107.6185727",
    latitude: "-6.6889038",
  },
];

const countryData = [
  {
    id: 0,
    country: "Germany",
    iso3: "DEU",
    iso2: "DE",
    continent: "Europe",
    latitude: "-2.9814344",
    longitude: "23.8222636",
    totalBpn: 11,
  },
];

const bpnData = [
  {
    id: 0,
    bpn: "BPN-NUMBER",
    legalName: "Divape Company",
    address: "15874 Sutteridge Trail",
    city: "Covilhã",
    country: "Portugal",
    longitude: "107.6185727",
    latitude: "-6.6889038",
  },
];

jest.mock("../../../components/services/dashboard-api", () => ({
  getWorldMapInfo: jest.fn(() => getWorldMapData),
  getAll: jest.fn(() => tableinfoData),
}));

jest.mock("../../../components/services/country-api", () => ({
  getCountryByUser: jest.fn(() => countryData),
  getCountrys: jest.fn(() => countryData),
}));

jest.mock("../../../components/services/bpns-api", () => ({
  getBpns: jest.fn(() => bpnData),
}));

jest.mock("html-to-image", () => ({
  toPng: jest.fn().mockReturnValue([]),
}));

test("Renders Right Map", async () => {
  getAll.mockImplementation(() => Promise.resolve(tableinfoData));
  getCountryByUser.mockImplementation(() => Promise.resolve(countryData));
  getCountrys.mockImplementation(() => Promise.resolve(countryData));
  getWorldMapInfo.mockImplementation(() => Promise.resolve(getWorldMapData));
  getBpns.mockImplementation(() => Promise.resolve(bpnData));
  toPng.mockImplementation(() => Promise.resolve([]));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReportProvider>
          <CountryProvider>
            <RightMap></RightMap>
          </CountryProvider>
        </ReportProvider>
      </CompanyUserProvider>
    );
  });

  const buttonExpand = screen.getByTestId("expand-btn");
  expect(buttonExpand).toBeInTheDocument();
  fireEvent.click(buttonExpand);

  const buttonExport = screen.getByText("Export Image");
  expect(buttonExport).toBeInTheDocument();
  fireEvent.click(buttonExport);
});
