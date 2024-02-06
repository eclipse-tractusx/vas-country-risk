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
import React, { useContext } from "react";
import "./styles.scss";
import { CompanyUserContext } from "../../../contexts/companyuser";
import {
  Button,
  DialogHeader,
  DialogContent,
  DialogActions,
} from "cx-portal-shared-components";
import { updateReports, deleteReport } from "../../services/reports-api";
import UserService from "../../services/UserService";
import { Report } from "../../model/Report";
import { ReportContext } from "../../../contexts/reports";
import { shareReports } from "../../services/reports-api";

const DeleteUpdateComponent = ({
  deleteUpdateData,
  closeDialogsDeleteAndUpdate,
  closeDialogs,
}) => {
  const { companyUser } = useContext(CompanyUserContext);

  const { report, reportValuesContext } = useContext(ReportContext);

  const decideAction = () => {
    if (deleteUpdateData.operation === "Save Changes") {
      closeDialogsAndSave();
    } else if (deleteUpdateData.operation === "Delete Report") {
      closeDialogsAndDelete();
    } else if (deleteUpdateData.operation === "Share Report") {
      closeDialogsAndShare();
    }
  };

  const closeDialogsAndShare = () => {
    deleteUpdateData.forEach((eachPerson) => {
      const newReport = new Report(
        null,
        report.reportName,
        eachPerson.name,
        eachPerson.companyName,
        eachPerson.email,
        "Custom",
        reportValuesContext
      );
      shareReports(UserService.getToken(), companyUser, newReport)
        .then((res) => {
          closeDialogsDeleteAndUpdate(
            res,
            "Report Shared sucessfully!",
            "You do not have the permission to share this report!"
          );
        })
        .catch((err) => {
          closeDialogsDeleteAndUpdate(
            err.response.data.status,
            "Report Shared sucessfully!",
            "You do not have the permission to share this report!"
          );
        });
    });
  };

  //Close Dialog and Update Report
  const closeDialogsAndSave = () => {
    updateReports(
      UserService.getToken(),
      companyUser,
      deleteUpdateData.newReport
    )
      .then((res) => {
        closeDialogsDeleteAndUpdate(
          res,
          "Report changed sucessfully!",
          "You do not have the permission to change this report!"
        );
      })
      .catch((err) => {
        closeDialogsDeleteAndUpdate(
          err.response.data.status,
          "Report changed sucessfully!",
          "You do not have the permission to change this report!"
        );
      });
  };

  //Function to call the DELETE Report API
  const closeDialogsAndDelete = () => {
    deleteReport(UserService.getToken(), companyUser, deleteUpdateData.id)
      .then((code) => {
        closeDialogsDeleteAndUpdate(
          code,
          "Report delete sucessfully!",
          "You do not have the permission to deleted this report!"
        );
      })
      .catch((err) => {
        closeDialogsDeleteAndUpdate(
          err.response.data.status,
          "Report delete sucessfully!",
          "You do not have the permission to deleted this report!"
        );
      });
  };

  const closeDialog = () => {
    closeDialogs();
  };

  return (
    <div className="Dialog-Expand-Div">
      <DialogHeader
        title={deleteUpdateData.operation}
        intro={deleteUpdateData.doubleCheckMessage}
      />
      <DialogActions>
        <Button className="btn-no" variant="outlined" onClick={closeDialog}>
          No
        </Button>
        <Button data-testid="btnYes" onClick={decideAction}>
          Yes
        </Button>
      </DialogActions>
    </div>
  );
};

export default DeleteUpdateComponent;
