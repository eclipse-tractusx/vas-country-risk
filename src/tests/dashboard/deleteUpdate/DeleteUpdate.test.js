/********************************************************************************
* Copyright (c) 2022,2024 BMW Group AG
* Copyright (c) 2022,2024 Contributors to the Eclipse Foundation
*
* See the NOTICE file(s) distributed with this work for additional
* information regarding copyright ownership.
*
* This program and the accompanying materials are made available under the
* terms of the Apache License, Version 2.0 which is available at
* https://www.apache.org/licenses/LICENSE-2.0.
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations
* under the License.
*
* SPDX-License-Identifier: Apache-2.0
********************************************************************************/
import { render, screen, act, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import '@testing-library/jest-dom';
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

  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReportProvider>
          <DeleteUpdateComponent
            deleteUpdateData={deleteUpdateData}
            closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
            closeDialogs={closeDialogs}
          ></DeleteUpdateComponent>
        </ReportProvider>
      </CompanyUserProvider>
    );
  });

  const yesbtn = screen.getByTestId("btnYes");
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

  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReportProvider>
          <DeleteUpdateComponent
            deleteUpdateData={deleteUpdateDataDelete}
            closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
            closeDialogs={closeDialogs}
          ></DeleteUpdateComponent>
        </ReportProvider>
      </CompanyUserProvider>
    );
  });

  const yesbtn = screen.getByTestId("btnYes");
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

  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReportProvider>
          <DeleteUpdateComponent
            deleteUpdateData={deleteUpdateDataShare}
            closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
            closeDialogs={closeDialogs}
          ></DeleteUpdateComponent>
        </ReportProvider>
      </CompanyUserProvider>
    );
  });

  const yesbtn = screen.getByTestId("btnYes");
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

  await act(async () => {
    render(
      <CompanyUserProvider>
        <ReportProvider>
          <DeleteUpdateComponent
            deleteUpdateData={deleteUpdateData}
            closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
            closeDialogs={closeDialogs}
          ></DeleteUpdateComponent>
        </ReportProvider>
      </CompanyUserProvider>
    );
  });

  const nobtn = screen.getByText("No");
  await act(async () => {
    fireEvent.click(nobtn);
  });
  expect(nobtn).toBeInTheDocument();
});
