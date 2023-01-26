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

  //Upload Template
  const uploadBtn = screen.getByText("Upload Rating");
  await act(async () => {
    fireEvent.click(uploadBtn);
  });

  const optionOnlyMe = screen.getByText("Only For me");
  act(() => {
    fireEvent.click(optionOnlyMe);
  });

  const setName = screen.getByTestId("inputelement").querySelector("input");
  act(() => {
    fireEvent.change(setName, { target: { value: "RatingTsst" } });
  });

  const nextBtn = screen.getByText("Next");
  await act(async () => {
    fireEvent.click(nextBtn);
  });

  const closeBtn = screen.getByTestId("closeSecond");
  await act(async () => {
    fireEvent.click(closeBtn);
  });
});

//Open Upload Dialog and setErroName
/*test("Close Upload Test and input big name", async () => {
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

  //Upload Template
  const uploadBtn = screen.getByText("Upload Rating");
  await act(async () => {
    fireEvent.click(uploadBtn);
  });

  const optionOnlyMe = screen.getByText("Only For me");
  act(() => {
    fireEvent.click(optionOnlyMe);
  });

  const setNameError = screen
    .getByTestId("inputelement")
    .querySelector("input");
  act(() => {
    fireEvent.change(setNameError, {
      target: { value: "andthrowanderrorbigwordtesttestest" },
    });
  });

  const closeBtn = screen.getByText("Close");
  await act(async () => {
    fireEvent.click(closeBtn);
  });
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

  //Upload Template
  const uploadBtn = screen.getByText("Upload Rating");
  await act(async () => {
    fireEvent.click(uploadBtn);
  });

  const optionOnlyMe = screen.getByText("Only For me");
  act(() => {
    fireEvent.click(optionOnlyMe);
  });

  const setName = screen.getByTestId("inputelement").querySelector("input");
  act(() => {
    fireEvent.change(setName, { target: { value: "noterror" } });
  });

  const nextBtn = screen.getByText("Next");
  await act(async () => {
    fireEvent.click(nextBtn);
  });

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
});*/
