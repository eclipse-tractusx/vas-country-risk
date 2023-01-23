import {
  render,
  act,
  fireEvent,
  waitFor,
  screen,
  getByTestId,
  querySelectorAll,
} from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
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

import renderer from "react-test-renderer";

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
];

jest.mock("../../../components/services/dashboard-api", () => ({
  getWorldMapInfo: jest.fn().mockReturnValue(worldMapInfo),
  getAll: jest.fn().mockReturnValue(getAllData),
}));
jest.mock("../../../components/services/country-api", () => ({
  getCountrys: jest.fn().mockReturnValue(CountryByBPN),
  getCountryByUser: jest.fn().mockReturnValue(CountryByBPN),
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

/*test("Custom Company Map snapshot test", () => {
  const component = renderer.create(
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
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});*/

test("Custom Company Map Test", async () => {
  getWorldMapInfo.mockImplementation(() => Promise.resolve(worldMapInfo));
  getAll.mockImplementation(() => Promise.resolve(getAllData));
  getCountrys.mockImplementation(() => Promise.resolve(CountryByBPN));
  getCountryByUser.mockImplementation(() => Promise.resolve(CountryByBPN));

  let getByTestId;
  await act(async () => {
    ({ getByTestId } = render(
      <CompanyUserProvider>
        <RangesProvider>
          <CountryProvider>
            <ReportProvider>
              <CustomCompanyMap ratings={mockRatings} />
            </ReportProvider>
          </CountryProvider>
        </RangesProvider>
      </CompanyUserProvider>
    ));
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
});
