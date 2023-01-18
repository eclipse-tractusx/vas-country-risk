import axios from "axios";
import {
    getReportsByCompanyUser,
    getReportValuesByReport,
    saveReports,
    shareReports,
    updateReports,
    deleteReport
} from "../../components/services/reports-api";

import mockAxios from "jest-mock-axios";

jest.mock("axios");

describe("ReportAPI", () => {
    afterEach(() => {
      mockAxios.reset();
    });
  
    it("getReportsByCompanyUser", async () => {
      const token = "123456";
      const customerUser = {
        name: "John Doe",
        email: "john@doe.com",
        companyName: "Doe Inc.",
      };
      const expectedResponse = [   {
        id: 161,
        reportName: "test",
        companyUserName: "test",
        company: "Test-Access",
        email: null,
        type: "Company",
        reportValues: null
     },
    ];
  
      axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));
  
      const response = await getReportsByCompanyUser(token, customerUser);
      expect(response).toEqual(undefined);
    });
  
    it("should handle errors", async () => {
      const token = "123456";
      const customerUser = {
        name: "John Doe",
        email: "john@doe.com",
        companyName: "Doe Inc.",
      };
      const expectedError = "Error fetching reports";
  
      axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));
  
      try {
        await getReportsByCompanyUser(token, customerUser);
      } catch (error) {
        expect(error.message).toEqual(expectedError);
      }
    });

    //GetReportsValueByReports
    it("getReportValuesByReport", async () => {
        const token = "123456";
        const customerUser = {
          name: "John Doe",
          email: "john@doe.com",
          companyName: "Doe Inc.",
        };
        const report = [   {
            id: 161,
            reportName: "test",
            companyUserName: "test",
            company: "Test-Access",
            email: null,
            type: "Company",
            reportValues: null
         },
        ];
        const expectedResponse = [
            {
              name: "Range",
              objectValue: {}
            }
          ];
    
        axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));
    
        const response = await getReportValuesByReport(token, report ,customerUser);
        expect(response).toEqual(undefined);
      });
    
      it("should handle errors", async () => {
        const token = "123456";
        const customerUser = {
          name: "John Doe",
          email: "john@doe.com",
          companyName: "Doe Inc.",
        };
        const report = [   {
            id: 161,
            reportName: "test",
            companyUserName: "test",
            company: "Test-Access",
            email: null,
            type: "Company",
            reportValues: null
         },
        ];
        const expectedError = "Error fetching reports";
    
        axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));
    
        try {
          await getReportValuesByReport(token, report ,customerUser);
        } catch (error) {
          expect(error.message).toEqual(expectedError);
        }
      });

    //save reports
    it("saveReports", async () => {
        const token = "123456";
        const customerUser = {
          name: "John Doe",
          email: "john@doe.com",
          companyName: "Doe Inc.",
        };
        const report = [   {
            id: null,
            reportName: "test",
            companyUserName: "test",
            company: "Test-Access",
            email: null,
            type: "Company",
            reportValues: null
         },
        ];
        const expectedResponse = undefined;
    
        axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));
    
        const response = await saveReports(token, customerUser, report);
        expect(response).toEqual(undefined);
      });
    
      it("should handle errors", async () => {
        const token = "123456";
        const customerUser = {
          name: "John Doe",
          email: "john@doe.com",
          companyName: "Doe Inc.",
        };
        const report = [   {
            id: null,
            reportName: "test",
            companyUserName: "test",
            company: "Test-Access",
            email: null,
            type: "Company",
            reportValues: null
         },
        ];
        const expectedError = "Error saving reports";
    
        axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));
    
        try {
          await saveReports(token, customerUser, report);
        } catch (error) {
          expect(error.message).toEqual(expectedError);
        }
      });

    //update reports
    it("updateReports", async () => {
        const token = "123456";
        const customerUser = {
          name: "John Doe",
          email: "john@doe.com",
          companyName: "Doe Inc.",
        };
        const report = [   {
            id: 161,
            reportName: "test",
            companyUserName: "test",
            company: "Test-Access",
            email: null,
            type: "Company",
            reportValues: null
         },
        ];
        const expectedResponse = undefined;
    
        axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));
    
        const response = await updateReports(token, customerUser, report);
        expect(response).toEqual(undefined);
      });
    
      it("should handle errors", async () => {
        const token = "123456";
        const customerUser = {
          name: "John Doe",
          email: "john@doe.com",
          companyName: "Doe Inc.",
        };
        const report = [   {
            id: 161,
            reportName: "test",
            companyUserName: "test",
            company: "Test-Access",
            email: null,
            type: "Company",
            reportValues: null
         },
        ];
        const expectedError = "Error updating reports";
    
        axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));
    
        try {
          await updateReports(token, customerUser, report);
        } catch (error) {
          expect(error.message).toEqual(expectedError);
        }
      });      


          //share reports
    it("shareReports", async () => {
        const token = "123456";
        const customerUser = {
          name: "John Doe",
          email: "john@doe.com",
          companyName: "Doe Inc.",
        };
        const report = [   {
            id: null,
            reportName: "test",
            companyUserName: "test",
            company: "Test-Access",
            email: null,
            type: "Company",
            reportValues: null
         },
        ];
        const expectedResponse = undefined;
    
        axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));
    
        const response = await shareReports(token, customerUser, report);
        expect(response).toEqual(undefined);
      });
    
      it("should handle errors", async () => {
        const token = "123456";
        const customerUser = {
          name: "John Doe",
          email: "john@doe.com",
          companyName: "Doe Inc.",
        };
        const report = [   {
            id: null,
            reportName: "test",
            companyUserName: "test",
            company: "Test-Access",
            email: null,
            type: "Company",
            reportValues: null
         },
        ];
        const expectedError = "Error sharing reports";
    
        axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));
    
        try {
          await shareReports(token, customerUser, report);
        } catch (error) {
          expect(error.message).toEqual(expectedError);
        }
      });

  
    //Delete Report
   it("Gets data from selected gate", async () => {
      const token = "123456";
      const customerUser = {
        name: "John Doe",
        email: "john@doe.com",
        companyName: "Doe Inc.",
      };
      const id = 161;

      const expectedResponse = {message:"Report successfully deleted!"}

      axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));
  
      const response = await deleteReport(token, customerUser, id);
      expect(response).toEqual(undefined);
    });
  
    it("should handle only errors", async () => {
      const token = "123456";
      const customerUser = {
        name: "John Doe",
        email: "john@doe.com",
        companyName: "Doe Inc.",
      };
      const id = 161;

      const expectedError = "Error deleting report";
  
      axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));
  
      try {
        await deleteReport(token, customerUser, id);
      } catch (error) {
        expect(error.message).toEqual(expectedError);
      }
    });
  });


