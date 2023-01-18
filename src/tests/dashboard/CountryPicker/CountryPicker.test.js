import { render, act, fireEvent, screen } from "@testing-library/react";
import CountryPicker from "../../../components/dashboard/CountryPicker/CountryPicker";
import { test } from "@jest/globals";
import { CountryProvider } from "../../../contexts/country";

import { getCountryByUser } from "../../../components/services/country-api";

import React from "react";
import renderer from "react-test-renderer";

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
}));

test("CountryPicker snapshot test", () => {
  const component = renderer.create(<CountryPicker />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("handleChange updates countryS context correctly", async () => {
  getCountryByUser.mockImplementation(() => Promise.resolve(countryData));

  await act(async () => {
    ({} = render(
      <CountryProvider>
        <CountryPicker />
      </CountryProvider>
    ));
  });
  const autocomplete = screen.getByLabelText("Select a country");

  act(() => {
    fireEvent.change(autocomplete, { target: { value: "Germany" } });
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: "Enter" });
  });
});

test("handleChange updates countryS context with null", async () => {
  getCountryByUser.mockImplementation(() => Promise.resolve(countryData));

  await act(async () => {
    ({} = render(
      <CountryProvider>
        <CountryPicker />
      </CountryProvider>
    ));
  });
  const autocomplete = screen.getByLabelText("Select a country");
  const clearBox = screen.getByTitle("Clear");
  act(() => {
    fireEvent.change(autocomplete, { target: { value: "Germany" } });
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: "Enter" });
    fireEvent.click(clearBox);
  });
});
