import axios from "axios";
import {
    downloadSampleCsvFile,
} from "../../components/services/files-api";

import mockAxios from "jest-mock-axios";

jest.mock("axios");

describe("downloadSampleCsvFile", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("Download csv file template", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const expectedResponse = {};

    axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));

    const response = await downloadSampleCsvFile(token, customerUser);
    //expect(response).toEqual(undefined);
  });

  it("should handle errors", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const expectedError = "Error fetching file";

    axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));

    try {
      await downloadSampleCsvFile(token, customerUser);
    } catch (error) {
      expect(error.message).toEqual(expectedError);
    }
  });


});
