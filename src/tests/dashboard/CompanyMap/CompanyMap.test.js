import {
  render,
  rerender,
  act,
  fireEvent,
  screen,
} from "@testing-library/react";
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
    country: "Brazil",
    score: 90,
    rating: "Fake Rating",
    latitude: "-10.3333333",
    longitude: "-53.2",
  },
];

const countryData = [
  {
    id: 32,
    country: "Brazil",
    iso3: "BRA",
    iso2: "BR",
    continent: "WORLD",
    latitude: "-10.3333333",
    longitude: "-53.2",
    totalBpn: null,
  },
];

jest.mock("../../../components/services/dashboard-api", () => ({
  getAll: jest.fn().mockReturnValue(tableinfoData),
}));

jest.mock("../../../components/services/country-api", () => ({
  getCountryByUser: jest.fn().mockReturnValue(countryData),
  getCountrys: jest.fn().mockReturnValue(countryData),
}));

jest.mock("react-simple-maps", () => ({
  ...jest.requireActual("react-simple-maps"),
  ZoomableGroup: ({ children }) => <>{children}</>,
}));

test("Company Map Test", async () => {
  getAll.mockImplementation(() => Promise.resolve(tableinfoData));
  getCountryByUser.mockImplementation(() => Promise.resolve(countryData));
  getCountrys.mockImplementation(() => Promise.resolve(countryData));

  let getByTestId;
  let getAllByRole;
  await act(async () => {
    ({ getByTestId, getAllByRole } = render(
      <CompanyUserProvider>
        <CountryProvider>
          <ReportProvider>
            <RangesProvider>
              <CountryPicker />
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
    ));
  });

  const getRoles = screen.getAllByRole("combobox");
  const getCountryDropDown = getRoles[0];

  fireEvent.click(getCountryDropDown);
  fireEvent.change(getCountryDropDown, {
    target: {
      value: "Brazil",
    },
  });
  fireEvent.keyDown(getCountryDropDown, { key: "ArrowDown" });
  fireEvent.keyDown(getCountryDropDown, { key: "Enter" });

  const geo = screen.getByTestId("geo-custom-company-map");
  const composable = screen.getByTestId("composable-custom-company-map");

  const childs = geo.childNodes;
  const mEvent = {
    target: {
      deltaY: -125,
      screenX: 816,
      screenY: 339,
      clientX: 816,
      clientY: 236,
      deltaX: -0,
      deltaZ: 0,
      wheelDelta: -150,
      wheelDeltaY: -150,
    },
  };
  childs.forEach((element) => {
    fireEvent.click(element);
    fireEvent.mouseOver(element, mEvent);
    fireEvent.mouseMove(element, mEvent);
    fireEvent.wheel(element, mEvent);
    fireEvent.scroll(element, mEvent);
  });

  fireEvent.mouseOver(geo);
  fireEvent.mouseOver(composable);

  fireEvent.mouseMove(geo, mEvent);
  fireEvent.mouseMove(composable, mEvent);

  fireEvent.scroll(composable, mEvent);
  fireEvent.scroll(geo, mEvent);
});
