import { render, act, fireEvent, waitFor } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import Ratings from "../../../components/dashboard/Ratings/Ratings";
import { RatesProvider } from "../../../contexts/rates";
import { ReportProvider } from "../../../contexts/reports";
import { getRatingsByYear } from "../../../components/services/ratingstable-api";
import { CompanyUserProvider } from "../../../contexts/companyuser";
import { deleteRating } from "../../../components/services/ratingstable-api";
import renderer from "react-test-renderer";
import { getByTestId, screen } from "@testing-library/dom";
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

const NoErrorStatus = {
  status: 204,
};

jest.mock("../../../components/services/ratingstable-api", () => {
  return {
    __esModule: true,
    getRatingsByYear: jest.fn().mockReturnValue(ratingsData),
    deleteRating: jest.fn().mockReturnValue(NoErrorStatus),
  };
});

test("Renders Ratings", async () => {
  getRatingsByYear.mockImplementation(() => Promise.resolve(ratingsData));
  deleteRating.mockImplementation(() => Promise.resolve(NoErrorStatus));

  let getByText;
  let getByRole;
  let getByLabelText;
  let getByTestId;
  await act(async () => {
    ({ getByLabelText, getByText, getByRole, getByTestId } = render(
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

  //Select all Ratings
  const ratingsTable = getByLabelText("Select all rows");
  await act(async () => {
    fireEvent.click(ratingsTable);
  });
  expect(ratingsTable).toBeInTheDocument();

  //Open Dialog
  await waitFor(() => {
    const btndialog = getByText("Show More Ratings");
    expect(btndialog).toBeInTheDocument();
    fireEvent.click(btndialog);
  });

  //Close Dialog
  const closebtn = getByText("Close");
  await act(async () => {
    fireEvent.click(closebtn);
  });
  expect(closebtn).toBeInTheDocument();
});
