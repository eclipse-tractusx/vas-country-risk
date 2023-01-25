import { render, act, fireEvent, screen } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import DashBoardTable from "../../../components/dashboard/DashBoardTable/DashboardTable";
import { CountryProvider } from "../../../contexts/country";
import { getAll } from "../../../components/services/dashboard-api";
import { RatesProvider } from "../../../contexts/rates";
import { RangesProvider } from "../../../contexts/ranges";
import { CompanyUserProvider } from "../../../contexts/companyuser";
import React from "react";
import DashboardTable from "../../../components/dashboard/DashBoardTable/DashboardTable";

const tableinfoData = [
  {
    id: 0,
    bpn: "BPN-NUMBER-TEST",
    legalName: "Divape Company",
    address: "15874 Sutteridge Trail",
    city: "Covilhã",
    country: "Portugal",
    score: 90,
    rating: "Fake Rating",
    longitude: "107.6185727",
    latitude: "-6.6889038",
  },
  {
    id: 1,
    bpn: "BPN-NUMBER",
    legalName: "Divape Company",
    address: "15874 Sutteridge Trail",
    city: "Covilhã",
    country: "Portugal",
    score: 10,
    rating: "Fake Rating",
    longitude: "107.6185727",
    latitude: "-6.6889038",
  },
  {
    id: 2,
    bpn: "BPN-NUMBER",
    legalName: "Divape Company",
    address: "15874 Sutteridge Trail",
    city: "Covilhã",
    country: "Portugal",
    score: 39,
    rating: "Fake Rating",
    longitude: "107.6185727",
    latitude: "-6.6889038",
  },
  {
    id: 3,
    bpn: "BPN-NUMBER",
    legalName: "Divape Company",
    address: "15874 Sutteridge Trail",
    city: "Covilhã",
    country: "Portugal",
    score: 41,
    rating: "",
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
              <div className="table-content">
                <DashboardTable
                  getRatings={[]}
                  years={2023}
                  weight={-1}
                ></DashboardTable>
              </div>
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

test("Renders Dashboard Detail Function", async () => {
  getAll.mockImplementation(() => Promise.resolve(tableinfoData));
  await act(async () => {
    render(
      <RangesProvider>
        <CountryProvider>
          <CompanyUserProvider>
            <RatesProvider>
              <DashBoardTable getRatings={[]} years={2023} weight={-1} />
            </RatesProvider>
          </CompanyUserProvider>
        </CountryProvider>
      </RangesProvider>
    );
  });

  const row1 = screen.getAllByTitle("Detail", undefined, 30000);

  await act(async () => {
    fireEvent.click(row1[0]);
  });

  expect(row1[0]).toBeInTheDocument();

  const detailClose = screen.getByTestId("CloseIcon", undefined, 30000);

  await act(async () => {
    fireEvent.click(detailClose);
  });

  expect(detailClose).toBeInTheDocument();
});
