import { render, useState, act, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import DeleteUpdateComponent from "../../../components/dashboard/DeleteUpdateComponent/DeleteUpdateComponent";
import { ReportProvider } from "../../../contexts/reports";
import { DeleteOrUpdate } from "../../../components/model/DeleteOrUpdate";
import {
  updateReports,
  deleteReport,
  shareReports,
  getReportValuesByReport,
} from "../../../components/services/reports-api";
import { CompanyUserProvider } from "../../../contexts/companyuser";

const deleteUpdateData = new DeleteOrUpdate(1, "Save Changes", "Test", [
  {
    id: 3,
    reportName: "Fabio Report 2",
    companyUserName: "Test User CX Admin",
    company: "CX-Test-Access",
    type: "Company",
    reportValues: null,
  },
]);

const closeDialogs = () => {
  return true;
};

const closeDialogsDeleteAndUpdate = () => {
  return (
    200,
    "Report changed sucessfully!",
    "You do not have the permission to change this report!"
  );
};

//Sucess on API response
const NoErrorStatus = {
  status: 204,
};

const expectedResponse = [
  {
    name: "Range",
    objectValue: {}
  }
];

jest.mock("../../../components/services/reports-api", () => {

  return {
    __esModule: true,
    getReportValuesByReport: jest.fn().mockReturnValue(expectedResponse),
    deleteReport: jest.fn().mockReturnValue(NoErrorStatus),
    updateReports: jest.fn().mockReturnValue(NoErrorStatus),
    shareReports: jest.fn().mockReturnValue(NoErrorStatus),
  };
});

test("Renders Delete Update Component (Update Report)", async () => {
  deleteReport.mockImplementation(() => Promise.resolve(NoErrorStatus));
  updateReports.mockImplementation(() => Promise.resolve(NoErrorStatus));
  shareReports.mockImplementation(() => Promise.resolve(NoErrorStatus));
  getReportValuesByReport.mockImplementation(() => Promise.resolve(expectedResponse));


  let getByLabelText;
  let getByTestId;
  await act(async () => {
    ({ getByLabelText, getByTestId } = render(
      <CompanyUserProvider>
        <ReportProvider>
          <DeleteUpdateComponent
            deleteUpdateData={deleteUpdateData}
            closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
            closeDialogs={closeDialogs}
          ></DeleteUpdateComponent>
        </ReportProvider>
      </CompanyUserProvider>
    ));
  });

  const yesbtn = getByTestId("btnYes");
  await act(async () => {
    fireEvent.click(yesbtn);
  });
  expect(yesbtn).toBeInTheDocument();
});

// ############## Delete Test ###############

//Object for Delete
const deleteUpdateDataDelete = new DeleteOrUpdate(1, "Delete Report", "Test", [
  {
    id: 3,
    reportName: "Fabio Report 2",
    companyUserName: "Test User CX Admin",
    company: "CX-Test-Access",
    type: "Company",
    reportValues: null,
  },
]);

test("Renders Delete Update Component (Delete Report)", async () => {
  deleteReport.mockImplementation(() => Promise.resolve(NoErrorStatus));
  updateReports.mockImplementation(() => Promise.resolve(NoErrorStatus));
  shareReports.mockImplementation(() => Promise.resolve(NoErrorStatus));
  getReportValuesByReport.mockImplementation(() => Promise.resolve(expectedResponse));
  let getByLabelText;
  let getByTestId;
  await act(async () => {
    ({ getByLabelText, getByTestId } = render(
      <CompanyUserProvider>
        <ReportProvider>
          <DeleteUpdateComponent
            deleteUpdateData={deleteUpdateDataDelete}
            closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
            closeDialogs={closeDialogs}
          ></DeleteUpdateComponent>
        </ReportProvider>
      </CompanyUserProvider>
    ));
  });

  const yesbtn = getByTestId("btnYes");
  await act(async () => {
    fireEvent.click(yesbtn);
  });
  expect(yesbtn).toBeInTheDocument();
});

// ############## Share Test ###############

//Object for Share
const deleteUpdateDataShare = [
  {
    name: "Martin Rohrmeier",
    email: "martin.ra.rohrmeier@bmw.de",
    companyName: "CX-Test-Access",
    title: "martin.ra.rohrmeier@bmw.de",
    id: 1674054191678,
  },
  {
    name: "Test User CX User",
    email: "cxuser@cx.com",
    companyName: "CX-Test-Access",
    title: "cxuser@cx.com",
    id: 1674054191678,
  },
];

test("Renders Delete Update Component (Share Report)", async () => {
  deleteReport.mockImplementation(() => Promise.resolve(NoErrorStatus));
  updateReports.mockImplementation(() => Promise.resolve(NoErrorStatus));
  shareReports.mockImplementation(() => Promise.resolve(NoErrorStatus));
  getReportValuesByReport.mockImplementation(() => Promise.resolve(expectedResponse));
  let getByLabelText;
  deleteUpdateDataShare.doubleCheckMessage =
    "Do you want to share this Report?";
  deleteUpdateDataShare.operation = "Share Report";
  let getByTestId;
  await act(async () => {
    ({ getByLabelText, getByTestId } = render(
      <CompanyUserProvider>
        <ReportProvider>
          <DeleteUpdateComponent
            deleteUpdateData={deleteUpdateDataShare}
            closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
            closeDialogs={closeDialogs}
          ></DeleteUpdateComponent>
        </ReportProvider>
      </CompanyUserProvider>
    ));
  });

  const yesbtn = getByTestId("btnYes");
  await act(async () => {
    fireEvent.click(yesbtn);
  });
  expect(yesbtn).toBeInTheDocument();
});

//No Update/Delete Operation
test("No Update/Share/Delete button No Click", async () => {
  deleteReport.mockImplementation(() => Promise.resolve(NoErrorStatus));
  updateReports.mockImplementation(() => Promise.resolve(NoErrorStatus));
  shareReports.mockImplementation(() => Promise.resolve(NoErrorStatus));
  getReportValuesByReport.mockImplementation(() => Promise.resolve(expectedResponse));
  let getByLabelText;
  let getByTestId;
  let getByText;
  await act(async () => {
    ({ getByLabelText, getByTestId, getByText } = render(
      <CompanyUserProvider>
        <ReportProvider>
          <DeleteUpdateComponent
            deleteUpdateData={deleteUpdateData}
            closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
            closeDialogs={closeDialogs}
          ></DeleteUpdateComponent>
        </ReportProvider>
      </CompanyUserProvider>
    ));
  });

  const nobtn = getByText("No");
  await act(async () => {
    fireEvent.click(nobtn);
  });
  expect(nobtn).toBeInTheDocument();
});
