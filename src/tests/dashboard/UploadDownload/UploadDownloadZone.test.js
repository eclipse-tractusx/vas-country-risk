import { render, act, fireEvent, screen, waitFor } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import UploadDownloadZone from "../../../components/dashboard/UploadDownloadZone/UploadDownloadZone";
import { downloadSampleCsvFile } from "../../../components/services/files-api";
import { CompanyUserProvider } from "../../../contexts/companyuser";
import Dialog from "@mui/material/Dialog";
//import fileCsv from "./files/testfile.csv"

import renderer from "react-test-renderer";

/*test("Upload snapshot test", () => {
  const component = renderer.create(
    <CompanyUserProvider>
    <UploadDownloadZone />
  </CompanyUserProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});*/


test("Close Upload Test and Download Template", async () => {
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

  const closeBtn = getByText("Close");
  await act(async () => {
    fireEvent.click(closeBtn);
  });
  expect(closeBtn).toBeInTheDocument();
});


test("Upload Test", async () => {
  let getByLabelText;
  let getByTestId;
  let getByText;

  await act(async () => {
    ({ getByLabelText, getByTestId, getByText } = render(
      <CompanyUserProvider>
        <UploadDownloadZone>
        </UploadDownloadZone>
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
  expect(optionOnlyMe).toBeInTheDocument();

  const setName = getByTestId("inputelement").querySelector("input");
  act(() => {
    fireEvent.change(setName, { target: { value: "RatingTsst" } });
  });
  expect(setName).toBeInTheDocument();

  //const nextBtn = waitFor(() => screen.getByText("Next"));
  const nextBtn = getByText("Next");
  await act(async () => {
    fireEvent.click(nextBtn);
  });
  expect(nextBtn).toBeInTheDocument();

  let csvfile = {
    name: 'test.csv',
    size: 1000,
    type: 'text/csv'
  };

  await waitFor(() => {
    const drop = getByText("Drag & drop your files here");
    expect(drop).toBeInTheDocument();
    fireEvent.drop(drop, {dataTransfer: {files: [csvfile]}});
  })

});



