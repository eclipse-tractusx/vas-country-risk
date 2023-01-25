import {
  render,
  act,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import UploadDownloadZone from "../../../components/dashboard/UploadDownloadZone/UploadDownloadZone";

import { CompanyUserProvider } from "../../../contexts/companyuser";

test("Close Upload Test and Download Template", async () => {
  await act(async () => {
    render(
      <CompanyUserProvider>
        <UploadDownloadZone />
      </CompanyUserProvider>
    );
  });

  //Download Template
  const downloadBtn = screen.getByText("Download Template");
  await act(async () => {
    fireEvent.click(downloadBtn);
  });
  expect(downloadBtn).toBeInTheDocument();

  //Upload Template
  const uploadBtn = screen.getByText("Upload Rating");
  await act(async () => {
    fireEvent.click(uploadBtn);
  });
  expect(uploadBtn).toBeInTheDocument();

  const optionOnlyMe = screen.getByText("Only For me");
  act(() => {
    fireEvent.click(optionOnlyMe);
  });

  const setName = screen.getByTestId("inputelement").querySelector("input");
  act(() => {
    fireEvent.change(setName, { target: { value: "RatingTsst" } });
  });

  const closeBtn = screen.getByText("Close");
  await act(async () => {
    fireEvent.click(closeBtn);
  });
  expect(closeBtn).toBeInTheDocument();
});

test("Upload Test", async () => {
  await act(async () => {
    render(
      <CompanyUserProvider>
        <UploadDownloadZone></UploadDownloadZone>
      </CompanyUserProvider>
    );
  });

  //Download Template
  const downloadBtn = screen.getByText("Download Template");
  await act(async () => {
    fireEvent.click(downloadBtn);
  });
  expect(downloadBtn).toBeInTheDocument();

  //Upload Template
  const uploadBtn = screen.getByText("Upload Rating");
  await act(async () => {
    fireEvent.click(uploadBtn);
  });
  expect(uploadBtn).toBeInTheDocument();

  const optionOnlyMe = screen.getByText("Only For me");
  act(() => {
    fireEvent.click(optionOnlyMe);
  });
  expect(optionOnlyMe).toBeInTheDocument();

  const setName = screen.getByTestId("inputelement").querySelector("input");
  act(() => {
    fireEvent.change(setName, { target: { value: "RatingTsst" } });
  });
  expect(setName).toBeInTheDocument();

  //const nextBtn = waitFor(() => screen.getByText("Next"));
  const nextBtn = screen.getByText("Next");
  await act(async () => {
    fireEvent.click(nextBtn);
  });
  expect(nextBtn).toBeInTheDocument();

  let csvfile = {
    name: "test.csv",
    size: 1000,
    type: "text/csv",
  };

  await waitFor(() => {
    const drop = screen.getByText("Drag & drop your files here");
    expect(drop).toBeInTheDocument();
    fireEvent.drop(drop, { dataTransfer: { files: [csvfile] } });
  });
});
