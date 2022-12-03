import { render, act, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
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

  const getContainer = () =>
    render(
      <ReportProvider>
        <CountryProvider>
          <RightMap></RightMap>
        </CountryProvider>
      </ReportProvider>
    );

  const buttonExpand = getContainer().getByTestId("expand-btn");
  expect(buttonExpand).toBeInTheDocument();
  fireEvent.click(buttonExpand);

  const buttonExport = getContainer().getByText("Export Image");
  expect(buttonExport).toBeInTheDocument();
  fireEvent.click(buttonExport);
});
