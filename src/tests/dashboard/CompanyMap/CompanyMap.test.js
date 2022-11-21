import { render, act, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { RangesProvider } from "../../../contexts/ranges";

import { CompanyUserProvider } from "../../../contexts/companyuser";
import React from "react";
import { getAll } from "../../../components/services/dashboard-api";
import { getCountrys } from "../../../components/services/country-api";
import { getBpns } from "../../../components/services/bpns-api";
import CustomCompanyMap from "../../../components/dashboard/CustomCompanyMap/CustomCompanyMap";
import { CountryProvider } from "../../../contexts/country";
import { ReportProvider } from "../../../contexts/reports";
import { getCountryByUser } from "../../../components/services/country-api";
import CountryPicker from "../../../components/dashboard/CountryPicker/CountryPicker";

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

jest.mock("../../../components/services/dashboard-api", () => ({
  getAll: jest.fn().mockReturnValue(tableinfoData),
}));

jest.mock("../../../components/services/country-api", () => ({
  getCountryByUser: jest.fn().mockReturnValue(countryData),
  getCountrys: jest.fn().mockReturnValue(countryData),
}));

test("Company Map Test", async () => {
  getAll.mockImplementation(() => Promise.resolve(tableinfoData));
  getCountryByUser.mockImplementation(() => Promise.resolve(countryData));
  getCountrys.mockImplementation(() => Promise.resolve(countryData));

  const getContainer = () =>
    render(
      <CompanyUserProvider>
        <CountryProvider>
          <ReportProvider>
            <RangesProvider>
              <CustomCompanyMap
                getRatings={[]}
                years={2021}
                weight={1}
                minMapWidth={0}
                maxMapWidth={800}
                minMapHeight={0}
                maxMapHeight={600}
              />
            </RangesProvider>
          </ReportProvider>
        </CountryProvider>
      </CompanyUserProvider>
    );

  const mouseOver = await getContainer().getByTestId("geo-custom-company-map");
  fireEvent.click(mouseOver);

  expect(mouseOver).toBeInTheDocument();
});
