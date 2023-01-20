import { render, act, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import Ratings from "../../../components/dashboard/Ratings/Ratings";
import { RatesProvider } from "../../../contexts/rates";
import { ReportProvider } from "../../../contexts/reports";
import { getRatingsByYear } from "../../../components/services/ratingstable-api";
import { CompanyUserProvider } from "../../../contexts/companyuser";
import renderer from "react-test-renderer";
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

  let getByText;
  let getByLabelText;
  await act(async () => {
    ({ getByLabelText, getByText } = render(
      <CompanyUserProvider>
        <ReportProvider>
          <RatesProvider>
            <Ratings
              passValuesFromComponent={passValuesFromComponent}
              passAutomaticWeightChange={passAutomaticWeightChange}
              years={2021}
            ></Ratings>
          </RatesProvider>
        </ReportProvider>
      </CompanyUserProvider>
    ));
  });

  const ratingsTable = getByLabelText("Select all rows");
  await act(async () => {
    fireEvent.click(ratingsTable);
  });
  expect(ratingsTable).toBeInTheDocument();

  //Open Dialog
  const btndialog = getByText("Show More Ratings");
  await act(async () => {
    fireEvent.click(btndialog);
  });
  //expect(btndialog).toBeInTheDocument();

  //Close Dialog
  const closebtn = getByText("Close");
  await act(async () => {
    fireEvent.click(closebtn);
  });
  //expect(btndialog).toBeInTheDocument();
});
