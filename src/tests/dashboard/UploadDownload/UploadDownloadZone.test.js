import { render, act, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import UploadDownloadZone from "../../../components/dashboard/UploadDownloadZone/UploadDownloadZone";
import { downloadSampleCsvFile } from "../../../components/services/files-api";
import { CompanyUserProvider } from "../../../contexts/companyuser";

test("Upload Test", async () => {
  let getByLabelText;
  let getByTestId;
  let getByText;
  await act(async () => {
    ({ getByLabelText, getByTestId, getByText } = render(
      <CompanyUserProvider>
        <UploadDownloadZone />
      </CompanyUserProvider>
    ));
  });

  //Download Template
  const downloadBtn = getByText("Download Template");
  await act(async () => {
    fireEvent.click(downloadBtn);
  });
  expect(downloadBtn).toBeInTheDocument();

  //Upload Template
  const uploadBtn = getByText("Upload Rating");
  await act(async () => {
    fireEvent.click(uploadBtn);
  });
  expect(uploadBtn).toBeInTheDocument();

  const optionOnlyMe = getByText("Only For me");
  act(() => {
    fireEvent.click(optionOnlyMe);
  });

  const setName = getByTestId("inputelement").querySelector("input");
  act(() => {
    fireEvent.change(setName, { target: { value: "RatingTsst" } });
  });

  const nextBtn = getByText("Next");
  await act(async () => {
    fireEvent.click(nextBtn);
  });
  expect(nextBtn).toBeInTheDocument();
});
