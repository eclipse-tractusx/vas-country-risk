import axios from "axios";
import {
  getCountryByUser,
  getCountrys,
} from "../../components/services/country-api";


import mockAxios from "jest-mock-axios";

jest.mock("axios");

describe("getCountryByUser", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should fetch countries successfully", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const expectedResponse = [
      { country: "Brazil", iso2: "BR" },
      { country: "United States", iso2: "US" },
    ];

    axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));

    const response = await getCountryByUser(token, customerUser);
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
      await getCountryByUser(token, customerUser);
    } catch (error) {
      expect(error.message).toEqual(expectedError);
    }
  });

  it("should fetch only countries successfully", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const expectedResponse = [
      { country: "Brazil", iso2: "BR" },
      { country: "United States", iso2: "US" },
    ];

    axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));

    const response = await getCountrys(token, customerUser);
    expect(response).toEqual(undefined);
  });

  it("should handle only errors", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const expectedError = "Error fetching countries";

    axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));

    try {
      await getCountrys(token, customerUser);
    } catch (error) {
      expect(error.message).toEqual(expectedError);
    }
  });
});
