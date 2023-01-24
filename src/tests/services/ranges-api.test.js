import axios from "axios";
import { getAllRanges, sendValues } from "../../components/services/ranges-api";

import mockAxios from "jest-mock-axios";

jest.mock("axios");

describe("getAllRanges", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("Gest All ranges for user", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const expectedResponse = [
      {
        range: "Min",
        value: 24,
        description: "Min Range",
        companyUser: {
          name: "John Doe",
          email: "john@doe.com",
          companyName: "Doe Inc.",
        },
      },
      {
        range: "Between",
        value: 55,
        description: "BetWeen Range",
        companyUser: {
          name: "John Doe",
          email: "john@doe.com",
          companyName: "Doe Inc.",
        },
      },
      {
        range: "Max",
        value: 100,
        description: "Max Range",
        companyUser: {
          name: "John Doe",
          email: "john@doe.com",
          companyName: "Doe Inc.",
        },
      },
    ];

    axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));

    const response = await getAllRanges(token, customerUser);
    expect(response).toEqual(undefined);
  });

  it("should handle errors", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const expectedError = "Error fetching countries";

    axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));

    try {
      await getAllRanges(token, customerUser);
    } catch (error) {
      expect(error.message).toEqual(expectedError);
    }
  });

  //Save Ranges
  it("Save Ranges", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const rangelist = [
      [0, 37],
      [38, 60],
      [61, 100],
    ];
    const expectedResponse = { message: "Range successfully saved!" };

    axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));

    const response = await sendValues(rangelist, token, customerUser);
    expect(response).toEqual(undefined);
  });

  it("should handle only errors", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const rangelist = [
      [0, 37],
      [38, 60],
      [61, 100],
    ];
    const expectedError = "Error saving ranges";

    axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));

    try {
      await sendValues(rangelist, token, customerUser);
    } catch (error) {
      expect(error.message).toEqual(expectedError);
    }
  });
});
