import { render, act } from "@testing-library/react";
import { test } from "@jest/globals";
import UploadDownloadZone from "../../../components/dashboard/UploadDownloadZone/UploadDownloadZone";
import { downloadSampleCsvFile } from "../../../components/services/files-api";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

jest.mock("../../../components/services/files-api", () => ({
  downloadSampleCsvFile: jest.fn().mockReturnValue([]),
}));

test("Download template Test", async () => {
  downloadSampleCsvFile.mockImplementation(() => Promise.resolve([]));
  const customerUser = { name: "test" };
  let getByText;
  await act(async () => {
    ({ getByText } = render(<UploadDownloadZone />));
  });
  expect(getByText("Upload Rating")).toBeInTheDocument();
  userEvent.click(getByText("Upload Rating"));
  expect(getByText("Download Template")).toBeInTheDocument();
  userEvent.click(getByText("Download Template"));
});
