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
    render(
      <CountryProvider>
        <CountryPicker />
      </CountryProvider>
    );
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
    render(
      <CountryProvider>
        <CountryPicker />
      </CountryProvider>
    );
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
