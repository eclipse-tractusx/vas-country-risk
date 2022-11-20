import { render, act, fireEvent, screen } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import App from "../../../App";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  SharedThemeProvider,
  SharedCssBaseline,
} from "cx-portal-shared-components";
import { getRatingsByYear } from "../../../components/services/ratingstable-api";
import {
  getCountryByUser,
  getCountrys,
} from "../../../components/services/country-api";
import {
  getAll,
  getWorldMapInfo,
} from "../../../components/services/dashboard-api";
import { getBpns } from "../../../components/services/bpns-api";
import { getAllDates } from "../../../components/services/dateform-api";
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

const tableinfoData = [
  {
    id: 0,
    bpn: "BPN-NUMBER",
    legalName: "Divape Company",
    address: "15874 Sutteridge Trail",
    city: "Covilhã",
    country: "Germany",
    score: 90,
    rating: "Fake Rating",
    longitude: "107.6185727",
    latitude: "-6.6889038",
  },
];

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
      country: "Germany",
      iso3: "DEU",
      iso2: "DE",
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
      country: "Qatar",
      iso3: "QAT",
      iso2: "QA",
      continent: "World",
      latitude: null,
      longitude: null,
      totalBpn: null,
    },
    score: -1,
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
  getAll: jest.fn().mockReturnValue(tableinfoData),
  getWorldMapInfo: jest.fn().mockReturnValue(worldMapInfo),
}));

jest.mock("../../../components/services/country-api", () => ({
  getCountryByUser: jest.fn().mockReturnValue(countryData),
  getCountrys: jest.fn().mockReturnValue(countryData),
}));

jest.mock("../../../components/services/ratingstable-api", () => ({
  getRatingsByYear: jest.fn().mockReturnValue(ratingsData),
}));

jest.mock("../../../components/services/bpns-api", () => ({
  getBpns: jest.fn().mockReturnValue(bpns),
}));

jest.mock("../../../components/services/dateform-api", () => ({
  getAllDates: jest.fn().mockReturnValue([2021, 2020]),
}));

test("Renders index.js", async () => {
  getCountryByUser.mockImplementation(() => Promise.resolve(countryData));
  getCountrys.mockImplementation(() => Promise.resolve(countryData));
  getRatingsByYear.mockImplementation(() => Promise.resolve(ratingsData));
  getAll.mockImplementation(() => Promise.resolve(tableinfoData));
  getWorldMapInfo.mockImplementation(() => Promise.resolve(worldMapInfo));
  getBpns.mockImplementation(() => Promise.resolve(bpns));
  getCountrys.mockImplementation(() => Promise.resolve(worldMapInfo));
  getAllDates.mockImplementation(() => Promise.resolve([2021, 2020]));
  let getByRole;
  let getByTestId;
  let getByLabelText;
  await act(async () => {
    ({ getByRole, getByTestId, getByLabelText } = render(
      <React.StrictMode>
        <SharedCssBaseline />
        <SharedThemeProvider>
          <App />
        </SharedThemeProvider>
      </React.StrictMode>
    ));
  });

  const getCountryDropDown = screen.queryByRole("combobox");
  const ratingsTable = screen.queryAllByLabelText("Select all rows");

  act(() => {
    fireEvent.click(getCountryDropDown);
    fireEvent.change(getCountryDropDown, { target: { value: null } });
    fireEvent.keyDown(getCountryDropDown, { key: "ArrowDown" });
    fireEvent.keyDown(getCountryDropDown, { key: "Enter" });
  });

  // expect(getCountryDropDown).toBeInTheDocument();

  await act(async () => {
    ratingsTable.forEach((element) => {
      fireEvent.click(element);
    });
  });
  //expect(ratingsTable).toBeInTheDocument();
});
