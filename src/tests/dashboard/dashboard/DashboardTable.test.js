import { render, act, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import DashBoardTable from "../../../components/dashboard/DashBoardTable/DashboardTable";
import { CountryProvider } from "../../../contexts/country";
import { getAll } from "../../../components/services/dashboard-api";
import { RatesProvider } from "../../../contexts/rates";
import { RangesProvider } from "../../../contexts/ranges";
import { CompanyUserProvider } from "../../../contexts/companyuser";
import React, { useState } from "react";
import UserService from "../../../components/services/UserService";
import DashboardTable from "../../../components/dashboard/DashBoardTable/DashboardTable";

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

jest.mock("../../../components/services/dashboard-api", () => ({
  getAll: jest.fn().mockReturnValue(tableinfoData),
}));

test("Renders Dashboard Table", async () => {
  getAll.mockImplementation(() => Promise.resolve(tableinfoData));

  let getByLabelText;
  let getByText;
  await act(async () => {
    ({ getByLabelText, getByText } = render(
      <RangesProvider>
        <CountryProvider>
          <CompanyUserProvider>
            <RatesProvider>
              <DashBoardTable />
            </RatesProvider>
          </CompanyUserProvider>
        </CountryProvider>
      </RangesProvider>
    ));
  });

  const row1 = getByLabelText("Select all rows");
  await act(async () => {
    fireEvent.click(row1);
  });
  expect(row1).toBeInTheDocument();

  const button = getByText("Export to csv");
  await act(async () => {
    fireEvent.click(button);
  });
  expect(button).toBeInTheDocument();
});

test("Renders Dashboard Table search Function", async () => {
  getAll.mockImplementation(() => Promise.resolve(tableinfoData));
  let getByLabelText;
  let getAllByRole;
  await act(async () => {
    ({ getAllByRole, getByLabelText } = render(
      <RangesProvider>
        <CountryProvider>
          <CompanyUserProvider>
            <RatesProvider>
              <DashBoardTable />
            </RatesProvider>
          </CompanyUserProvider>
        </CountryProvider>
      </RangesProvider>
    ));
  });

  const row1 = getByLabelText("Select all rows");

  await act(async () => {
    fireEvent.click(row1);
  });

  const buttons = getAllByRole("button");

  const button = buttons[0];

  await act(async () => {
    fireEvent.click(button);
  });

  await act(async () => {
    fireEvent.change(button, { target: { value: "Divape" } });
  });
  await act(async () => {
    fireEvent.keyDown(button, { key: "Enter", code: 13 });
  });
});
