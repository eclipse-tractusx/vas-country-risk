import { render, act, fireEvent, screen } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { CompanyUserProvider } from "../../../contexts/companyuser";
import { downloadSampleCsvFile } from "../../../components/services/files-api";
import UploadDownloadZone from "../../../components/dashboard/UploadDownloadZone/UploadDownloadZone";
import { ReloadProvider } from "../../../contexts/refresh";
import { Button, Dropzone, Input, Alert } from "cx-portal-shared-components";

const file = [];

jest.mock("cx-portal-shared-components", () => ({
  ...jest.requireActual("cx-portal-shared-components"),
  Dropzone: ({ children }) => <>{children}</>,
}));

jest.mock("../../../components/services/files-api", () => ({
  downloadSampleCsvFile: jest.fn().mockReturnValue(file),
}));

test("UploadDownload Unit Test", async () => {
  downloadSampleCsvFile.mockImplementation(() => Promise.resolve(file));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReloadProvider>
          <UploadDownloadZone />
        </ReloadProvider>
      </CompanyUserProvider>
    );
  });

  const downloadBtn = screen.getByText("Download Template");
  await act(async () => {
    fireEvent.click(downloadBtn);
  });

  expect(downloadBtn).toBeInTheDocument();
});
