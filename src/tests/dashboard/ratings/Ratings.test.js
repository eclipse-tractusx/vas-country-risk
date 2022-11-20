import { render, act, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import Ratings from "../../../components/dashboard/Ratings/Ratings";
import { RatesProvider } from "../../../contexts/rates";
import { ReportProvider } from "../../../contexts/reports";
import { getRatingsByYear } from "../../../components/services/ratingstable-api";

const ratingsData = [
  {
    id: 1,
    dataSourceName: "CPI Rating 2021",
    type: "Global",
    yearPublished: 2021,
    fileName: null,
    companyUser: null,
  },
];

const passValuesFromComponent = (rates) => {
  return ratingsData;
};

const passAutomaticWeightChange = (weight) => {
  return 1;
};

jest.mock("../../../components/services/ratingstable-api", () => ({
  getRatingsByYear: jest.fn().mockReturnValue(ratingsData),
}));

test("Renders Ratings", async () => {
  getRatingsByYear.mockImplementation(() => Promise.resolve(ratingsData));

  let getByLabelText;
  await act(async () => {
    ({ getByLabelText } = render(
      <ReportProvider>
        <RatesProvider>
          <Ratings
            passValuesFromComponent={passValuesFromComponent}
            passAutomaticWeightChange={passAutomaticWeightChange}
            years={2021}
          ></Ratings>
        </RatesProvider>
      </ReportProvider>
    ));
  });

  const ratingsTable = getByLabelText("Select all rows");
  await act(async () => {
    fireEvent.click(ratingsTable);
  });
  expect(ratingsTable).toBeInTheDocument();
});
