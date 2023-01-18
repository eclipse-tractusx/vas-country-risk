import axios from "axios";
import {
    getBpns,
} from "../../components/services/bpns-api";

import mockAxios from "jest-mock-axios";

jest.mock("axios");

describe("getAllDates", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should get all bpns", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const expectedResponse = {
        id: 1,
        bpn: "67-188-3753",
        legalName: "Hane-VonRueden",
        street: "Morrow",
        houseNumber: "830",
        zipCode: "62200",
        city: "Niutang",
        country: "China",
        longitude: "119.900272",
        latitude: "31.731975"
    };
    

    axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));

    const response = await getBpns(token, customerUser);
    expect(response).toEqual(undefined);
  });

  it("should handle errors", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const expectedError = "Error fetching bpns";

    axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));

    try {
      await getBpns(token, customerUser);
    } catch (error) {
      expect(error.message).toEqual(expectedError);
    }
  });
});
