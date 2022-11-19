import { render, act, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { RangesProvider } from "../../../contexts/ranges";

import { CompanyUserProvider } from "../../../contexts/companyuser";
import React from "react";
import { getWorldMapInfo } from "../../../components/services/dashboard-api";
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
    score: 35.0,
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
const ranges = [
  {
    id: null,
    range: "Min",
    value: 26,
    description: "Min Range",
  },
  {
    id: null,
    range: "Between",
    value: 50,
    description: "BetWeen Range",
  },
  {
    id: null,
    range: "Max",
    value: 100,
    description: null,
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

test("Custom World Map Test", async () => {
  getWorldMapInfo.mockImplementation(() => Promise.resolve(worldMapInfo));

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
  console.log(mouseOver);
  act(() => {
    fireEvent.click(mouseOver);
    fireEvent.mouseOver(mouseOver);
    fireEvent.mouseEnter(mouseOver);
  });
  expect(mouseOver).toBeInTheDocument();
});
