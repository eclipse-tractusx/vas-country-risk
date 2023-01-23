import axios from "axios";
import {
    getAllDates,
} from "../../components/services/dateform-api";

import mockAxios from "jest-mock-axios";

jest.mock("axios");

describe("getAllDates", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should get all dates", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const expectedResponse = [2021,2022];

    axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));

    const response = await getAllDates(token, customerUser);
    expect(response).toEqual(undefined);
  });

  it("should handle errors", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const expectedError = "Error fetching dates";

    axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));

    try {
      await getAllDates(token, customerUser);
    } catch (error) {
      expect(error.message).toEqual(expectedError);
    }
  });


});
