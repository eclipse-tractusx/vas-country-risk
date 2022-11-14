import { render, act } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import RightMap from "../../../components/dashboard/RightMap/RightMap";
import { CountryProvider } from "../../../contexts/country";
import { ReportProvider } from "../../../contexts/reports";
import { getCountrys, getCountryByUser } from "../../../components/services/country-api";
import { getAll } from "../../../components/services/dashboard-api";

const country = [
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

const getAllData = [
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

jest.mock("../../../components/services/country-api", () => ({
    getCountrys: jest.fn(() => country),
    getCountryByUser: jest.fn(() => country),
}));

jest.mock("../../../components/services/dashboard-api", () => ({
    getAll: jest.fn(() => getAllData),
}));



test("Renders Right Map", async () => {
    getCountrys.mockImplementation(() => Promise.resolve(country));
    getCountryByUser.mockImplementation(() => Promise.resolve(country));
    getAll.mockImplementation(() => Promise.resolve(getAllData));
    let getByTestId;
    const customerUser = { name: "test" };
    await act(async () => {
        ({ getByTestId } = render(
            <ReportProvider>
                <CountryProvider>
                    <RightMap />
                </CountryProvider>
            </ReportProvider>
        ));
    });
    expect(getByTestId("expand-btn")).toBeInTheDocument();
    await userEvent.click(getByTestId("expand-btn"));
});