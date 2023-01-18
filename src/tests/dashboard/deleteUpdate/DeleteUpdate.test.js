import { render, useState, act, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import DeleteUpdateComponent from "../../../components/dashboard/DeleteUpdateComponent/DeleteUpdateComponent";
import { ReportProvider } from "../../../contexts/reports";
import { DeleteOrUpdate } from "../../../components/model/DeleteOrUpdate";
import { Button } from "cx-portal-shared-components";
import {
  updateReports,
  deleteReport,
  shareReports,
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

jest.mock("../../../components/services/reports-api", () => {
  const deleteReport = jest.requireActual(
    "../../../components/services/reports-api"
  );
  const updateReports = jest.requireActual(
    "../../../components/services/reports-api"
  );
  const shareReports = jest.requireActual(
    "../../../components/services/reports-api"
  );

  return {
    __esModule: true,
    ...deleteReport,
    ...updateReports,
    ...shareReports,
  };
});

test("Renders Delete Update Component (Update Report)", async () => {
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
const deleteUpdateDataShare = new DeleteOrUpdate([
  1,
  "Share Report",
  "Test",
  {
    id: 3,
    reportName: "Fabio Report 2",
    companyUserName: "Test User CX Admin",
    company: "CX-Test-Access",
    type: "Company",
    reportValues: null,
  },
]);

test("Renders Delete Update Component (Share Report)", async () => {
  let getByLabelText;
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
