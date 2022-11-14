import { render, act } from "@testing-library/react";
import CountryPicker from "../../../components/dashboard/CountryPicker/CountryPicker";
import { test } from "@jest/globals";
import { CountryProvider } from "../../../contexts/country";
import { getCountryByUser, getCountrys } from "../../../components/services/country-api";

const countryData = [
  {
    id: 0,
    country: "Germany",
    iso3: "DEU",
    iso2: "DE",
    continent: "Europe",
    latitude: "-2.9814344",
    longitude: "23.8222636",
    totalBpn: 11
  },
];

jest.mock("../../../components/services/country-api", () => ({
  getCountryByUser: jest.fn(() => countryData),
  getCountrys: jest.fn(() => countryData),
}));

test("CountryPicker Test", async () => {
  getCountryByUser.mockImplementation(() => Promise.resolve(countryData));
  getCountrys.mockImplementation(() => Promise.resolve(countryData));
  const customerUser = { name: "test" };
  console.log(customerUser);
  await act(async () => {
    ( render(
      <CountryProvider>
        <CountryPicker />
      </CountryProvider>
    ));
  });
});
