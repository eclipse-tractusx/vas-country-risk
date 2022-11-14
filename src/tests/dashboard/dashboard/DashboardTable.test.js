import { render, act } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import DashBoardTable from "../../../components/dashboard/DashBoardTable/DashboardTable";
import { CountryProvider } from "../../../contexts/country";
import { getAll, getWorldMapInfo } from "../../../components/services/dashboard-api";
import { RatesProvider } from "../../../contexts/rates";
import { RangesProvider } from "../../../contexts/ranges";

const getWorldMapData = [
    {
        country: {
            id: 0,
            country: "Germany",
            iso3: "DEU",
            iso2: "DE",
            continent: "Europe",
            latitude: "-2.9814344",
            longitude: "23.8222636",
            totalBpn: 11
        },
        score: 90
    },
];

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
        latitude: "-6.6889038"
      },
];

jest.mock("../../../components/services/dashboard-api", () => ({
    getWorldMapInfo: jest.fn(() => getWorldMapData),
    getAll: jest.fn(() => tableinfoData),
}));

test("Renders Dashboard Table", async () => {
    getAll.mockImplementation(() => Promise.resolve(tableinfoData));
    getWorldMapInfo.mockImplementation(() => Promise.resolve(getWorldMapData));
    const customerUser = { name: "test" };
    await act(async () => {
        (render(
            <RangesProvider>
                <CountryProvider>
                    <RatesProvider>
                        <DashBoardTable />
                    </RatesProvider>
                </CountryProvider>
            </RangesProvider>
        ));
    });
});