import axios from "axios";
import {
    getRatingsByYear,
    deleteRating
} from "../../components/services/ratingstable-api";

import mockAxios from "jest-mock-axios";

jest.mock("axios");

describe("getRatingsByYear", () => {
    afterEach(() => {
      mockAxios.reset();
    });
  
    it("Ratings by year", async () => {
      const token = "123456";
      const customerUser = {
        name: "John Doe",
        email: "john@doe.com",
        companyName: "Doe Inc.",
      };
      const year = "";
      const expectedResponse = [
        {
           id: 43,
           dataSourceName: "test",
           type: "Company",
           yearPublished: 2022,
           fileName: "test123",
        },
      ];
  
      axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));
  
      const response = await getRatingsByYear(year ,token, customerUser);
      expect(response).toEqual(undefined);
    });
  
    it("should handle errors", async () => {
      const token = "123456";
      const customerUser = {
        name: "John Doe",
        email: "john@doe.com",
        companyName: "Doe Inc.",
      };
      const year = 2023;
      const expectedError = "Error fetching ratings";
  
      axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));
  
      try {
        await getRatingsByYear(year, token, customerUser);
      } catch (error) {
        expect(error.message).toEqual(expectedError);
      }
    });
  
    //Delete Rating
   it("Gets data from selected gate", async () => {
      const token = "123456";
      const customerUser = {
        name: "John Doe",
        email: "john@doe.com",
        companyName: "Doe Inc.",
      };
      const id = 43;

      const expectedResponse = {message:"Rating successfully deleted!"}

      axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));
  
      const response = await deleteRating(token, customerUser, id);
      expect(response).toEqual(undefined);
    });
  
    it("should handle only errors", async () => {
      const token = "123456";
      const customerUser = {
        name: "John Doe",
        email: "john@doe.com",
        companyName: "Doe Inc.",
      };
      const id = 43;

      const expectedError = "Error deleting rating";
  
      axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));
  
      try {
        await deleteRating(token, customerUser, id);
      } catch (error) {
        expect(error.message).toEqual(expectedError);
      }
    });
  });


