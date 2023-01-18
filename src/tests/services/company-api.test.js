import axios from "axios";
import {
    getUserFromCompany,
} from "../../components/services/company-api";

import mockAxios from "jest-mock-axios";

jest.mock("axios");

describe("getUserFromCompany", () => {
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
    const expectedResponse = [
    {
        name: "Test User CX Admin",
        email: "cxadmin@cx.com",
        companyName: "CX-Test-Access",
     },
     {
        name: "Test User CX User",
        email: "cxuser@cx.com",
        companyName: "CX-Test-Access",
     }
    ];

    axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));

    const response = await getUserFromCompany(token, customerUser);
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
      await getUserFromCompany(token, customerUser);
    } catch (error) {
      expect(error.message).toEqual(expectedError);
    }
  });


});
