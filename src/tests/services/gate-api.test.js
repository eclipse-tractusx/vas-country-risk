import axios from "axios";
import {
    getUserBpdmGates,
    getDataFromSelectedGate
} from "../../components/services/gate-api";

import mockAxios from "jest-mock-axios";

jest.mock("axios");

describe("getUserBpdmGates", () => {
    afterEach(() => {
      mockAxios.reset();
    });
  
    it("Get Users BPDM Gates", async () => {
      const token = "123456";
      const customerUser = {
        name: "John Doe",
        email: "john@doe.com",
        companyName: "Doe Inc.",
      };
      const expectedResponse = [{
          id: 1,
          gateName: "BMW",
          companyGateValue: ""
       }
      ];
  
      axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));
  
      const response = await getUserBpdmGates(token, customerUser);
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
        await getUserBpdmGates(token, customerUser);
      } catch (error) {
        expect(error.message).toEqual(expectedError);
      }
    });
  
    it("Gets data from selected gate", async () => {
      const token = "123456";
      const customerUser = {
        name: "John Doe",
        email: "john@doe.com",
        companyName: "Doe Inc.",
      };
      const expectedResponse = [{
          id: 1,
          gateName: "BMW",
          companyGateValue: ""
       }
      ];
  
      axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));
  
      const response = await getDataFromSelectedGate(token, customerUser);
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
        await getDataFromSelectedGate(token, customerUser);
      } catch (error) {
        expect(error.message).toEqual(expectedError);
      }
    });
  });


