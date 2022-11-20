import { render, act, fireEvent, screen } from "@testing-library/react";
import CountryPicker from "../../../components/dashboard/CountryPicker/CountryPicker";
import { test } from "@jest/globals";
import { CountryProvider } from "../../../contexts/country";
import {
  getCountryByUser,
  getCountrys,
} from "../../../components/services/country-api";

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

jest.mock("../../../components/services/country-api", () => ({
  getCountryByUser: jest.fn().mockReturnValue(countryData),
  getCountrys: jest.fn().mockReturnValue(countryData),
}));

test("CountryPicker Test", () => {
  getCountryByUser.mockImplementation(() => Promise.resolve(countryData));
  getCountrys.mockImplementation(() => Promise.resolve(countryData));

  const getContainer = () =>
    render(
      <CountryProvider>
        <CountryPicker />
      </CountryProvider>
    );

  const getCountryDropDown = getContainer().getByRole("combobox");
  act(() => {
    fireEvent.click(getCountryDropDown);
    fireEvent.change(getCountryDropDown, { target: { value: "Germany" } });
    fireEvent.keyDown(getCountryDropDown, { key: "ArrowDown" });
    fireEvent.keyDown(getCountryDropDown, { key: "Enter" });
  });
});

test("CountryPicker Test no Value", () => {
  getCountryByUser.mockImplementation(() => Promise.resolve(countryData));
  getCountrys.mockImplementation(() => Promise.resolve(countryData));

  const getContainer = () =>
    render(
      <CountryProvider>
        <CountryPicker />
      </CountryProvider>
    );

  const getCountryDropDown = getContainer().getByRole("combobox");
  act(() => {
    fireEvent.click(getCountryDropDown);
    fireEvent.change(getCountryDropDown, { target: { value: null } });
    fireEvent.keyDown(getCountryDropDown, { key: "ArrowDown" });
    fireEvent.keyDown(getCountryDropDown, { key: "Enter" });
  });
});
