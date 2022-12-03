import { render, act } from "@testing-library/react";
import { test } from "@jest/globals";
import UploadDownloadZone from "../../../components/dashboard/UploadDownloadZone/UploadDownloadZone";
import { downloadSampleCsvFile } from "../../../components/services/files-api";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../../../components/services/files-api", () => ({
  downloadSampleCsvFile: jest.fn().mockReturnValue([]),
}));

test("Download template Test", async () => {
  downloadSampleCsvFile.mockImplementation(() => Promise.resolve([]));

  const getContainer = () =>
  render(
    <UploadDownloadZone />
  );

  const uploadDialog = getContainer().getByText("Upload Rating");
  act(() => {
    fireEvent.click(uploadDialog);
  });

  //Radio Button
  const optionOnlyMe = getContainer().getByText("Only For me");
  act(() => {
    fireEvent.click(optionOnlyMe);
  });

  //Select Year
  const yearselect = getContainer().getByTestId("yearselect");
  act(() => {
    fireEvent.click(yearselect);
  });

  //Write a Rating Name
  const setName = getContainer()
  .getByTestId("inputelement")
  .querySelector("input");
  act(() => {
  fireEvent.change(setName, { target: { value: "NewRating" } });
  });

  //Next Dialog
  const nextDialog = getContainer().getByText("Next");
  act(() => {
    fireEvent.click(nextDialog);
  });

  /*const file = new File(["test"], "test.csv", {
    type: "application/csv"
  });

  const uploadZone = getContainer().getByTestId("dropzonetest");
  act(() => {
    fireEvent.drop(uploadZone, file );
  });*/

  //Close Dialog
  const close = getContainer().getByTestId("closeFirst");
  act(() => {
    fireEvent.click(close);
  });

  /*const download = getContainer().getByText("Download Template");
  act(() => {
    fireEvent.click(download);
  });*/

});