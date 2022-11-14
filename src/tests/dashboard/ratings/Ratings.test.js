import { render, act } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import Ratings from "../../../components/dashboard/Ratings/Ratings";
import { RatesProvider } from "../../../contexts/rates";
import { ReportProvider } from "../../../contexts/reports";
import { getRatingsByYear } from "../../../components/services/ratingstable-api";

const ratingsData = [
    {
      id: 0,
      dataSourceName: "Fake Rating",
      type: "Custom",
      yearPublished: 2021,
      fileName: "Test Company Rating",
      companyUser: {
        id: 0,
        name: "John",
        email: "John@email.com",
        company: "TestCompany"
      },
    },
  ];

jest.mock("../../../components/services/ratingstable-api", () => ({
    getRatingsByYear: jest.fn(() => ratingsData),
}));

const mockpassValuesFromComponent = jest.fn();
const mockpassAutomaticWeightChange = jest.fn();

test("Renders Ratings", async () => {
    getRatingsByYear.mockImplementation(() => Promise.resolve(ratingsData));
    let getByText;
    const customerUser = { name: "test" };
    await act(async () => {
        (getByText = render(
            <ReportProvider>
                <RatesProvider>
                    <Ratings passValuesFromComponent={mockpassValuesFromComponent} 
                    passAutomaticWeightChange={mockpassAutomaticWeightChange}/>
                </RatesProvider>
            </ReportProvider>
        ));
    });
});