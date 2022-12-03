import { render, act, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
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
const customerUser = {
  name: "Test",
  email: "test@test-cx.com",
  company: "testCompany",
};

jest.mock("../../../components/services/dashboard-api", () => ({
  getWorldMapInfo: jest.fn().mockReturnValue(worldMapInfo),
}));
jest.mock("../../../components/services/bpns-api", () => ({
  getBpns: jest.fn().mockReturnValue(bpns),
}));
jest.mock("../../../components/services/country-api", () => ({
  getCountrys: jest.fn().mockReturnValue(worldMapInfo),
}));

test("Custom World Map Test", async () => {
  getWorldMapInfo.mockImplementation(() => Promise.resolve(worldMapInfo));
  getBpns.mockImplementation(() => Promise.resolve(bpns));
  getCountrys.mockImplementation(() => Promise.resolve(worldMapInfo));

  let getByTestId;
  await act(async () => {
    ({ getByTestId } = render(
      <CompanyUserProvider>
        <RangesProvider>
          <CustomWorldMap
            getRatings={[]}
            years={2021}
            weight={1}
            minMapWidth={0}
            maxMapWidth={800}
            minMapHeight={0}
            maxMapHeight={600}
          />
        </RangesProvider>
      </CompanyUserProvider>
    ));
  });

  const mouseOver = getByTestId("geo");
  act(() => {
    fireEvent.click(mouseOver);
    fireEvent.scroll(mouseOver);
  });
  expect(mouseOver).toBeInTheDocument();
});
